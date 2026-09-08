import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const BASE = process.env.GATE_BASE_URL || "http://localhost:3000";
const OUT = ".gate";

const WIDTHS = [
  { w: 390, h: 844, mobile: true, name: "mobile-390" },
  { w: 768, h: 1024, mobile: false, name: "tablet-768" },
  { w: 1280, h: 800, mobile: false, name: "desktop-1280" },
  { w: 1440, h: 900, mobile: false, name: "desktop-1440" },
];

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/work/agents-ia", name: "case-study" },
];

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.error("  FAIL " + msg);
};
const pass = (msg) => console.log("  ok   " + msg);

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const route of ROUTES) {
  for (const vp of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.w,
      height: vp.h,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      deviceScaleFactor: 1,
    });

    const res = await page.goto(BASE + route.path, { waitUntil: "networkidle0" });
    console.log(`\n${route.path} @ ${vp.w}px`);

    if (!res || res.status() >= 400) {
      fail(`${route.path} respondeu ${res ? res.status() : "sem resposta"}`);
      await page.close();
      continue;
    }

    // 1. Zero scroll horizontal
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      culprits: [...document.querySelectorAll("*")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 5)
        .map((el) => el.tagName + "." + String(el.className).slice(0, 40)),
    }));
    if (overflow.scrollWidth > overflow.innerWidth + 1) {
      fail(`scroll horizontal: ${overflow.scrollWidth} > ${overflow.innerWidth}. Suspeitos: ${overflow.culprits.join(", ")}`);
    } else {
      pass("sem scroll horizontal");
    }

    // 2. Alvos de toque em mobile
    if (vp.mobile) {
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("a, button, [role=button], input")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
          })
          .map((el) => {
            const r = el.getBoundingClientRect();
            return `${el.tagName}"${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`;
          })
      );
      if (small.length) fail(`alvos de toque <44px: ${small.join(" | ")}`);
      else pass("alvos de toque >=44px");
    }

    // 3. Above the fold da home
    if (route.path === "/") {
      const fold = await page.evaluate((vh) => {
        const visible = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < vh && r.bottom > 0;
        };
        return {
          name: visible("[data-gate=name]"),
          role: visible("[data-gate=role]"),
          metrics: document.querySelectorAll("[data-gate=metric]").length,
          cv: visible("[data-gate=cv]"),
          agent: visible("[data-gate=agent]"),
        };
      }, vp.h);

      if (!fold.name) fail("nome não está na primeira tela");
      else pass("nome visível");
      if (!fold.role) fail("cargo não está na primeira tela");
      else pass("cargo visível");
      if (fold.metrics !== 4) fail(`esperava 4 métricas, encontrei ${fold.metrics}`);
      else pass("4 métricas presentes");
      if (!fold.cv) fail("link do CV não está na primeira tela");
      else pass("link do CV visível");
      if (!fold.agent) fail("o agente não está na primeira tela");
      else pass("agente visível");
    }

    await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}.png`, fullPage: false });
    await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}-full.png`, fullPage: true });
    await page.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} falha(s) no gate visual.`);
  process.exit(1);
}
console.log("\nGate visual passou. Prints em .gate/");
