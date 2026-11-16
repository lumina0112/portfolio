/* Home 화면. 리소 2도 판 콘셉트: 먹 판과 핑크 판이 움직임의 속도만큼 어긋났다가 스프링으로 맞춰진다.
   index.html의 window.SITE(라우팅, 카드 조각, 줄글 처리)를 쓰고, 다른 화면의 코드는 건드리지 않는다.
   캐릭터 피규어는 HOME.figure가 있을 때만 fig.js가 따로 맡는다(v1에서는 없음). */
(function(){
  var S = window.SITE, HM = window.HOME || {}, P = window.PROJECTS;
  if(!S || !document.getElementById("v-home")) return;
  var $ = S.$, $$ = S.$$, esc = S.esc;
  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var home = document.getElementById("v-home");
  function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }
  function n2(i){ return String(i + 1).padStart(2, "0"); }

  /* ---------- 스프링 ---------- */
  var K = { chew: [220, 14], snap: [320, 18], slow: [120, 16] };
  function Sp(x){ return { x: x || 0, v: 0, to: x || 0 }; }
  function step(s, k, dt){ var a = -k[0] * (s.x - s.to) - k[1] * s.v; s.v += a * dt; s.x += s.v * dt; return s; }
  function rest(s){ return Math.abs(s.v) < .01 && Math.abs(s.x - s.to) < .01; }
  function settle(s){ s.x = s.to; s.v = 0; }

  /* ---------- 하나의 애니메이션 루프. 움직이는 것이 없으면 멈추고, 입력이 오면 깨운다 ---------- */
  var tasks = [], running = false, last = 0, idle = 0;
  function tick(now){
    var dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000)); last = now;
    var busy = false;
    for(var i = 0; i < tasks.length; i++) if(tasks[i](dt, now)) busy = true;
    idle = busy ? 0 : idle + 1;
    if(idle > 40){ running = false; return; }
    requestAnimationFrame(tick);
  }
  function wake(){ if(running) return; running = true; idle = 0; last = performance.now(); requestAnimationFrame(tick); }

  /* ---------- 자모 타이핑 ---------- */
  var CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  function jamo(ch){
    var c = ch.charCodeAt(0) - 0xAC00;
    if(c < 0 || c > 11171) return [ch];
    var L = Math.floor(c / 588), V = Math.floor((c % 588) / 28), T = c % 28;
    var lv = String.fromCharCode(0xAC00 + L * 588 + V * 28);
    return T ? [CHO[L], lv, ch] : [CHO[L], ch];
  }
  /* el 안의 글(텍스트, 형광펜 span, br)을 그대로 두고 보이지 않게 깐 뒤, 같은 구조를 한 글자씩 겹쳐 쓴다 */
  function typeEl(el, per, done){
    if(el.dataset.typed) return; el.dataset.typed = "1";
    var ghost = document.createElement("span"); ghost.className = "h-ghost";
    while(el.firstChild) ghost.appendChild(el.firstChild);
    var layer = document.createElement("span"); layer.className = "h-type"; layer.setAttribute("aria-hidden", "true");
    el.classList.add("h-typed");
    el.setAttribute("aria-label", ghost.textContent.replace(/\s+/g, " ").trim());
    el.appendChild(ghost); el.appendChild(layer);
    if(reduced){
      layer.innerHTML = ghost.innerHTML;
      $$(".hl.draw", layer).forEach(function(x){ x.classList.add("on"); });
      if(done) done(); return;
    }
    var q = [];
    (function walk(src, dst){
      Array.prototype.forEach.call(src.childNodes, function(n){
        if(n.nodeType === 3){ var t = n.nodeValue; for(var i = 0; i < t.length; i++) q.push({ c: t[i], dst: dst }); }
        else if(n.nodeName === "BR") q.push({ br: true, dst: dst });
        else { var c = n.cloneNode(false); c.classList.remove("on"); c.removeAttribute("id"); q.push({ open: c, dst: dst }); walk(n, c); q.push({ close: c }); }
      });
    })(ghost, layer);
    var caret = document.createElement("i"); caret.className = "h-caret";
    var cur = layer, tn = null, i = 0;
    function place(){ cur.appendChild(caret); }
    function next(){
      if(i >= q.length){
        caret.classList.add("blink");
        setTimeout(function(){ caret.remove(); }, 1100);
        if(done) done(); return;
      }
      var op = q[i++], delay = per;
      if(op.open){ op.dst.appendChild(op.open); cur = op.open; tn = null; delay = 0; }
      else if(op.close){ if(op.close.classList.contains("hl")) setTimeout(function(){ op.close.classList.add("on"); }, 0); cur = op.close.parentNode; tn = null; delay = 0; }
      else if(op.br){ cur.appendChild(document.createElement("br")); tn = null; delay = 240; }
      else {
        var st = jamo(op.c), j = 0;
        if(!tn){ tn = document.createTextNode(""); cur.appendChild(tn); }
        var base = tn.nodeValue, node = tn;
        (function sub(){
          node.nodeValue = base + st[j]; place(); j++;
          if(j < st.length) setTimeout(sub, per);
          else setTimeout(next, op.c === " " ? 70 : op.c === "," ? 180 : per);
        })();
        return;
      }
      place(); setTimeout(next, delay);
    }
    place(); next();
  }

  /* ---------- S0 첫 화면: 한 번 찍기 ----------
     글자가 아니라 판이 움직인다. 핑크 판이 아래에서 위로 찍히고, 먹 판이 같은 방식으로 따라 찍힌 뒤,
     어긋나 있던 핑크 판이 제자리로 맞춰진다. 무대의 압착선과 같은 방향이다. */
  var cast = $("#cast"), wm = $("#wm"), hero = $("#hero"), pp, L = [], pl = [], heroVisible = false, entered = false, introDone = false, plateHold = false;
  var plate = { x: Sp(0), y: Sp(0), tx: 0, ty: 0 };
  var mouse = { x: -9999, y: -9999, t: 0, vx: 0, vy: 0, hist: [] };
  var ppHidden = false;
  function plateOff(){ return window.innerWidth <= 640 ? [-6, 4] : [-12, 8]; }
  function setupHero(){
    pp = wm.cloneNode(true); pp.removeAttribute("id"); pp.classList.add("pp"); pp.setAttribute("aria-hidden", "true");
    cast.insertBefore(pp, wm);
    ["p", "k"].forEach(function(c){ var i = document.createElement("i"); i.className = "h-pl " + c; i.setAttribute("aria-hidden", "true"); cast.appendChild(i); pl.push(i); });
    var a = $$("span[style]", wm), b = $$("span[style]", pp);
    L = a.map(function(el, i){
      return { el: el, pe: b[i], x: Sp(0), y: Sp(0), r: Sp(0), py: Sp(0), ox: Sp(0), oy: Sp(0), bx: 0, by: 0 };
    });
    if(!reduced) cast.classList.add("pre");
    measureLetters();
    if(fine){
      document.addEventListener("mousemove", function(e){
        var now = performance.now();
        mouse.hist.push([now, e.clientX, e.clientY]);
        while(mouse.hist.length && now - mouse.hist[0][0] > 80) mouse.hist.shift();
        var h0 = mouse.hist[0], dtm = (now - h0[0]) / 1000;
        mouse.vx = dtm > 0 ? (e.clientX - h0[1]) / dtm : 0; mouse.vy = dtm > 0 ? (e.clientY - h0[2]) / dtm : 0;
        mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = now;
        if(heroVisible && introDone){
          plate.tx = clamp(-mouse.vx * .012, -22, 22); plate.ty = clamp(-mouse.vy * .012, -22, 22);
          wake();
        }
      }, { passive: true });
      document.documentElement.addEventListener("mouseleave", function(){ mouse.x = -9999; mouse.y = -9999; });
    } else {
      var ly = window.scrollY, lt = performance.now();
      window.addEventListener("scroll", function(){
        var now = performance.now(), dtm = (now - lt) / 1000; if(dtm <= 0) return;
        var vy = (window.scrollY - ly) / dtm; ly = window.scrollY; lt = now;
        if(heroVisible && introDone){ plate.ty = clamp(-vy * .02, -14, 14); wake(); }
      }, { passive: true });
    }
    /* 누른 글자만 다시 찍기: 그 글자의 핑크 사본이 어긋났다가 돌아온다. 먹 글자는 움직이지 않는다 */
    wm.addEventListener("click", function(e){
      var el = e.target.closest("span[style]"); if(!el || !introDone) return;
      var l = L[L.map(function(x){ return x.el; }).indexOf(el)]; if(!l) return;
      l.ox.x = 8; l.oy.x = -6; l.ox.v = l.oy.v = 0; wake();
    });
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){ es.forEach(function(en){ heroVisible = en.isIntersecting; if(heroVisible) wake(); }); }, { threshold: 0 }).observe(hero);
    } else heroVisible = true;
    tasks.push(heroTask);
  }
  /* 글자의 기준 위치(문서 좌표)와 압착선 자리. 변형을 잠시 지우고 잰다 */
  function measureLetters(){
    if(home.hidden) return;
    L.forEach(function(l){ l.el.style.transform = "none"; });
    L.forEach(function(l){ var r = l.el.getBoundingClientRect(); l.bx = r.left + r.width / 2; l.by = r.top + r.height / 2 + window.scrollY; });
    L.forEach(function(l){ applyLetter(l); });
    var pd = Math.round((parseFloat(getComputedStyle(wm).fontSize) || 160) * .14);
    cast.style.setProperty("--pd", pd + "px");
    pl.forEach(function(i){
      i.style.left = (wm.offsetLeft - 12) + "px"; i.style.width = (wm.offsetWidth + 24) + "px"; i.style.top = wm.offsetTop + "px";
      i.style.setProperty("--y0", (wm.offsetHeight + pd) + "px"); i.style.setProperty("--y1", (-pd) + "px");
    });
  }
  function applyLetter(l){
    var rot = ") rotate(" + l.r.x.toFixed(2) + "deg)";
    l.el.style.transform = "translate3d(" + l.x.x.toFixed(2) + "px," + l.y.x.toFixed(2) + "px,0" + rot;
    l.pe.style.transform = "translate3d(" + (l.x.x + l.ox.x).toFixed(2) + "px," + (l.py.x + l.oy.x).toFixed(2) + "px,0" + rot;
  }
  function applyPlate(){ pp.style.transform = "translate3d(" + plate.x.x.toFixed(2) + "px," + plate.y.x.toFixed(2) + "px,0)"; }
  function heroTask(dt, now){
    if(!heroVisible || home.hidden) return false;
    if(pp.style.fontSize !== wm.style.fontSize) pp.style.fontSize = wm.style.fontSize;
    var busy = false, sy = window.scrollY;
    /* 핑크 판 전체의 어긋남: 목표는 매 프레임 0으로 감쇠하고, 판은 snap으로 따라간다. 찍는 동안에는 어긋난 자리에 붙들어 둔다 */
    if(!plateHold){
      var dec = Math.pow(.85, dt * 60);
      plate.tx *= dec; plate.ty *= dec;
      plate.x.to = plate.tx; plate.y.to = plate.ty;
      step(plate.x, K.snap, dt); step(plate.y, K.snap, dt);
      if(!rest(plate.x) || !rest(plate.y)) busy = true; else { settle(plate.x); settle(plate.y); }
    }
    applyPlate();
    var R = 180;
    L.forEach(function(l){
      /* 커서 밀기: 반경 안에서 커서 반대쪽으로 */
      var f = 0, dx = 0, dy = 0;
      if(fine && introDone && mouse.x > -9000){
        var cx = l.bx + l.x.x, cy = l.by - sy + l.y.x;
        dx = cx - mouse.x; dy = cy - mouse.y;
        var d = Math.hypot(dx, dy) || 1;
        if(d < R){ f = Math.pow(1 - d / R, 2); dx /= d; dy /= d; }
      }
      l.x.to = dx * f * 40; l.y.to = dy * f * 40; l.r.to = f * 5 * (dx >= 0 ? 1 : -1);
      step(l.x, K.chew, dt); step(l.y, K.chew, dt); step(l.r, K.chew, dt);
      /* 핑크 판 글자는 먹 글자를 snap으로 따라가며 조금 늦는다 */
      l.py.to = l.y.x; step(l.py, K.snap, dt);
      l.ox.to = 0; l.oy.to = 0; step(l.ox, K.snap, dt); step(l.oy, K.snap, dt);
      if(!rest(l.x) || !rest(l.y) || !rest(l.r) || !rest(l.py) || !rest(l.ox) || !rest(l.oy)) busy = true;
      else { settle(l.x); settle(l.y); settle(l.r); settle(l.py); settle(l.ox); settle(l.oy); }
      applyLetter(l);
    });
    /* 다 맞춰진 뒤에는 핑크 판을 감춘다. 먹 글자 가장자리로 핑크가 비치지 않게 */
    var hide = introDone && !busy;
    if(hide !== ppHidden){ ppHidden = hide; pp.style.visibility = hide ? "hidden" : ""; }
    return busy;
  }
  /* 등장: 재단선 → 타이핑 → 핑크 판 찍기(450) → 먹 판 찍기(650) → 판 맞추기(1450) → 끝(1750) */
  function enterHero(){
    if(entered) return; entered = true;
    var h1 = $(".hero-copy h1", hero);
    if(reduced){ introDone = true; typeEl(h1, 34); return; }
    var off = plateOff(), D = 620;
    plateHold = true; plate.x.x = plate.x.to = off[0]; plate.y.x = plate.y.to = off[1]; plate.x.v = plate.y.v = 0; applyPlate();
    setTimeout(function(){ typeEl(h1, 34); }, 200);
    function pass(el, line, at){
      setTimeout(function(){ el.classList.add("go"); line.classList.add("go"); }, at);
      setTimeout(function(){ line.classList.add("end"); }, at + D);
    }
    pass(pp, pl[0], 450); pass(wm, pl[1], 650);
    setTimeout(function(){
      plateHold = false; plate.tx = plate.ty = 0;
      cast.classList.add("snap"); wake();
    }, 1450);
    setTimeout(function(){
      introDone = true;
      cast.classList.remove("pre"); pp.classList.remove("go"); wm.classList.remove("go");
      pl.forEach(function(i){ i.style.display = "none"; }); pl = [];
    }, 1750);
    wake();
  }

  /* ---------- S1 대표 작업 무대 ---------- */
  var stage = $("#h-stage"), pin, layers = [], press, idxBtns = [], barBtns = [], N = 0, SH = 0, SL = 0, stageTop = 0, frameTop = 0, band = 0;
  var g = Sp(0), lastG = -1, curK = -1, swapK = -1, smearT = 0, stageNear = false, stageSeen = false;
  var barW = [];
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  function layerHtml(p, i){
    var img = p.homeImg || p.popCover || p.cover || p.thumb, t = esc(p.homeTitle || p.title);
    var ln = p.line ? '<div class="h-ln pp" style="--m:url(\'' + p.line + '\')"></div><div class="h-ln" style="--m:url(\'' + p.line + '\')"></div>' : '';
    return '<div class="h-layer" data-k="' + i + '" style="--tone:' + p.tone + '">' +
      '<div class="h-frame crop">' + S.CM + '<div class="h-fin">' + ln + '<div class="h-dots" aria-hidden="true"></div>' +
      '<img class="h-ph" src="' + img + '" alt="' + esc(p.title) + ' 대표 이미지"' + (p.homePos ? ' style="object-position:' + p.homePos + '"' : '') + (i === 0 ? ' fetchpriority="high"' : '') + ' decoding="async"></div></div>' +
      '<h2 class="h-title"><span class="pp" aria-hidden="true">' + t + '</span><span class="ol">' + t + '</span></h2>' +
      '<div class="h-slip crop">' + S.CM +
        '<div class="h-sm"><span>' + esc(p.kindLabel) + (p.year ? ', ' + esc(p.year) : '') + '</span><span class="st ' + (p.statusType || '') + '">' + esc(p.status) + '</span></div>' +
        '<h3 class="h-sh">' + esc(p.title) + '</h3>' +
        '<ol class="h-sr">' + (p.roles || []).slice(0, 3).map(function(r, j){ return '<li><b>' + n2(j) + '</b><span>' + esc(r) + '</span></li>'; }).join("") + '</ol>' +
        '<button class="h-sb" type="button" data-id="' + p.id + '">자세히 보기' + ARROW + '</button>' +
      '</div></div>';
  }
  function buildStage(){
    var items = (HM.feature || []).map(function(id){ return S.byId[id]; }).filter(Boolean);
    N = items.length; if(!N){ stage.remove(); return; }
    stage.style.setProperty("--n", N);
    stage.innerHTML = '<div class="h-pin">' + items.map(layerHtml).join("") +
      '<i class="h-press" aria-hidden="true"></i>' +
      '<nav class="h-index" aria-label="대표 작업"><div class="hd" id="h-ihd">Selected Work</div>' +
        items.map(function(p, i){ return '<button type="button" data-k="' + i + '">' + esc(p.homeTitle || p.title) + '</button>'; }).join("") + '</nav>' +
      '<div class="h-bar" aria-hidden="true">' + items.map(function(p, i){ return '<button type="button" data-k="' + i + '" style="--c:' + p.tone + '" tabindex="-1"></button>'; }).join("") + '</div></div>';
    pin = $(".h-pin", stage); press = $(".h-press", stage);
    layers = $$(".h-layer", stage).map(function(el){
      return { el: el, frame: $(".h-frame", el), title: $(".h-title", el), ph: $(".h-ph", el), dots: $(".h-dots", el), ln: $(".h-ln:not(.pp)", el), lp: $(".h-ln.pp", el), tp: $(".h-title .pp", el), slip: $(".h-slip", el), btn: $(".h-sb", el),
        sx: Sp(0), sx2: Sp(0), tx: Sp(0), ty: Sp(0), swap: 0, clip: "", pclip: "", dclip: "" };
    });
    idxBtns = $$(".h-index button", stage); barBtns = $$(".h-bar button", stage);
    barW = barBtns.map(function(){ return Sp(22); });
    S.tie(stage);
    if(reduced) stage.classList.add("rm");
    stage.addEventListener("click", function(e){
      var b = e.target.closest(".h-sb"); if(b){ S.go("w-" + b.dataset.id); return; }
      var k = e.target.closest("[data-k]"); if(k && k.nodeName === "BUTTON") toK(+k.dataset.k);
    });
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){ es.forEach(function(en){ stageNear = en.isIntersecting; if(stageNear){ wake(); if(!stageSeen){ stageSeen = true; typeEl($("#h-ihd"), 45); } } }); }, { rootMargin: "20% 0px 20% 0px" }).observe(stage);
    } else stageNear = true;
    measureStage();
    tasks.push(stageTask);
  }
  function measureStage(){
    if(!pin || home.hidden) return;
    SH = pin.clientHeight; SL = SH * 1.1;
    stageTop = stage.getBoundingClientRect().top + window.scrollY;
    band = SH * (window.innerWidth <= 640 ? .12 : .16);
    placeStage();
    layers.forEach(function(l){ l.clip = l.pclip = l.dclip = ""; });
    lastG = -1;
  }
  /* 틀은 원고 비율(16:9)로 고정한다. 작업명은 틀 바로 아래에 한 줄로 놓고,
     교정 쪽지는 틀 오른쪽 아래에서 틀 밖으로 걸쳐 내려 작업명 아랫선에 맞춘다.
     화면이 세로로 길어 아래가 많이 남으면 묶음 전체를 가운데로 내린다.
     좁고 세로로 긴 화면(태블릿 세로)에서는 쪽지가 틀을 가리지 않도록 틀 아래, 작업명 오른쪽에 놓는다 */
  function placeStage(){
    var mob = window.innerWidth <= 640, PW = pin.clientWidth, top0 = mob ? 76 : 104, low = mob ? 16 : 96, need = 0, stacked = mob;
    pin.style.setProperty("--ft", top0 + "px");
    layers.forEach(function(l){
      var t = l.title, sl = l.slip, f = l.frame;
      t.style.fontSize = ""; t.style.top = ""; t.style.bottom = "auto"; sl.style.bottom = ""; sl.style.right = ""; sl.style.top = "";
      var fh = f.offsetHeight, fr = f.offsetLeft + f.offsetWidth;
      if(mob){ l.dy = { t: fh + 16 }; l.dy.s = l.dy.t + t.offsetHeight + 24; need = Math.max(need, l.dy.s + sl.offsetHeight); return; }
      var under = window.innerWidth <= 1100 && SH - low - top0 - (fh + 24 + sl.offsetHeight) >= 0;
      sl.style.right = (PW - fr + (under ? 0 : 24)) + "px";
      var room = fr - (under ? 0 : 24) - sl.offsetWidth - 24 - t.offsetLeft, tw = t.offsetWidth;
      if(tw > room && room > 0) t.style.fontSize = (parseFloat(getComputedStyle(t).fontSize) * room / tw).toFixed(1) + "px";
      l.dy = { t: fh + 24 }; l.dy.b = l.dy.t + t.offsetHeight;
      l.dy.hang = Math.min(24 + t.offsetHeight, sl.offsetHeight * .55);
      if(under){ stacked = true; l.dy.s = l.dy.t; need = Math.max(need, l.dy.s + sl.offsetHeight); }
      need = Math.max(need, l.dy.b);
    });
    var spare = SH - low - top0 - need, ft = top0 + (spare > (stacked ? 0 : 120) ? Math.round(spare / 2) : 0);
    pin.style.setProperty("--ft", ft + "px");
    pin.classList.toggle("nobar", mob && SH - (ft + need) < 64);
    layers.forEach(function(l){
      l.title.style.top = (ft + l.dy.t) + "px";
      if(mob || l.dy.s){ l.slip.style.top = (ft + l.dy.s) + "px"; l.slip.style.bottom = "auto"; }
      else l.slip.style.bottom = (SH - (ft + l.frame.offsetHeight + l.dy.hang)) + "px";
    });
    frameTop = ft;
  }
  function toK(k){
    window.scrollTo({ top: stageTop + k * SL + SL * .1, behavior: reduced ? "auto" : "smooth" });
  }
  function smooth(t){ t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function targetG(){
    var s = window.scrollY - stageTop, raw = s / SL;
    if(raw <= 0) return 0;
    var idx = Math.min(N - 1, Math.floor(raw)), frac = raw - idx;
    if(idx >= N - 1) return N - 1;
    var p = frac < .42 ? 0 : smooth((frac - .42) / .58);
    return idx + p;
  }
  function setClip(l, key, el, v){ if(l[key] !== v){ l[key] = v; el.style.clipPath = v; } }
  var navEl = document.getElementById("nav"), navDark = false;
  var navBand = false;
  function setNavDark(v, band){
    band = !!(v && band);
    if(v !== navDark){ navDark = v; if(navEl) navEl.classList.toggle("h-dark", v); }
    if(band !== navBand){ navBand = band; if(navEl) navEl.classList.toggle("h-band", band); }
  }
  function stageTask(dt, now){
    if(!pin || home.hidden) return false;
    var busy = false;
    /* 무대가 상단 메뉴 아래에 깔리는 동안에는 메뉴를 어두운 바탕용으로 바꾼다 */
    var sr = stage.getBoundingClientRect();
    /* 무대가 고정에서 풀려 틀이 메뉴 밑으로 올라오기 시작하면 메뉴 뒤에 어두운 띠를 깐다 */
    setNavDark(sr.top <= 36 && sr.bottom >= 130, sr.bottom < SH - Math.max(0, frameTop - 64));
    g.to = targetG();
    if(!stageNear){ settle(g); } else { step(g, K.slow, dt); if(!rest(g)) busy = true; else settle(g); }
    var gd = clamp(g.x, 0, N - 1), id = Math.min(N - 1, Math.floor(gd)), pd = gd - id;
    if(id >= N - 1){ id = N - 1; pd = 0; }
    var moving = Math.abs(gd - lastG) > .002; lastG = gd;
    var y = SH * (1 - pd), k;
    if(reduced){
      var vis = pd > .5 ? id + 1 : id;
      layers.forEach(function(l, i){ l.el.classList.toggle("vis", i === vis); });
    } else {
      for(k = 0; k < N; k++){
        var l = layers[k];
        if(k <= id){ setClip(l, "clip", l.el, "inset(0 0 0 0)"); setClip(l, "pclip", l.ph, "inset(0 0 0 0)"); setClip(l, "dclip", l.dots, "inset(100% 0 0 0)"); }
        else if(k === id + 1 && pd > 0){
          setClip(l, "clip", l.el, "inset(" + y.toFixed(1) + "px 0 0 0)");
          setClip(l, "pclip", l.ph, "inset(" + Math.max(0, y + band - frameTop).toFixed(1) + "px 0 0 0)");
          setClip(l, "dclip", l.dots, "inset(" + Math.max(0, y - frameTop).toFixed(1) + "px 0 0 0)");
        } else { setClip(l, "clip", l.el, "inset(100% 0 0 0)"); setClip(l, "dclip", l.dots, "inset(100% 0 0 0)"); }
      }
      var on = pd > .002 && pd < .998;
      press.style.opacity = on ? 1 : 0;
      if(on) press.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
      /* 번짐: 띠가 움직이는 동안 선 그림과 핑크 판이 따로 흔들린다 */
      if(id + 1 < N){
        var nx = layers[id + 1];
        if(on && moving){ if(now - smearT > 80){ smearT = now; nx.sx.to = (Math.random() * 16 - 8); nx.sx2.to = (Math.random() * 16 - 8); } }
        else { nx.sx.to = 0; nx.sx2.to = 0; }
        step(nx.sx, K.chew, dt); step(nx.sx2, K.chew, dt);
        if(!rest(nx.sx) || !rest(nx.sx2)) busy = true; else { settle(nx.sx); settle(nx.sx2); }
        if(nx.ln) nx.ln.style.transform = "translate3d(" + nx.sx.x.toFixed(2) + "px,0,0)";
        if(nx.lp) nx.lp.style.transform = "translate3d(" + (7 + nx.sx2.x).toFixed(2) + "px,4px,0)";
        /* 작업명 교체: 핑크 사본이 어긋난 채 들어와 맞춰지고 사라진다 */
        if(pd > .55 && nx.swap === 0){ nx.swap = 1; nx.tx.x = -22; nx.ty.x = 14; nx.tx.v = nx.ty.v = 0; nx.tp.classList.remove("fade"); nx.tp.style.opacity = 1; }
        if(pd <= .55 && nx.swap){ nx.swap = 0; nx.tp.classList.remove("fade"); nx.tp.style.opacity = 0; }
      }
      layers.forEach(function(l){
        if(l.swap === 1){
          l.tx.to = 0; l.ty.to = 0; step(l.tx, K.snap, dt); step(l.ty, K.snap, dt);
          l.tp.style.transform = "translate3d(" + l.tx.x.toFixed(2) + "px," + l.ty.x.toFixed(2) + "px,0)";
          if(rest(l.tx) && rest(l.ty)){ l.swap = 2; l.tp.classList.add("fade"); l.tp.style.opacity = 0; } else busy = true;
        }
      });
      /* 쪽지: 압착선이 지나간 뒤 올라온다 */
      layers.forEach(function(l, i){
        var show = i <= id || (i === id + 1 && y < l.slip.offsetTop);
        l.slip.classList.toggle("in", show);
      });
    }
    /* 목차와 컬러 바 */
    var ck = pd > .5 ? id + 1 : id;
    if(ck !== curK){ curK = ck; idxBtns.forEach(function(b, i){ b.classList.toggle("on", i === ck); }); barBtns.forEach(function(b, i){ b.classList.toggle("on", i === ck); barW[i].to = i === ck ? 64 : 22; }); layers.forEach(function(l, i){ if(l.btn) l.btn.tabIndex = i === ck ? 0 : -1; }); }
    barW.forEach(function(s, i){ if(rest(s)){ settle(s); return; } step(s, K.chew, dt); barBtns[i].style.width = s.x.toFixed(1) + "px"; busy = true; });
    return busy;
  }

  /* ---------- S2 프로필: 커팅 매트 위 교정지 더미 ----------
     펼침 → 고르기 → 보기를 차례로 나눈다. 고르기는 카드별 hover가 아니라 커서의 가로 위치로 정하고,
     실제 이미지는 고른 카드 한 장에서만, 잠시 머문 뒤에 나타난다. */
  var mat = $("#h-mat"), sheets = [], order = [], matHover = false, matVisible = false, shuffleT = 0, sheetW = 0, sheetH = 0;
  var pick = -1, pickAt = 0, mx = null, viewT = 0, openT = 0, foldT = 0;
  var ROT = [-8, -4.8, -1.6, 1.6, 4.8, 8], GAP = .2;
  function fanX(k){ return (k - (order.length - 1) / 2) * (fine ? GAP : .12) * sheetW; }
  /* 회전축이 카드 아래(130%)에 있어서, 기울어진 카드의 중심은 그만큼 옆으로 옮겨져 있다 */
  function centerX(k){ return fanX(k) + .8 * sheetH * Math.sin(ROT[k] * Math.PI / 180); }
  function buildMat(){
    var used = HM.feature || [];
    var rest6 = P.filter(function(p){ return used.indexOf(p.id) < 0 && p.line; }).slice(0, 6);
    mat.innerHTML = rest6.map(function(p){
      return '<button class="card h-sheet" type="button" data-id="' + p.id + '" style="--tone:' + p.tone + '" aria-label="' + esc(p.title) + ' 자세히 보기"><span class="im crop">' + S.slot(p) + S.CM + '</span></button>';
    }).join("");
    sheets = $$(".h-sheet", mat).map(function(el){ return { el: el, x: Sp(0), y: Sp(0), r: Sp(0), k: K.chew, outT: 0 }; });
    order = sheets.map(function(s, i){ return i; });
    if(fine && !reduced){
      mat.addEventListener("pointerenter", function(e){
        if(e.pointerType === "touch") return;
        clearTimeout(foldT); mx = e.clientX;
        if(matHover) return;
        matHover = true; pick = -1; pickAt = performance.now() + 360; retarget(); wake();
        clearTimeout(openT); openT = setTimeout(function(){ if(matHover && mx !== null) choose(); }, 370);
      });
      mat.addEventListener("pointermove", function(e){
        if(e.pointerType === "touch" || !matHover) return;
        mx = e.clientX;
        if(performance.now() >= pickAt) choose();
      }, { passive: true });
      mat.addEventListener("pointerleave", function(e){
        if(e.pointerType === "touch") return;
        mx = null; clearTimeout(openT); setPick(-1);
        clearTimeout(foldT); foldT = setTimeout(function(){ matHover = false; shuffleT = performance.now() - 1500; retarget(); wake(); }, 120);
      });
    } else matHover = true;
    /* 키보드로 카드에 들어오면 그 카드를 고른 상태로 보여 준다 */
    var kb = false;
    mat.addEventListener("focusin", function(e){
      var el = e.target.closest ? e.target.closest(".h-sheet") : null, si = -1;
      if(!el || !el.matches(":focus-visible")) return;
      sheets.forEach(function(s, i){ if(s.el === el) si = i; });
      if(si < 0) return;
      clearTimeout(foldT); clearTimeout(openT); kb = true;
      if(!matHover){ matHover = true; pick = -1; }
      setPick(order.indexOf(si));
    });
    mat.addEventListener("focusout", function(e){
      if(!kb || mat.contains(e.relatedTarget)) return;
      kb = false; setPick(-1);
      if(fine && !reduced && mx === null){ matHover = false; shuffleT = performance.now() - 1500; retarget(); wake(); }
    });
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){ es.forEach(function(en){ matVisible = en.isIntersecting; if(matVisible){ shuffleT = performance.now(); wake(); } }); }, { threshold: .3 }).observe(mat);
    }
    measureMat(true);
    tasks.push(matTask);
  }
  /* 커서에서 가로로 가장 가까운 카드를 고른다. 이웃 카드로 넘어갈 때는 경계를 16px 넘어야 바뀐다 */
  function choose(){
    var r = mat.getBoundingClientRect(), x = mx - (r.left + r.width / 2), n = order.length, best = 0, bd = 1e9, k;
    for(k = 0; k < n; k++){ var d = Math.abs(x - centerX(k)); if(d < bd){ bd = d; best = k; } }
    if(pick >= 0 && Math.abs(best - pick) === 1){
      var mid = (centerX(pick) + centerX(best)) / 2;
      if(best > pick ? x < mid + 16 : x > mid - 16) return;
    }
    setPick(best);
  }
  function unview(s){
    if(!s.el.classList.contains("on")) return;
    s.el.classList.add("out");
    clearTimeout(s.outT);
    s.outT = setTimeout(function(){
      s.el.classList.add("rst"); s.el.classList.remove("on", "out");
      void s.el.offsetWidth; s.el.classList.remove("rst");
    }, 180);
  }
  function setPick(k){
    if(k === pick) return;
    clearTimeout(viewT);
    if(pick >= 0) unview(sheets[order[pick]]);
    pick = k; retarget(); wake();
    if(k < 0) return;
    viewT = setTimeout(function(){
      if(pick !== k || !matHover) return;
      var s = sheets[order[k]];
      clearTimeout(s.outT); s.el.classList.remove("out", "rst"); s.el.classList.add("on");
    }, 240);
  }
  function measureMat(init){
    if(home.hidden || !sheets.length) return;
    sheetW = sheets[0].el.offsetWidth; sheetH = sheets[0].el.offsetHeight;
    retarget();
    if(init || reduced) sheets.forEach(function(s){ settle(s.x); settle(s.y); settle(s.r); applySheet(s); });
  }
  function retarget(){
    var n = order.length;
    order.forEach(function(si, k){
      var s = sheets[si], on = matHover && k === pick;
      s.k = K.chew;
      if(matHover){
        s.r.to = ROT[k]; s.x.to = fanX(k); s.y.to = 0;
        if(on){ s.r.to = 0; s.y.to = -22; s.x.to = centerX(k); s.k = K.slow; }
        else if(pick >= 0 && Math.abs(k - pick) === 1) s.x.to += k < pick ? -12 : 12;
      } else { s.r.to = 0; s.x.to = 18 * k - 9 * (n - 1); s.y.to = -18 * k + 9 * (n - 1); }
      s.el.style.zIndex = on ? 20 : 10 - k;
      s.el.classList.toggle("pick", on);
    });
  }
  function applySheet(s){ s.el.style.transform = "translate3d(" + s.x.x.toFixed(2) + "px," + s.y.x.toFixed(2) + "px,0) rotate(" + s.r.x.toFixed(2) + "deg)"; }
  function matTask(dt, now){
    if(!sheets.length || home.hidden || !matVisible) return false;
    var busy = false;
    if(!matHover && !reduced && fine && now - shuffleT > 3000){
      shuffleT = now;
      var front = sheets[order[0]];
      front.x.to = sheetW * 1.15; wake();
      setTimeout(function(){ if(matHover) return; order.push(order.shift()); retarget(); wake(); }, 450);
    }
    sheets.forEach(function(s){
      step(s.x, s.k, dt); step(s.y, s.k, dt); step(s.r, s.k, dt);
      if(!rest(s.x) || !rest(s.y) || !rest(s.r)) busy = true; else { settle(s.x); settle(s.y); settle(s.r); }
      applySheet(s);
    });
    return busy || (!matHover && fine && !reduced);
  }

  /* ---------- S3 공통 하단 컬러 바 ---------- */
  var fbar = $("#h-fbar"), fcells = [], fh = [], fname;
  function buildFoot(){
    if(!fbar) return;
    fbar.innerHTML = P.map(function(p){ return '<button type="button" data-id="' + p.id + '" style="--c:' + p.tone + '" aria-label="' + esc(p.title) + '"></button>'; }).join("") + '<span class="h-fname" id="h-fname" aria-hidden="true"></span>';
    fcells = $$("button", fbar); fname = $("#h-fname");
    var base = function(){ return window.innerWidth <= 640 ? 40 : 56; };
    fh = fcells.map(function(){ return Sp(base()); });
    fbar.addEventListener("click", function(e){ var b = e.target.closest("button"); if(b) S.go("w-" + b.dataset.id); });
    if(fine){
      fcells.forEach(function(c, i){
        c.addEventListener("mouseenter", function(){
          fh.forEach(function(s, j){ s.to = base() + (j === i ? 14 : 0); });
          fname.textContent = S.byId[c.dataset.id].title; fname.style.left = (c.offsetLeft + c.offsetWidth / 2) + "px"; fname.classList.add("on"); wake();
        });
      });
      fbar.addEventListener("mouseleave", function(){ fh.forEach(function(s){ s.to = base(); }); fname.classList.remove("on"); wake(); });
    }
    tasks.push(function(dt){
      var busy = false;
      fh.forEach(function(s, i){ if(rest(s)){ settle(s); return; } step(s, K.chew, dt); fcells[i].style.height = s.x.toFixed(1) + "px"; busy = true; });
      return busy;
    });
  }

  /* ---------- 화면 전환과 시작 ---------- */
  var profileSeen = false;
  function onHome(){
    if(home.hidden) return;
    measureLetters(); measureStage(); measureMat(false);
    enterHero();
    if(!profileSeen && "IntersectionObserver" in window){
      profileSeen = true;
      new IntersectionObserver(function(es, io){ es.forEach(function(en){ if(en.isIntersecting){ typeEl($("#h-ptitle"), 45); io.disconnect(); } }); }, { threshold: .4 }).observe($("#h-ptitle"));
    }
    wake();
  }
  setupHero(); buildStage(); buildMat(); buildFoot();
  document.addEventListener("viewchange", function(e){ if(e.detail === "home") setTimeout(onHome, 30); else { heroVisible = false; setNavDark(false); } });
  var rT;
  window.addEventListener("resize", function(){ clearTimeout(rT); rT = setTimeout(function(){ measureLetters(); measureStage(); measureMat(false); wake(); }, 120); });
  window.addEventListener("scroll", function(){ if(!home.hidden) wake(); }, { passive: true });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ measureLetters(); measureStage(); });
  if(S.view() === "home") setTimeout(onHome, 30);
  /* 캐릭터 모듈: HOME.figure가 있을 때만 물리 엔진과 fig.js를 불러온다(v2) */
  window.HOME_API = {
    letterBoxes: function(){ return L.map(function(l){ var r = l.el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, id: l.el.textContent }; }); },
    onHeroVisible: function(fn){ tasks.push(function(){ fn(heroVisible && !home.hidden); return false; }); },
    footerBar: fbar, wake: wake, tasks: tasks
  };
  if(HM.figure){
    var m = document.createElement("script"); m.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
    m.onload = function(){ var f = document.createElement("script"); f.src = "fig.js"; document.body.appendChild(f); };
    document.body.appendChild(m);
  }
})();
