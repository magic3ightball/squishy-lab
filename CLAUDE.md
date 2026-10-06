# squishy-lab 작업 규칙

## 목적
손끝으로 만지는 웹 말랑이 장난감 모음. GitHub Pages로 배포한다.
- `nice-cube/index.html` (나이스 큐브): 바닥에 놓인 큐브. 마우스·트랙패드·아이폰 터치로 누르기/당기기/핀치. 질감(젤리·유리·푸딩·물슬라임), 바풍, 반짝이, 로고, 소리.
- `air-squishy/index.html` (공중 말랑이): 웹캠 손 추적으로 공중에 뜬 큐브를 만짐. 마우스·트랙패드 모드, 개발자 모드(A1~A4 A/B 비교, 녹화/재생, `?dev`).
- `index.html`: 두 앱으로 가는 첫 화면.

## 원칙
- 빌드 단계 없음. 각 앱은 HTML 한 파일 안에 CSS/JS를 모두 담는다. 번들러·프레임워크·별도 js/css 파일을 추가하지 않는다.
- `package.json`은 Playwright 스모크 테스트용일 뿐, 배포물에 포함되지 않는다.
- 외부 의존성은 버전을 고정한 CDN 주소를 그대로 쓴다. 바꿀 때는 사용자에게 먼저 묻는다.
  - three.js r128: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` (두 앱)
  - MediaPipe tasks-vision 0.10.14: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/` (air-squishy)
  - 손 모델: `https://huggingface.co/Leo-TX/mediapipe-hand/resolve/main/hand_landmarker.task`, 실패하면 Google Storage `hand_landmarker/float16/latest` (air-squishy)
  - Google Fonts: Outfit, IBM Plex Sans KR (두 앱)

## 수정 후 확인
- 수정한 뒤에는 반드시 `npm test`(tests/smoke.spec.js)를 돌린다. 데스크톱 크롬과 아이폰 13 에뮬레이션에서 세 페이지가 콘솔 에러 없이 열리고 WebGL이 뜨는지 본다.
- 가능하면 스크린샷(`test-results/`나 브라우저 미리보기)으로 화면을 직접 확인한다.
- 헤드리스에서 WebGL이 안 뜨면 `--use-gl=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist` (playwright.config.js에 이미 들어 있음).
- 아이폰 13 항목은 크로뮴 에뮬레이션이라 사파리 고유 동작은 검증하지 못한다. 터치·소리 관련 변경은 실기기 확인이 필요하다고 사용자에게 알린다.

## 플랫폼 주의점
- air-squishy의 카메라(getUserMedia)는 **https 또는 localhost**에서만 동작한다. `file://`로는 안 된다.
- 아이폰 사파리:
  - `navigator.vibrate`를 지원하지 않는다. 진동은 있으면 쓰는 보조 효과로만 둔다.
  - 무음 모드(벨소리 스위치)에서는 WebAudio 소리가 나지 않는다. 버그로 오해하지 않는다.
  - 두 손가락 제스처(핀치)는 **포인터 이벤트**(pointerId 두 개의 거리)로 처리한다. 모바일에서 `gesturestart/change/end`는 페이지 확대를 막으려고 `preventDefault`만 한다.
  - 참고: 데스크톱 사파리에서는 트랙패드 핀치를 `gesturechange`의 `scale`로 받고, 크롬 계열은 `ctrlKey`가 붙은 `wheel`로 받는다. 두 경로를 모두 유지한다.

## 스타일
- 코드 주석은 한국어로 쓴다.
- 커밋 메시지는 한국어로. 첫 줄은 무엇을 왜 바꿨는지 한 줄 요약, 필요하면 빈 줄 뒤에 본문.
- 저장소 공개 범위 변경, push, Pages 설정 변경은 사용자에게 먼저 확인받는다.
