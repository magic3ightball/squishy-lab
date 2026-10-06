# 작업 인계

- 목표: 웹 말랑이 두 개(nice-cube, air-squishy)를 정적 파일 그대로 GitHub Pages로 배포
- 저장소: `magic3ightball/squishy-lab`, 브랜치 `main`
- 배포: `.github/workflows/pages.yml` (main push 시 `index.html`, `nice-cube/`, `air-squishy/`만 올림)
- 주소: https://magic3ightball.github.io/squishy-lab/ (`nice-cube/`, `air-squishy/`)

## 검증된 명령
```bash
npm install && npx playwright install chromium
npm test   # 데스크톱 + iPhone 13 에뮬레이션, 6개 테스트
```
- 2026-10-06 첫 정리 시점: 6개 모두 통과. 소프트웨어 GL에서 nice-cube 첫 렌더가 ~27초 걸려 타임아웃을 60초로 둠.

## 다음 단계 / 주의
- 아이폰 사파리 실기기 확인은 아직 안 함 (에뮬레이션은 크로뮴 엔진).
- air-squishy 카메라·손 인식은 자동 테스트에서 다루지 않음 (첫 화면 로드만 확인).
