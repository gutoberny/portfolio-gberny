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

try {
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

      console.log(`\n${route.path} @ ${vp.w}px`);

      let res;
      try {
        res = await page.goto(BASE + route.path, { waitUntil: "networkidle0" });
      } catch (err) {
        fail(`${route.path} @ ${vp.w}px: navegação falhou (${err.message})`);
        await page.close();
        continue;
      }

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
          // Verdadeiro quando QUALQUER elemento casando com sel intersecta a
          // primeira tela — não só o primeiro do DOM. Necessário porque a
          // home renderiza dois elementos [data-gate=agent] (terminal
          // desktop hidden md:flex + barra mobile md:hidden): no mobile o
          // primeiro em ordem de DOM é o terminal desktop, invisível e com
          // rect zerado, e um querySelector ingênuo reportaria falso
          // negativo mesmo com a barra mobile plenamente visível.
          const visible = (sel) => {
            const els = document.querySelectorAll(sel);
            if (els.length === 0) return false;
            return [...els].some((el) => {
              const r = el.getBoundingClientRect();
              return r.top < vh && r.bottom > 0;
            });
          };
          const inFold = (el) => {
            const r = el.getBoundingClientRect();
            return r.top < vh && r.bottom > 0;
          };
          return {
            name: visible("[data-gate=name]"),
            role: visible("[data-gate=role]"),
            metrics: [...document.querySelectorAll("[data-gate=metric]")].filter(inFold).length,
            cv: visible("[data-gate=cv]"),
            agent: visible("[data-gate=agent]"),
          };
        }, vp.h);

        if (!fold.name) fail("nome não está na primeira tela");
        else pass("nome visível");
        if (!fold.role) fail("cargo não está na primeira tela");
        else pass("cargo visível");
        if (fold.metrics !== 4) fail(`esperava 4 métricas na primeira tela, encontrei ${fold.metrics}`);
        else pass("4 métricas presentes");
        if (!fold.cv) fail("link do CV não está na primeira tela");
        else pass("link do CV visível");
        if (!fold.agent) fail("o agente não está na primeira tela");
        else pass("agente visível");
      }

      // 4. Sheet do agente no mobile — abrir, foco, alvos de toque com a
      // folha aberta, Esc fecha e devolve o foco (spec §9.4).
      if (route.path === "/" && vp.mobile) {
        await page.click('button[data-gate="agent"]');
        await page.waitForSelector('[role="dialog"]');

        const focusInsideDialog = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          return !!dialog && dialog.contains(document.activeElement);
        });
        if (!focusInsideDialog) fail("folha do agente: foco não entrou no diálogo ao abrir");
        else pass("folha do agente: foco entra no diálogo ao abrir");

        // Alvos de toque com a folha ABERTA — sem isto a varredura nunca vê
        // as sugestões (o terminal desktop é display:none e a folha nunca é
        // aberta na varredura padrão).
        const smallWithSheetOpen = await page.evaluate(() =>
          [...document.querySelectorAll('[role="dialog"] a, [role="dialog"] button, [role="dialog"] [role=button], [role="dialog"] input')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
            })
            .map((el) => {
              const r = el.getBoundingClientRect();
              return `${el.tagName}"${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`;
            })
        );
        if (smallWithSheetOpen.length) fail(`folha do agente: alvos de toque <44px: ${smallWithSheetOpen.join(" | ")}`);
        else pass("folha do agente: alvos de toque >=44px com a folha aberta");

        await page.keyboard.press("Escape");
        await new Promise((r) => setTimeout(r, 150));

        const closedAndFocusReturned = await page.evaluate(() => {
          const dialogGone = !document.querySelector('[role="dialog"]');
          const active = document.activeElement;
          const focusOnOpener = !!active && active.tagName === "BUTTON" && active.getAttribute("data-gate") === "agent";
          return dialogGone && focusOnOpener;
        });
        if (!closedAndFocusReturned) fail("folha do agente: Esc não fechou a folha ou não devolveu o foco ao abridor");
        else pass("folha do agente: Esc fecha e devolve o foco ao abridor");

        // Botão X também fecha e devolve o foco — spec §9.4 exige os dois
        // caminhos (Esc E o botão), não só o teclado.
        await page.click('button[data-gate="agent"]');
        await page.waitForSelector('[role="dialog"]');
        await page.click('[role="dialog"] > div:first-child > button');
        await new Promise((r) => setTimeout(r, 150));

        const closedAndFocusReturnedByButton = await page.evaluate(() => {
          const dialogGone = !document.querySelector('[role="dialog"]');
          const active = document.activeElement;
          const focusOnOpener = !!active && active.tagName === "BUTTON" && active.getAttribute("data-gate") === "agent";
          return dialogGone && focusOnOpener;
        });
        if (!closedAndFocusReturnedByButton) fail("folha do agente: botão X não fechou a folha ou não devolveu o foco ao abridor");
        else pass("folha do agente: botão X fecha e devolve o foco ao abridor");

        // Sugestão sem chave de API: nota offline + resposta pré-escrita,
        // sem erro cru na tela (spec §6 — requisito de release).
        await page.click('button[data-gate="agent"]');
        await page.waitForSelector('[role="dialog"]');
        await page.click('[role="dialog"] button.rounded-full');
        await new Promise((r) => setTimeout(r, 1200));

        const chipResult = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          const text = dialog ? dialog.textContent || "" : "";
          const rawErrorPatterns = [/TypeError/i, /Failed to fetch/i, /status \d{3}/i, /Unhandled/i, /\[object Object\]/i];
          return {
            hasOfflineNote: /indispon[ií]vel|unavailable|no disponible/i.test(text),
            hasRawError: rawErrorPatterns.some((re) => re.test(text)),
          };
        });
        if (!chipResult.hasOfflineNote) fail("sugestão sem API key: nota de offline/fallback não apareceu");
        else pass("sugestão sem API key: nota de offline/fallback apareceu");
        if (chipResult.hasRawError) fail("sugestão sem API key: erro cru visível na tela");
        else pass("sugestão sem API key: sem erro cru na tela");

        await page.keyboard.press("Escape");
        await new Promise((r) => setTimeout(r, 150));
      }

      await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}.png`, fullPage: false });
      await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}-full.png`, fullPage: true });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} falha(s) no gate visual.`);
  process.exit(1);
}
console.log("\nGate visual passou. Prints em .gate/");
