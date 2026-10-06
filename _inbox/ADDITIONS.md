# 이 컴퓨터(맥)에서 추가한 것 — 소스로 옮길 때 보는 문서

작성 2026-10-06. (같은 날 다른 컴퓨터에서 올라온 재빌드 커밋 9b9cd74 위에 다시 적용함) 포트폴리오 소스(Next.js, .tsx)는 다른 컴퓨터에만 있어서, 이 컴퓨터에서는 **gh-pages 빌드 결과물 위에 덧붙이는 방식**으로 추가했다.
다음에 소스에서 다시 빌드·배포하면 아래 파일은 모두 사라지므로, 이 문서를 보고 소스에 옮긴 뒤 배포하면 된다.

## 1. 덧붙인 방식 (소스 반영 후에는 전부 지워도 됨)

| 파일 | 역할 |
|---|---|
| `lab/inject.js` | 홈(`/`)이 하이드레이션된 뒤 DOM에 타일 6개 · 그다음 작업 카드 1개 · 작업실 안내 블록 · 푸터 링크를 추가하고, 숫자 문구를 최신화한다. `index.html`과 `work/*/index.html` 끝에 `<script src="/lab/inject.js" defer>` 한 줄로 붙어 있다. |
| `lab/index.html` | 작업실 페이지(정적 HTML, React 없음). 공개 전·로컬 전용 도구 14개. |
| `work/welfare-agent/index.html` | 복지사각지대 AI Agent PoC 작업 페이지(정적 HTML). 기존 work 페이지 마크업을 그대로 따랐다. |
| `lab/site.css` | 빌드 CSS(`_next/static/css/28022f2a5c52d8a4.css`, 2026-10-06 재빌드본) 복사본. 빌드 해시가 바뀌어도 정적 페이지가 깨지지 않게 분리했다. |
| `img/lab/*.jpg`, `img/screens/wa_*.jpg` | 새 썸네일과 화면. 전부 1600×1000 JPEG(claudetap만 600×1304). |

왜 빌드 결과물을 직접 고치지 않았나: React 18 하이드레이션은 `<main>` 안의 HTML이 RSC 페이로드와 다르면 클라이언트에서 다시 그려 수정분을 지운다. `<body>` 직계 자식 `<script>`는 싱글톤 스킵 규칙으로 허용되므로 그 자리에만 한 줄을 넣고, 나머지는 하이드레이션 뒤 JS로 넣었다. 상태로 다시 그려지는 「06 기록」 필터 목록은 건드리지 않았다(아래 §5 참고).

## 2. 「05 만든 것」에 추가한 타일 6개 (총 15개)

기존 타일 데이터 배열에 그대로 추가하면 된다. `art`는 기존 클래스(t-blue/t-mint/t-peach/t-lilac/t-dark), 썸네일은 `mk-browser` 프레임 1600×1000.

| 순서 | name | href | desc | meta | art | img |
|---|---|---|---|---|---|---|
| 10 | 이사정산소 | https://inno-hi-inc.github.io/isa-refund/ | 이사 나갈 때 돌려받을 장기수선충당금 계산 | 환급 계산 · 반환 서류 자동 생성 | t-blue | /img/lab/isa-refund.jpg |
| 11 | HTML Live Viewer | https://marketplace.visualstudio.com/items?itemName=innohi.html-live-viewer | VS Code에서 HTML을 실제 브라우저처럼 미리보기 | 설치 264 · 평점 5.0 · 라이브 리로드 | t-dark (mk-dark) | /img/lab/html-live-viewer.jpg |
| 12 | 맥 특수문자 단축어 | https://inno-hi-inc.github.io/mac-special-chars/ | 맥에서 윈도우 한자키처럼, ㅁ + 단축어로 특수문자 | 텍스트 대치 99종 · ⌥Space 팔레트 | t-mint | /img/lab/special-chars.jpg |
| 13 | 큐브 타이머 | https://inno-hi-inc.github.io/cstimer-clone/ | 토스 디자인으로 다시 만든 스피드큐브 타이머 | WCA 스크램블 16종 · 오프라인 PWA | t-lilac | /img/lab/cstimer.jpg |
| 14 | 아침 7시 | https://inno-hi-inc.github.io/oneul-news/ | 밤사이 뉴스를 묶어 매일 아침 7시에 발행하는 브리핑 | RSS 6종 · 자동 발행 · JSON API | t-peach | /img/lab/oneul-news.jpg |
| 15 | 언니의 비밀 | https://sister.ai.kr/ | 결정론 만세력 엔진 위에 해석만 AI가 맡는 연애 사주 | 함께 만든 서비스 · 만세력 엔진 · 리뉴얼 | t-dark (mk-dark) | /img/lab/sister.jpg |

관련 GitHub: khwee2000/isa-refund · INNO-HI-Inc/html-live-viewer · khwee2000/mac-special-chars · khwee2000/cstimer-clone · INNO-HI-Inc/oneul-news (언니의 비밀은 협업 레포 junfuture1103/sister-saju, 비공개).

제외한 것과 이유: `kidsdiag-app`(라이브가 다른 서비스 로그인 화면으로 바뀜), `safehi-demo`(안심하이 작업 안에 이미 있음), Nukki Studio HF Space(401, 비공개).

## 3. 「01 대표 작업 → 그다음 작업」 카드 07

- href `/work/welfare-agent/`, no `07`, title **복지사각지대 AI Agent PoC**
- one: AI가 판단을 대신하는 게 아니라, 공무원이 상담 전에 자료를 뒤지던 시간을 줄여야 했어요.
- steps: 위기정보 입수 / **정보수집 Agent**(mine) / 위기판단 / **자원 추천 + 근거**(mine) / **담당자 확인 (HITL)**(mine)
  - 아이콘은 고독사 카드의 「사건 기록 · 파생변수 설계 · 조합 비교 · 확률 + 근거 · 담당자 판단」 SVG를 순서대로 재사용했다.
- after: 행복이음 화면을 본뜬 작동 데모 · 승인 · 수정 · 반려 2단계 게이트 · A4 한 장 상담 준비 시트
- 카드가 4개가 되면 3열 그리드에 1개가 남으므로 `.nw`를 961px 이상에서 2열로 바꿨다(`inject.js`의 CSS).

## 4. 작업 페이지 `/work/welfare-agent/` 본문

`work/welfare-agent/index.html`에 전문이 있다. 소스의 work 데이터 구조(mesh facts → 01 문제 정의 → 02 동작 구조 → 03 내 판단 4개 → 04 결과 Before/제가 한 것/After + 숫자 3개 → 05 배운 것 → 이전/다음)에 맞춰 썼다.
화면 3장(`wa_hitl.jpg`, `wa_a4.jpg`, `wa_batch.jpg`)은 **합성 데이터**로 돌린 데모 캡처이고 캡션에 그렇게 적었다. `wa_role.jpg`는 예비.
이전/다음은 06 고독사 → 07 복지 AI → 01 양천구청으로 이었다. 기존 `lonely-death` 페이지의 「다음」을 07로 바꾸면 순환이 맞는다.

## 5. 숫자 문구 수정 (2026-10-06 실측)

| 위치 | 전 | 후 | 근거 |
|---|---|---|---|
| 04 결과 히어로 `data-count` | 2,500 | 2,600 | MD Pretty Viewer 설치 1,303(VS Marketplace API) + Claude Usage Widget 다운로드 1,001(GitHub Releases API, INNO-HI/ClaudeUsageWidget) + HTML Live Viewer 설치 264 + 한컴단축키 다운로드 61 = 2,629 |
| 04 결과 히어로 보조문 | 아래 제품 9개 보기 | 아래 제품 15개 보기 | |
| 04 결과 「공공 과제 · 실증」 · 히어로 통계 | 4 | 5 | 복지사각지대 AI Agent PoC 추가 |
| 히어로 통계 「제품 누적 설치」 | 2,500 | 2,600 | 위와 같음 |
| 05 만든 것 부제 | 2,500번 넘게 | 2,600번 넘게 | |
| MD Pretty Viewer meta | 설치 1,268 | 설치 1,303 | |
| Claude Usage Widget meta | 다운로드 984 | 다운로드 1,001 | |

**소스에서 꼭 손봐야 하는 것(스크립트로는 못 고침):** 「06 기록 58개」 목록과 필터 칩 수(만든 것 9 → 15, 일 11 → 12, 전체 58 → 65). 기록에 넣을 항목:

| 제목 | 종류 | 날짜 | 링크 |
|---|---|---|---|
| 복지사각지대 AI Agent PoC | 일 | 2026.02 – | /work/welfare-agent/ |
| 아침 7시 — 밤사이 뉴스를 묶어 매일 아침 7시에 발행하는 브리핑 | 제품 | 2026.09 | https://inno-hi-inc.github.io/oneul-news/ |
| HTML Live Viewer — VS Code에서 HTML을 실제 브라우저처럼 미리보기 | 제품 | 2026.07 | 마켓플레이스 |
| 언니의 비밀 — 결정론 만세력 엔진 위에 해석만 AI가 맡는 연애 사주 | 제품 | 2026.07 | https://sister.ai.kr/ |
| 큐브 타이머 — 토스 디자인으로 다시 만든 스피드큐브 타이머 | 제품 | 2026.07 | https://inno-hi-inc.github.io/cstimer-clone/ |
| 맥 특수문자 단축어 — 맥에서 윈도우 한자키처럼 | 제품 | 2026.07 | https://inno-hi-inc.github.io/mac-special-chars/ |
| 이사정산소 — 이사 나갈 때 돌려받을 장기수선충당금 계산 | 제품 | 2026.07 | https://inno-hi-inc.github.io/isa-refund/ |

## 6. 작업실(`/lab/`) 14개 — 소스에 페이지로 옮길 때의 데이터

전문은 `lab/index.html`. 그룹 · 이름 · 상태 · 시기 · 비주얼만 요약한다.

| 그룹 | 이름 | 상태 | 시기 | 비주얼 | 로컬 폴더 |
|---|---|---|---|---|---|
| 내 컴퓨터 | 노션투두 | 로컬 전용 | 2026.05 | 터미널 목업 | ~/Desktop/notiontodo |
| 내 컴퓨터 | 샷정리 | 로컬 전용 | 2026.06 | 터미널 목업 | ~/Desktop/snapsort |
| 내 컴퓨터 | nukkishot | 완성 · 로컬 | 2026.07 | 터미널 목업 | ~/nukkishot |
| 내 컴퓨터 | Nukki Studio | 로컬 웹앱 | 2026.06 | 터미널 목업 | ~/nukki |
| 내 컴퓨터 | ClaudeTap | 진행 중 | 2026.06 | /img/lab/claudetap.jpg | ~/claude-tap |
| 서비스 실험 | SAJU OS와 만세력 엔진 | 로컬 | 2026.07 | /img/lab/saju-os.jpg | ~/saju-os, ~/saju-engine |
| 서비스 실험 | 쓰레드 발행기 | 비공개 운영 | 2026.09 | /img/lab/threads.jpg | ~/threads-bot |
| 서비스 실험 | 미니 주식 대시보드 | 개인용 | 2026.06 | 터미널 목업 | ~/stock-dashboard |
| 서비스 실험 | 케어투데이 글쓰기 패널 | 비공개 | 2026.07 | 터미널 목업 | ~/care-blog |
| 서비스 실험 | 오늘하이 | 시뮬레이터 데모 | 2026.04 | /img/lab/oneul-hi.jpg | ~/Desktop/oneul-hi |
| 서비스 실험 | AICC Call | 프로토타입 | 2026.04 | 터미널 목업 | ~/aicc-call |
| 서비스 실험 | 커리요 디자인 시스템 | 디자인 산출물 | 2026.07 | /img/lab/careeryo.jpg | ~/careeryo/design |
| 일하는 방식 | 에이전트 하네스 | 계속 | 2026 | 터미널 목업 | ~/.claude/agents (50) · 프로젝트 포함 160여 개 · 스킬 67 |
| 일하는 방식 | 반디온 스마트돌봄 관제 | 기관 과제 | 2026.08 | 텍스트만 | ~/bandion-db-dashboard |

## 7. 일부러 넣지 않은 것

- **반디온 관제 화면 · 고독사 판별 GUI · SHAP 캡처** (`~/Desktop/포트폴리오_캡처/2,3,4`): 실제 운영 수치(대상자 82명, 케이스 57,185건 등)가 들어 있어 사이트의 「기관 과제는 수치 미기재」 원칙과 충돌한다. 넣으려면 수치를 가리거나 합성 화면으로 다시 찍어야 한다.
- 제안서·사업계획서 하네스(AX-Sprint, FutureScape, 연어 RAS, 소상공인 AI), 피우다 신청, 노래취향 볼트, 정보처리기사 정리, 신입공채 리서치: 포트폴리오 성격이 아니라 제외.
- GitHub에만 있는 것(do-it-yb 링크룸, dog-recommendation-systems, dacon_crew, it-salary-ledger): 이 컴퓨터에 폴더가 없어 범위 밖. 「기록」 후보로는 좋다.

## 8. 검증한 것

- 로컬 정적 서버에서 Playwright(Chrome)로 홈 · 작업실 · 복지 AI 페이지를 1440px / 390px로 열어 콘솔 에러 0, 네트워크 4xx 0, 깨진 이미지 0, 타일 15개 · 카드 4개 · 작업실 블록 · 푸터 링크 주입, 숫자 문구 6곳 반영, 하이드레이션 경고 없음, work 페이지 → 로고 클릭(클라이언트 네비게이션)으로 홈에 돌아와도 15/4 유지, 작업실 카드 14개를 확인했다(2026-10-06).
