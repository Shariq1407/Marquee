const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  * { margin:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background:#0a0a0a; color:#fafafa; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 80px;
  }
  .glow { position:absolute; width:900px; height:520px; border-radius:50%;
    background:radial-gradient(circle, rgba(241,156,41,0.30), transparent 65%);
    top:-160px; left:50%; transform:translateX(-50%); filter:blur(40px); }
  .dots { position:absolute; inset:0;
    background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
    background-size:44px 44px;
    -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%); }
  .brand { display:flex; align-items:center; gap:16px; position:relative; z-index:2; }
  .mark { width:64px; height:64px; border-radius:16px; display:grid; place-items:center;
    background:linear-gradient(135deg,#f19c29,#d97706); box-shadow:0 10px 30px -8px rgba(241,156,41,0.7); }
  .name { font-size:36px; font-weight:700; letter-spacing:-1.5px; }
  h1 { position:relative; z-index:2; font-size:88px; line-height:1.02; font-weight:800;
    letter-spacing:-4px; margin-top:52px; }
  h1 span { background:linear-gradient(135deg,#f19c29,#fcd34d,#f59e0b);
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  p { position:relative; z-index:2; font-size:30px; color:rgba(255,255,255,0.55);
    margin-top:28px; max-width:900px; line-height:1.4; }
  .badge { position:absolute; right:80px; bottom:70px; z-index:2;
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14);
    padding:16px 26px; border-radius:999px; font-size:24px; font-weight:600;
    display:flex; align-items:center; gap:12px; }
  .dot { width:12px; height:12px; border-radius:50%; background:#f19c29; }
</style></head>
<body>
  <div class="glow"></div><div class="dots"></div>
  <div class="brand">
    <div class="mark"><svg width="34" height="34" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5z" fill="#0f0f0f"/></svg></div>
    <div class="name">Marquee</div>
  </div>
  <h1>Discover. Watch. <span>Track.</span></h1>
  <p>Your movies, your series, your story. Keep everything you&rsquo;re watching in one beautiful place.</p>
  <div class="badge"><span class="dot"></span> Movie &amp; TV tracker for iPhone</div>
</body></html>`;

(async () => {
  const outDir = path.join(__dirname, "..", "public");
  fs.mkdirSync(outDir, { recursive: true });
  const tmp = path.join(outDir, "_og_src.html");
  fs.writeFileSync(tmp, html);

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--force-device-scale-factor=1"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto("file:///" + tmp.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(outDir, "og.png"),
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log("OG image written to public/og.png");
})();
