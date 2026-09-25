/* ==========================================================
   Celular MIA: conversa animada, flip 360° e órbita.
   Monta sozinho em todo elemento [data-mia-phone].
   Opcional: data-orbit-x="110" (desloca a órbita em px).
   Emite no host: "mia:step" {id, count, who} e "mia:reset".
   ========================================================== */
(function () {
  'use strict';
  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^\/]*$/, '') : 'assets/';
  })();

  /* Conversa transcrita do vídeo "CONVERSA MIA" (tempos em segundos, como no vídeo) */
  var CHAT = [
    {t: 2.5, who: 'out', h: '23:50', id: 'inicio', text: 'Oi, boa noite! Vi o perfil de vocês e queria uma ajuda. Visitei um apartamento essa semana e saí bem decepcionada 😞'},
    {t: 4.2, who: 'out', h: '23:50', text: 'O corretor só falava da vista... mas o apartamento era barulhento. Avenida movimentada o dia inteiro.'},
    {t: 5.8, typing: true},
    {t: 7.7, who: 'in', h: '23:51', text: 'Oi, Carla! Que bom que você veio conversar com a gente 💙 Sinto muito pela experiência. Me conta: o que mais importa pra você no seu novo lar?'},
    {t: 9.4, who: 'out', h: '23:51', text: 'Meu filho é autista. Ele precisa de um lugar silencioso pra se sentir bem, entende?'},
    {t: 11.3, who: 'out', h: '23:52', text: 'A vista é linda e importa... mas não é só ela. Eu preciso de um lar tranquilo, onde minha família viva em harmonia 🙏'},
    {t: 13.0, typing: true},
    {t: 14.7, who: 'in', h: '23:52', id: 'qualificado', text: 'Entendo muito bem, Carla. A vista encanta, mas casa de verdade é refúgio: silêncio, conforto e paz vêm primeiro 💙'},
    {t: 16.2, typing: true},
    {t: 17.7, who: 'in', h: '23:53', text: 'Pode deixar que eu vou procurar imóveis pensando nisso: tranquilidade pro seu filho e pra família de vocês. Um instante ✨'},
    {t: 18.4, flip: true},                 /* flip 360° só aqui, enquanto a MIA "procura" */
    {t: 19.4, typing: true},
    {t: 20.8, who: 'in', h: '23:54', id: 'imovel', text: 'Achei! 🌿 Olha o empreendimento que combina com tudo que você me contou: natureza, silêncio e uma vista linda.'},
    {t: 22.6, who: 'in', h: '23:54', img: 'foto-1-verde.jpg', text: 'Cercado de verde e silêncio 🌳'},
    {t: 25.0, who: 'in', h: '23:54', img: 'foto-2-varanda.jpg', text: 'Varanda com vista pro bosque ✨'},
    {t: 27.0, who: 'in', h: '23:54', img: 'foto-3-lazer.jpg', text: 'Lazer pra toda a família 🏊'},
    {t: 28.9, typing: true},
    {t: 30.2, who: 'in', h: '23:55', text: 'As unidades têm varanda voltada pro jardim e pro bosque — ruas calmas, zero barulho. O que você acha? 💙'},
    {t: 31.9, who: 'out', h: '23:56', text: 'Nossa, é exatamente o que a gente precisa! Amei 😍'},
    {t: 33.7, typing: true},
    {t: 35.1, who: 'in', h: '23:57', id: 'visita', text: 'Que ótimo, Carla! 💙 Já deixei tudo certo: agendei a sua visita para amanhã às 17:30.'},
    {t: 36.5, typing: true},
    {t: 37.7, who: 'in', h: '23:57', id: 'consultor', text: 'O Rafael, nosso consultor, vai te receber e te acompanhar em cada detalhe. Pode ir tranquila!'},
    {t: 41.2, who: 'out', h: '23:58', id: 'fim', text: 'Perfeito! Vamos sim 🙏 Até amanhã!'}
  ];
  var FADE_AT = 46.4, LOOP = 47;

  var A = 'M358.52,202.56c-16.18,6.4-30.94,12.13-37.15,14.2-7.34,2.35-14.48,4.7-21.44,7.05,2.35,15.33,3.67,27.27,4.33,33.86,7.71,70.82-21.35,149.54-92.07,162.52-4.14.66-8.28.94-12.32.94-16.93,0-32.35-5.55-45.61-16.27-20.69-16.65-34.05-44.86-35.93-75.33-5.27-77.12,52.29-117.19,115.21-143.43-13.83-61.7-35.36-109.66-58.69-127.44-10.91-1.5-32.16,26.99-41.19,39.5l-1.32,1.88c-44.3,64.05-68.37,142.48-72.89,238.7-.94,19.19-16.83,34.23-36.02,34.23H0C0,248.74,27.65,148.48,84.46,66.47l1.69-2.35c19.37-26.71,59.63-82.29,114.27-58.22l4.33,2.35c44.67,29.44,70.07,98.94,84.17,157.91,1.6-.56,8.84-3.39,18.06-7.05,24.73-9.88,51.73,8.37,51.73,35.08v8.65l-.19-.28ZM243.78,245.36c-43.36,19.75-69.5,43.07-66.96,80.41.85,13.83,6.68,27.56,14.3,33.76,3.48,2.82,6.87,3.76,11.38,3.1,38.47-7.05,47.12-64.33,43.36-98.85-.66-6.21-1.32-12.32-2.07-18.43h0Z';
  var SVG_A = '<svg viewBox="0 0 358.7 421.13" aria-hidden="true"><path d="' + A + '"/></svg>';
  var TICK = '<svg viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5.4l2.7 2.7L9.4 2.3M6.6 8.1l5.8-5.8"/></svg>';

  function screenHTML() {
    return '' +
      '<div class="wa">' +
        '<i class="wa__island"></i>' +
        '<div class="wa__sb"><span>23:50</span><span>' +
          '<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>' +
          '<svg viewBox="0 0 16 12"><path d="M8 11.5l2.4-2.9a3.6 3.6 0 0 0-4.8 0zM3.3 6.2l1.4 1.6a5 5 0 0 1 6.6 0l1.4-1.6a7.2 7.2 0 0 0-9.4 0zM.4 3l1.4 1.6a9.4 9.4 0 0 1 12.4 0L15.6 3A11.6 11.6 0 0 0 .4 3z"/></svg>' +
          '<svg viewBox="0 0 26 12"><rect x=".6" y=".6" width="22" height="10.8" rx="3.2" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/><rect x="2.4" y="2.4" width="18.4" height="7.2" rx="1.8"/><rect x="23.8" y="4" width="1.8" height="4" rx=".9" fill-opacity=".5"/></svg>' +
        '</span></div>' +
        '<div class="wa__hd">' +
          '<svg class="bk" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>' +
          '<span class="wa__av">' + SVG_A + '</span>' +
          '<div class="wa__who"><div class="wa__nm">Mia · Morada.ai <svg viewBox="0 0 24 24"><path fill="#3B8EF0" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3.1-1-3.1L5.2 7.3l1-3 3.2.1z"/><path d="M7.8 12.3l2.8 2.8 5.6-5.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          '<div class="wa__st">online</div></div>' +
          '<svg class="ic" viewBox="0 0 24 24"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>' +
          '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>' +
        '</div>' +
        '<div class="wa__view"><div class="wa__list">' +
          '<div class="wa__notice"><svg viewBox="0 0 10 12"><path d="M2 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 10 6.5v4A1.5 1.5 0 0 1 8.5 12h-7A1.5 1.5 0 0 1 0 10.5v-4A1.5 1.5 0 0 1 1.5 5zm1.4 0h3.2V3.5a1.6 1.6 0 0 0-3.2 0z"/></svg>As mensagens e ligações são protegidas com a criptografia de ponta a ponta. Somente as pessoas que fazem parte da conversa podem ler, ouvir e compartilhar esse conteúdo.<b>Saiba mais</b></div>' +
          '<div class="wa__day">Hoje</div>' +
        '</div></div>' +
        '<div class="wa__in">' +
          '<div class="wa__field"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/></svg><span>Mensagem</span>' +
          '<svg viewBox="0 0 24 24"><path d="M16.5 7.5l-7.8 7.8a2 2 0 0 0 2.8 2.8l8-8a4 4 0 0 0-5.6-5.7l-8.2 8.2a6 6 0 0 0 8.5 8.5l6.3-6.3"/></svg>' +
          '<svg viewBox="0 0 24 24"><path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.5-2h6l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/><circle cx="12" cy="13" r="3.5"/></svg></div>' +
          '<span class="wa__mic"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg></span>' +
        '</div>' +
      '</div>';
  }

  function orbitSVG(front, id) {
    var e = 'cx="320" cy="320" rx="300" ry="92" pathLength="1000" fill="none" stroke-linecap="round"';
    var move = 'M620 320A300 92 0 1 1 20 320A300 92 0 1 1 620 320';
    var dur = '8s';
    function comet(stroke, w, op, len, off) {
      return '<ellipse ' + e + ' stroke="' + stroke + '" stroke-width="' + w + '" opacity="' + op + '" stroke-dasharray="' + len + ' ' + (500 - len) + '">' +
        '<animate attributeName="stroke-dashoffset" values="' + off + ';' + (off - 1000) + '" dur="' + dur + '" repeatCount="indefinite"/></ellipse>';
    }
    function head(p0) {
      var k = (1 - p0).toFixed(3);
      return '<circle r="7" fill="url(#miaHead' + id + ')"><animateMotion path="' + move + '" dur="' + dur + '" repeatCount="indefinite" calcMode="linear" keyPoints="' + p0 + ';1;0;' + p0 + '" keyTimes="0;' + k + ';' + k + ';1"/></circle>';
    }
    var body =
      '<ellipse ' + e + ' stroke="url(#miaOrb' + id + ')" stroke-width="1.5" opacity=".6"/>' +
      comet('#1E7BFF', 7, .22, 180, 0) + comet('#02CFFF', 2.6, .75, 110, -70) + comet('#EAF8FF', 1.6, 1, 40, -140) +
      head(0.18) + head(0.68);
    var defs = front ? '' :
      '<defs><linearGradient id="miaOrb' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0057B2" stop-opacity=".25"/><stop offset=".5" stop-color="#0073FF"/><stop offset="1" stop-color="#02CFFF"/></linearGradient>' +
      '<radialGradient id="miaHead' + id + '"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#BFEAFF"/><stop offset="1" stop-color="#02CFFF" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="miaClip' + id + '" clipPathUnits="userSpaceOnUse"><rect x="-60" y="320" width="760" height="160"/></clipPath></defs>';
    return '<svg class="mia__orbit mia__orbit--' + (front ? 'front' : 'back') + '" viewBox="0 0 640 640" aria-hidden="true">' + defs +
      '<g transform="rotate(-18 320 320)">' + (front ? '<g clip-path="url(#miaClip' + id + ')">' + body + '</g>' : body) + '</g></svg>';
  }

  /* Lateral do aparelho: o contorno arredondado (288×596, raio 48) extrudado em painéis.
     Cada painel nasce deitado (rotateX 90°), gira para acompanhar o contorno e vai para o ponto médio.
     A luz vem do alto à esquerda: o tom de cada painel depende da direção em que ele aponta. */
  function sideHTML() {
    var W = 288, H = 596, R = 48, N = 6, out = '', rad = Math.PI / 180;
    function tone(k) {                     /* k 0..1 → titânio azulado escuro → claro */
      var a = [14, 19, 33], b = [92, 108, 146];
      return 'rgb(' + a.map(function (v, i) { return Math.round(v + (b[i] - v) * Math.max(0, Math.min(1, k))); }).join(',') + ')';
    }
    function panel(x, y, th, L, inner) {
      var n = th - 90, lit = .5 + .5 * Math.cos((n + 135) * rad);
      var bg = 'linear-gradient(180deg,' + tone(lit * .9 + .15) + ' 0%,' + tone(lit * .75) + ' 16%,' + tone(lit * .45) + ' 50%,' + tone(lit * .75) + ' 84%,' + tone(lit * .9 + .15) + ' 100%)';
      return '<i class="mia__side" style="width:' + L.toFixed(2) + 'px;margin-left:' + (-L / 2).toFixed(2) + 'px;background:' + bg +
        ';transform:translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotateZ(' + th.toFixed(2) + 'deg) rotateX(90deg)">' + (inner || '') + '</i>';
    }
    function btn(from, len) { return '<b class="mia__btn" style="left:' + from + 'px;width:' + len + 'px"></b>'; }
    out += panel(0, -H / 2, 0, W - 2 * R);
    out += panel(W / 2, 0, 90, H - 2 * R, btn(140, 78));                                  /* lado direito: botão lateral */
    out += panel(0, H / 2, 180, W - 2 * R);
    out += panel(-W / 2, 0, 270, H - 2 * R, btn(410, 30) + btn(322, 52) + btn(256, 52));  /* esquerdo: ação + volume */
    var d = 90 / N, cd = R * Math.cos(d / 2 * rad), L = 2 * R * Math.sin(d / 2 * rad) + .8;
    [[W / 2 - R, -H / 2 + R, -90], [W / 2 - R, H / 2 - R, 0], [-W / 2 + R, H / 2 - R, 90], [-W / 2 + R, -H / 2 + R, 180]].forEach(function (c) {
      for (var i = 0; i < N; i++) {
        var f = c[2] + (i + .5) * d;
        out += panel(c[0] + cd * Math.cos(f * rad), c[1] + cd * Math.sin(f * rad), f + 90, L);
      }
    });
    return out;
  }

  var uid = 0;
  function MiaPhone(host) {
    var id = ++uid, self = this;
    host.classList.add('mia');
    host.setAttribute('aria-hidden', 'true');
    if (host.getAttribute('data-orbit-x')) host.style.setProperty('--orbit-x', host.getAttribute('data-orbit-x') + 'px');
    host.innerHTML = '<i class="mia__glow"></i>' + orbitSVG(false, id) +
      '<div class="mia__tilt"><div class="mia__lift"><div class="mia__body">' +
        sideHTML() +
        '<div class="mia__face mia__front">' + screenHTML() + '</div>' +
        '<div class="mia__face mia__back"><div class="mia__cam"><i></i><i></i><i></i><b></b></div>' + SVG_A.replace('<svg', '<svg class="mia__logo"') + '</div>' +
      '</div></div></div>' +
      orbitSVG(true, id);

    var view = host.querySelector('.wa__view'), list = host.querySelector('.wa__list'), st = host.querySelector('.wa__st');
    var body = host.querySelector('.mia__body'), svgs = host.querySelectorAll('svg.mia__orbit');
    var baseCount = list.children.length, lastWho = null, typingRow = null, count = 0;
    var t = 0, idx = 0, fading = false, seeking = false;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function emit(name, detail) { host.dispatchEvent(new CustomEvent(name, {detail: detail, bubbles: true})); }
    function scroll() {
      var over = list.offsetHeight - view.clientHeight;
      list.style.transform = 'translateY(' + (-Math.max(0, over)) + 'px)';
    }
    function row(who) {
      var r = document.createElement('div');
      r.className = 'wa__m wa__m--' + who + (who !== lastWho ? ' is-first' : '');
      lastWho = who;
      return r;
    }
    var prevWho = null;
    function typing(on) {
      if (on && !typingRow) {
        prevWho = lastWho;
        typingRow = row('in');
        typingRow.innerHTML = '<div class="wa__b"><span class="wa__typing"><i></i><i></i><i></i></span></div>';
        list.appendChild(typingRow); scroll();
      }
      if (!on && typingRow) { list.removeChild(typingRow); typingRow = null; lastWho = prevWho; }
      st.textContent = on ? 'digitando...' : 'online';
    }
    function message(ev) {
      typing(false);
      var r = row(ev.who), b = document.createElement('div');
      b.className = 'wa__b' + (ev.img ? ' wa__b--img' : '');
      if (seeking) b.style.animation = "none";
      if (ev.img) { var im = new Image(); im.src = BASE + 'mia/' + ev.img; im.alt = ''; im.width = 548; im.height = 306; b.appendChild(im); }
      var tx = document.createElement('span'); if (ev.img) tx.className = 'cap';
      tx.textContent = ev.text;
      var meta = document.createElement('span'); meta.className = 'wa__meta';
      meta.innerHTML = ev.h + (ev.who === 'out' ? TICK : '');
      tx.appendChild(meta); b.appendChild(tx); r.appendChild(b); list.appendChild(r);
      count++; scroll();
      emit('mia:step', {id: ev.id || null, count: count, who: ev.who});
    }
    function run(ev) {
      if (ev.typing) typing(true);
      else if (ev.flip) { if (!reduce) host.classList.add('is-flip'); }
      else message(ev);
    }
    body.addEventListener('animationend', function (e) { if (e.animationName === 'miaFlip') host.classList.remove('is-flip'); });
    function clear() {
      while (list.children.length > baseCount) list.removeChild(list.lastElementChild);
      typingRow = null; lastWho = null; count = 0; st.textContent = 'online';
      list.style.transform = 'translateY(0)';
      list.classList.remove('is-fading'); fading = false;
      host.classList.remove('is-flip');
      emit('mia:reset', {});
    }
    /* relógio próprio: só anda com o celular na tela e a aba visível */
    var running = false, t0 = 0, timer = 0, inView = false;
    function now() { return running ? (performance.now() - t0) / 1000 : t; }
    function tick() {
      timer = 0; if (!running) return;
      t = now();
      while (idx < CHAT.length && t >= CHAT[idx].t) run(CHAT[idx++]);
      if (!fading && t >= FADE_AT) { fading = true; list.classList.add('is-fading'); }
      if (t >= LOOP) { clear(); idx = 0; t = 0; t0 = performance.now(); }
      var next = idx < CHAT.length ? CHAT[idx].t : (fading ? LOOP : FADE_AT);
      timer = setTimeout(tick, Math.max(16, (next - now()) * 1000));
    }
    function sync() {
      var v = inView && document.visibilityState !== 'hidden';
      if (v === running) return;
      if (v) { t0 = performance.now() - t * 1000; running = true; tick(); }
      else { t = now(); running = false; clearTimeout(timer); timer = 0; }
      host.classList.toggle('is-off', !v);
      svgs.forEach(function (s) { if (s.pauseAnimations) { if (v) s.unpauseAnimations(); else s.pauseAnimations(); } });
    }
    function setVisible(v) { inView = v; sync(); }
    document.addEventListener('visibilitychange', sync);

    if (reduce) {                                   /* sem movimento: conversa pronta, sem flip */
      CHAT.forEach(function (ev) { if (ev.who) message(ev); });
      svgs.forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
      return;
    }
    /* revisão: ?mia=24 abre a conversa já no segundo 24 */
    var seek = parseFloat(new URLSearchParams(location.search).get('mia'));
    if (seek > 0 && seek < LOOP) {
      seeking = true; list.style.transition = 'none';
      while (idx < CHAT.length && CHAT[idx].t <= seek) { var ev = CHAT[idx++]; if (!ev.flip) run(ev); }
      t = seek; seeking = false;
      void list.offsetHeight; list.style.transition = '';
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setVisible(es[0].isIntersecting); }, {rootMargin: '80px'}).observe(host);
    } else setVisible(true);
    window.addEventListener('resize', scroll);
    this.restart = function () { clear(); idx = 0; t = 0; t0 = performance.now(); };
  }

  window.MiaPhone = MiaPhone;
  function boot() { document.querySelectorAll('[data-mia-phone]').forEach(function (h) { if (!h._mia) h._mia = new MiaPhone(h); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
