// 스모크 테스트: 세 페이지가 콘솔 에러 없이 열리고, 앱 페이지는 WebGL 캔버스가 그려지는지 확인
const { test, expect } = require("@playwright/test");

const PAGES = [
  { name: "첫 화면", path: "/", webgl: false },
  { name: "nice-cube", path: "/nice-cube/", webgl: true },
  { name: "air-squishy", path: "/air-squishy/", webgl: true },
];

for (const p of PAGES) {
  test(`${p.name} 페이지가 에러 없이 열림`, async ({ page }, testInfo) => {
    const errors = [];
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(`console: ${msg.text()}`); });
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

    const res = await page.goto(p.path, { waitUntil: "load" });
    expect(res.status()).toBe(200);

    if (p.webgl) {
      // 크기가 있는 캔버스 중 하나라도 WebGL 컨텍스트가 붙어 있어야 함
      await expect.poll(() => page.evaluate(() =>
        [...document.querySelectorAll("canvas")].some((c) => {
          if (!c.width || !c.height) return false;
          const gl = c.getContext("webgl2") || c.getContext("webgl");
          return !!gl && !gl.isContextLost();
        })
      ), { timeout: 10_000 }).toBe(true);
    }

    // 첫 프레임이 그려질 시간을 조금 주고 스크린샷을 남김 (test-results/ 아래)
    await page.waitForTimeout(800);
    await page.screenshot({ path: testInfo.outputPath(`${p.name}.png`) });

    expect(errors, errors.join("\n")).toEqual([]);
  });
}
