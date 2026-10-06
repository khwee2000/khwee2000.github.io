/* 작업실 주입 스크립트 — khwee2000.github.io
 *
 * 이 파일은 Next.js 빌드 결과물(gh-pages 브랜치) 위에 "이 컴퓨터(맥)에서 만든 것"을 덧붙입니다.
 * 소스(.tsx)가 다른 컴퓨터에만 있어서, 빌드 산출물을 직접 고치는 대신 하이드레이션이 끝난 뒤 DOM에 추가합니다.
 *
 * 원칙
 *  1. React 하이드레이션이 끝난 뒤에만 DOM을 만집니다. (<html class="fx">가 붙거나, load 후 2.5초)
 *  2. 상태로 다시 그려지는 영역(06 기록의 필터 목록)은 건드리지 않습니다.
 *  3. 클라이언트 네비게이션으로 홈이 다시 그려지면 MutationObserver가 다시 주입합니다.
 *
 * 소스로 옮길 때는 /_inbox/ADDITIONS.md 를 보세요. 소스에 반영한 뒤에는 이 스크립트와 <script> 태그를 지우면 됩니다.
 */
(function () {
  'use strict';
  if (window.__labInjected) return;
  window.__labInjected = true;

  var GO = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 7H17v8.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  /* 05 만든 것 — 공개돼 있고 누르면 바로 쓸 수 있는 것만 */
  var TILES = [
    { href: 'https://inno-hi-inc.github.io/isa-refund/', url: 'inno-hi-inc.github.io/isa-refund', art: 't-blue', img: '/img/lab/isa-refund.jpg',
      name: '이사정산소', desc: '이사 나갈 때 돌려받을 장기수선충당금 계산', meta: '환급 계산 · 반환 서류 자동 생성' },
    { href: 'https://marketplace.visualstudio.com/items?itemName=innohi.html-live-viewer', url: 'marketplace · html-live-viewer', art: 't-dark', dark: true, img: '/img/lab/html-live-viewer.jpg',
      name: 'HTML Live Viewer', desc: 'VS Code에서 HTML을 실제 브라우저처럼 미리보기', meta: '설치 264 · 평점 5.0 · 라이브 리로드' },
    { href: 'https://inno-hi-inc.github.io/mac-special-chars/', url: 'inno-hi-inc.github.io/mac-special-chars', art: 't-mint', img: '/img/lab/special-chars.jpg',
      name: '맥 특수문자 단축어', desc: '맥에서 윈도우 한자키처럼, ㅁ + 단축어로 특수문자', meta: '텍스트 대치 99종 · ⌥Space 팔레트' },
    { href: 'https://inno-hi-inc.github.io/cstimer-clone/', url: 'inno-hi-inc.github.io/cstimer-clone', art: 't-lilac', img: '/img/lab/cstimer.jpg',
      name: '큐브 타이머', desc: '토스 디자인으로 다시 만든 스피드큐브 타이머', meta: 'WCA 스크램블 16종 · 오프라인 PWA' },
    { href: 'https://inno-hi-inc.github.io/oneul-news/', url: 'inno-hi-inc.github.io/oneul-news', art: 't-peach', img: '/img/lab/oneul-news.jpg',
      name: '아침 7시', desc: '밤사이 뉴스를 묶어 매일 아침 7시에 발행하는 브리핑', meta: 'RSS 6종 · 자동 발행 · JSON API' },
    { href: 'https://sister.ai.kr/', url: 'sister.ai.kr', art: 't-dark', dark: true, img: '/img/lab/sister.jpg',
      name: '언니의 비밀', desc: '결정론 만세력 엔진 위에 해석만 AI가 맡는 연애 사주', meta: '함께 만든 서비스 · 만세력 엔진 · 리뉴얼' }
  ];

  /* 01 대표 작업 — 그다음 작업 카드 07 */
  var NW = {
    href: '/work/welfare-agent/', no: '07', title: '복지사각지대 AI Agent PoC',
    one: 'AI가 판단을 대신하는 게 아니라, 공무원이 상담 전에 자료를 뒤지던 시간을 줄여야 했어요.',
    steps: [
      { label: '위기정보 입수', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="currentColor" opacity="0.12"></path><path d="M14 3H6v18h12V7z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 3v4h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 12h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 16h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>' },
      { label: '정보수집 Agent', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5z" fill="currentColor" opacity="0.12"></path><path d="M12 3l9 5-9 5-9-5z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12.5l9 5 9-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16.5l9 5 9-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>', mine: true },
      { label: '위기판단', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="currentColor" opacity="0.12"></path><path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 16v-3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16V8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 16v-5.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>' },
      { label: '자원 추천 + 근거', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" fill="currentColor" opacity="0.12"></path><path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.5 15v5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 17.5h5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>', mine: true },
      { label: '담당자 확인 (HITL)', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="currentColor" opacity="0.12"></path><path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 20.5c0-4 3.4-7 7.5-7s7.5 3 7.5 7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>', mine: true }
    ],
    after: '행복이음 화면을 본뜬 작동 데모 · 승인 · 수정 · 반려 2단계 게이트 · A4 한 장 상담 준비 시트',
    afterIcon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" fill="currentColor" opacity="0.12"></path><path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12.5l2.7 2.7L16 9.8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
  };

  var STRIP = '<div><p class="lab-strip-k">작업실</p>' +
    '<p class="lab-strip-t">공개 전이거나 제 컴퓨터에서만 도는 도구 14개는 따로 모아 뒀어요</p>' +
    '<p class="lab-strip-s">메뉴바 위젯 · 스크린샷 정리 · 누끼 CLI · iPhone 원격 승인 · 만세력 엔진 · 자동 발행 가드 · 에이전트 하네스</p></div>' +
    '<a class="pill-link" href="/lab/">작업실 보기<span class="pill-link-arrow" aria-hidden="true">→</span></a>';

  var CSS = '' +
    '.lab-strip{display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1344px;margin:64px auto 0;padding:34px 40px;border-radius:28px;background:var(--g100)}' +
    '.lab-strip-k{font-size:14px;font-weight:700;color:var(--toss)}' +
    '.lab-strip-t{margin-top:6px;font-size:22px;line-height:1.35;font-weight:700;letter-spacing:-.03em;color:var(--ink)}' +
    '.lab-strip-s{margin-top:6px;font-size:15px;line-height:1.6;color:var(--g600)}' +
    '.lab-strip .pill-link{flex:none;margin-top:0;align-self:center;background:#fff}' +
    '@media (min-width:961px){.nw[data-lab="1"]{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:640px){.lab-strip{flex-direction:column;align-items:flex-start;padding:26px 22px;border-radius:22px}.lab-strip-t{font-size:19px}.lab-strip .pill-link{align-self:flex-start}}';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function tileHTML(t, i) {
    return '<a href="' + esc(t.href) + '" class="tile-item" data-reveal="true" target="_blank" rel="noreferrer" style="--i:' + (i % 3) + '" data-lab-item="1">' +
      '<span class="tile-art ' + t.art + '"><span class="tile-frame">' +
      '<figure class="mk-browser ' + (t.dark ? 'mk-dark ' : '') + '" data-reveal="true">' +
      '<div class="mk-bar" aria-hidden="true"><i></i><i></i><i></i><span class="mk-url">' + esc(t.url) + '</span></div>' +
      '<img src="' + esc(t.img) + '" alt="' + esc(t.name) + ' 화면" loading="lazy" width="1600" height="1000"/></figure>' +
      '</span><span class="tile-go" aria-hidden="true">' + GO + '</span></span>' +
      '<span class="tile-name">' + esc(t.name) + '</span>' +
      '<span class="tile-desc">' + esc(t.desc) + '</span>' +
      '<span class="tile-meta">' + esc(t.meta) + '</span></a>';
  }

  function nwHTML(i) {
    var steps = NW.steps.map(function (s) {
      return '<span class="' + (s.mine ? 'mine' : '') + '">' + s.icon + esc(s.label) + '</span>';
    }).join('');
    return '<a class="nw-card" data-reveal="true" href="' + NW.href + '" style="--i:' + i + '" data-lab-item="1">' +
      '<span class="nw-no">' + NW.no + '</span>' +
      '<span class="nw-title">' + esc(NW.title) + '</span>' +
      '<span class="nw-one">' + esc(NW.one) + '</span>' +
      '<span class="nw-steps">' + steps + '</span>' +
      '<span class="nw-after">' + NW.afterIcon + ' ' + esc(NW.after) + '</span>' +
      '<span class="nw-go">자세히 보기 <span aria-hidden="true">→</span></span></a>';
  }

  function reveal(nodes) {
    var fx = document.documentElement.classList.contains('fx');
    function show(n) { n.classList.add('in'); n.querySelectorAll('[data-reveal]').forEach(function (c) { c.classList.add('in'); }); }
    if (!fx || !('IntersectionObserver' in window)) { nodes.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (!e.isIntersecting) return; show(e.target); io.unobserve(e.target); });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function setCount(el, value) {
    if (!el) return;
    el.dataset.count = value;
    var animated = el.classList.contains('in') || !document.documentElement.classList.contains('fx');
    if (animated) setTimeout(function () { el.textContent = value; }, 1500);
  }

  /* 숫자 최신화 — 2026-10-06, VS Marketplace API · GitHub Releases API 기준 */
  function retext() {
    var sub = document.querySelector('#made .sh2-sub');
    if (sub && sub.textContent.indexOf('2,500') > -1) sub.textContent = sub.textContent.replace('2,500', '2,600');

    var heroV = document.querySelector('.pb2-hero-v [data-count]');
    if (heroV && heroV.dataset.count === '2,500') setCount(heroV, '2,600');

    var heroS = document.querySelector('.pb2-hero-s');
    if (heroS && /제품 9개/.test(heroS.textContent)) heroS.textContent = heroS.textContent.replace('제품 9개', '제품 15개');

    /* 04 결과 보드(.pb2-stats)와 히어로 통계(.hx-stats) 둘 다 */
    document.querySelectorAll('.pb2-stats > div, .hx-stats > div').forEach(function (d) {
      var dt = d.querySelector('dt'), c = d.querySelector('[data-count]');
      if (!dt || !c) return;
      if (dt.textContent.indexOf('공공 과제') > -1 && c.dataset.count === '4') setCount(c, '5');
      if (dt.textContent.indexOf('누적 설치') > -1 && c.dataset.count === '2,500') setCount(c, '2,600');
    });

    document.querySelectorAll('#made .tile-item').forEach(function (a) {
      var n = a.querySelector('.tile-name'), m = a.querySelector('.tile-meta');
      if (!n || !m) return;
      if (n.textContent === 'MD Pretty Viewer') m.textContent = m.textContent.replace('설치 1,268', '설치 1,303');
      if (n.textContent === 'Claude Usage Widget') m.textContent = m.textContent.replace('다운로드 984', '다운로드 1,001');
    });
  }

  function footer() {
    var ft = document.querySelector('.ft-links');
    if (ft && !ft.querySelector('a[href="/lab/"]')) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="/lab/">작업실</a>';
      ft.appendChild(li);
    }
  }

  function style() {
    if (document.getElementById('lab-style')) return;
    var st = document.createElement('style');
    st.id = 'lab-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function inject() {
    style();

    var grid = document.querySelector('#made .tiles-grid');
    if (grid && !grid.hasAttribute('data-lab')) {
      grid.setAttribute('data-lab', '1');
      var start = grid.children.length;
      var tmp = document.createElement('div');
      tmp.innerHTML = TILES.map(function (t, k) { return tileHTML(t, start + k); }).join('');
      var added = Array.prototype.slice.call(tmp.children);
      added.forEach(function (n) { grid.appendChild(n); });

      var strip = document.createElement('div');
      strip.className = 'lab-strip';
      strip.setAttribute('data-reveal', 'true');
      strip.innerHTML = STRIP;
      grid.insertAdjacentElement('afterend', strip);
      reveal(added.concat([strip]));
    }

    var nw = document.querySelector('#work .nw');
    if (nw && !nw.hasAttribute('data-lab')) {
      nw.setAttribute('data-lab', '1');
      var holder = document.createElement('div');
      holder.innerHTML = nwHTML(nw.children.length);
      var card = holder.firstElementChild;
      nw.appendChild(card);
      reveal([card]);
    }

    retext();
    footer();
  }

  function whenHydrated(cb) {
    var html = document.documentElement, fired = false, mo = null;
    function go() { if (fired) return; fired = true; if (mo) mo.disconnect(); cb(); }
    if (html.classList.contains('fx')) return go();
    mo = new MutationObserver(function () { if (html.classList.contains('fx')) go(); });
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    /* 모션 축소 환경에서는 fx가 붙지 않으므로 load 후 2.5초를 폴백으로 둡니다 */
    var arm = function () { setTimeout(go, 2500); };
    if (document.readyState === 'complete') arm(); else window.addEventListener('load', arm);
  }

  whenHydrated(function () {
    inject();
    var pending = null;
    new MutationObserver(function () {
      if (pending) return;
      pending = setTimeout(function () { pending = null; inject(); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
  });
})();
