const puppeteer = require("puppeteer-core");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.BASE || "http://localhost:3113";

const results = [];
const log = (name, pass, detail = "") =>
  results.push({ name, pass, detail }) ||
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? " :: " + detail : ""}`);

async function overflowAt(page, width, height) {
  await page.setViewport({ width, height });
  await new Promise((r) => setTimeout(r, 400));
  return page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedUrls = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("requestfailed", (r) =>
    failedUrls.push(`${r.failure()?.errorText || "fail"} ${r.url()}`)
  );
  page.on("response", (r) => {
    if (r.status() >= 400) failedUrls.push(`HTTP ${r.status()} ${r.url()}`);
  });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  // 1. Hero headline present
  const hero = await page.$eval("h1", (el) => el.innerText.replace(/\s+/g, " ").trim());
  log("Hero headline rendered", /Discover\./.test(hero) && /Track\./.test(hero), hero);

  // 2. Horizontal overflow across widths
  for (const [w, h] of [[375, 812], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]]) {
    const { scrollW, clientW } = await overflowAt(page, w, h);
    log(`No horizontal overflow @${w}px`, scrollW <= clientW + 1, `scrollW=${scrollW} clientW=${clientW}`);
  }

  await page.setViewport({ width: 1440, height: 900 });
  await new Promise((r) => setTimeout(r, 400));

  // 3. Interactive preview tabs
  const tabs = await page.$$('[role="tab"]');
  log("Preview tabs present", tabs.length === 5, `count=${tabs.length}`);
  if (tabs.length === 5) {
    await tabs[3].click(); // Discovery
    await new Promise((r) => setTimeout(r, 1400));
    const activeIdx = await page.evaluate(() => {
      const t = [...document.querySelectorAll('[role="tab"]')];
      return t.findIndex((x) => x.getAttribute("aria-selected") === "true");
    });
    const activeLabel = await page.evaluate(() => {
      const t = [...document.querySelectorAll('[role="tab"]')].find((x) => x.getAttribute("aria-selected") === "true");
      return t ? t.innerText.trim() : "none";
    });
    log("Tab click switches selection", activeIdx === 3, `active=${activeLabel}`);
    // verify screen content switched to discovery (case-insensitive: text is uppercased via CSS)
    const hasDiscoverScreen = await page.evaluate(() =>
      /recommended for you/i.test(document.body.innerText)
    );
    const blurbShown = await page.evaluate(() =>
      /instant pick/i.test(document.body.innerText)
    );
    log(
      "Selected tab renders discovery screen",
      hasDiscoverScreen || blurbShown,
      `grid=${hasDiscoverScreen} blurb=${blurbShown}`
    );
  }

  // 4. FAQ accordion
  const faqBtns = await page.$$("#faq button[aria-expanded]");
  log("FAQ buttons present", faqBtns.length >= 7, `count=${faqBtns.length}`);
  if (faqBtns.length >= 2) {
    const before = await faqBtns[1].evaluate((el) => el.getAttribute("aria-expanded"));
    await faqBtns[1].click();
    await new Promise((r) => setTimeout(r, 500));
    const after = await faqBtns[1].evaluate((el) => el.getAttribute("aria-expanded"));
    log("FAQ accordion toggles open", before === "false" && after === "true", `${before} -> ${after}`);
    // answer panel visible
    const panelText = await page.evaluate(() => {
      const p = document.getElementById("faq-panel-1");
      return p ? p.innerText.trim().length : 0;
    });
    log("FAQ answer panel has content", panelText > 10, `len=${panelText}`);
  }

  // 5. Navbar language dropdown
  const langBtn = await page.$('nav[aria-label="Main"] button[aria-haspopup="listbox"]');
  log("Language dropdown trigger present", !!langBtn);
  if (langBtn) {
    await langBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const opts = await page.$$('[role="listbox"] [role="option"]');
    log("Language options open", opts.length >= 5, `count=${opts.length}`);
    if (opts.length) {
      await opts[1].click();
      await new Promise((r) => setTimeout(r, 300));
      const closed = await page.$('[role="listbox"]');
      log("Language option selects & closes", !closed);
    }
  }

  // 6. Mobile hamburger menu
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 500));
  const burger = await page.$('button[aria-label="Open menu"]');
  log("Mobile hamburger present", !!burger);
  if (burger) {
    await burger.click();
    await new Promise((r) => setTimeout(r, 500));
    const closeBtn = await page.$('button[aria-label="Close menu"]');
    log("Mobile menu opens", !!closeBtn);
    if (closeBtn) {
      await closeBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const stillOpen = await page.$('button[aria-label="Close menu"]');
      log("Mobile menu closes", !stillOpen);
    }
  }

  // 7. Poster images loaded (TMDB) after scrolling through page
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  const imgs = await page.evaluate(() => {
    const list = [...document.querySelectorAll("img")];
    const tmdb = list.filter((i) => (i.currentSrc || i.src).includes("image.tmdb.org"));
    return {
      total: list.length,
      tmdb: tmdb.length,
      broken: tmdb.filter((i) => i.complete && i.naturalWidth === 0).length,
      loaded: tmdb.filter((i) => i.naturalWidth > 0).length,
    };
  });
  log("TMDB poster images present", imgs.tmdb > 0, `tmdb=${imgs.tmdb} total=${imgs.total}`);
  log("No broken TMDB images", imgs.broken === 0, `broken=${imgs.broken} loaded=${imgs.loaded}`);

  // 8. Screenshots at multiple widths
  const shots = [
    { w: 1440, h: 900, name: "desktop" },
    { w: 768, h: 1024, name: "tablet" },
    { w: 390, h: 844, name: "mobile" },
  ];
  for (const s of shots) {
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: `shots/${s.name}-top.png` });
    await page.evaluate(() => {
      const el = document.getElementById("features");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `shots/${s.name}-features.png` });
    await page.evaluate(() => {
      const el = document.getElementById("hub");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `shots/${s.name}-hub.png` });
    await page.evaluate(() => {
      const el = document.getElementById("faq");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `shots/${s.name}-faq.png` });
  }
  log("Screenshots captured", true, "desktop/tablet/mobile");

  // 9. Console errors
  const realErrors = consoleErrors.filter(
    (e) => !/favicon|Manifest|Download the React DevTools/i.test(e)
  );
  log("No runtime console/page errors", realErrors.length === 0, realErrors.slice(0, 3).join(" | "));
  if (failedUrls.length) console.log("FAILED/4xx+ REQUESTS:\n  " + failedUrls.join("\n  "));
  log("No failed network requests", failedUrls.length === 0, `${failedUrls.length} failed`);

  await browser.close();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n===== ${results.length - failed.length}/${results.length} PASSED =====`);
  if (failed.length) {
    console.log("FAILURES:");
    failed.forEach((f) => console.log(`  - ${f.name} :: ${f.detail}`));
    process.exit(1);
  }
})().catch((e) => {
  console.error("SCRIPT ERROR:", e);
  process.exit(1);
});
