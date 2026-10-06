// 스모크 테스트 설정: 정적 서버를 띄우고 데스크톱 크롬 + 아이폰 13 화면에서 확인
const { defineConfig, devices } = require("@playwright/test");

const PORT = 8765;

// 헤드리스에서 WebGL이 안 뜨는 경우를 대비해 소프트웨어 GL(SwiftShader)을 씀
const glArgs = ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];

module.exports = defineConfig({
  testDir: "tests",
  timeout: 60_000,  // 소프트웨어 GL에서 nice-cube 첫 렌더가 ~27초 걸려 여유를 둠
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions: { args: glArgs },
  },
  webServer: {
    command: `python3 -m http.server ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // 아이폰 13 화면 크기·터치·UA 에뮬레이션 (엔진은 크로뮴이라 사파리 고유 동작은 확인 못 함)
    { name: "iphone13", use: { ...devices["iPhone 13"], browserName: "chromium" } },
  ],
});
