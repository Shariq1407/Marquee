const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE || "http://localhost:3202";

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const p = await b.newPage();
  const w = Number(process.env.W || 1440);
  const h = Number(process.env.H || 900);
  await p.setViewport({ width: w, height: h });
  await p.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2200));
  // scroll so the hands centerpiece is centered in view
  await p.evaluate(() => {
    const el = document.querySelector("#top .relative.flex.justify-center") || document.querySelector("#top");
    el.scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 900));
  const out = process.env.OUT || "shots/hero-hands.png";
  await p.screenshot({ path: out });
  console.log("saved", out);
  await b.close();
})();
