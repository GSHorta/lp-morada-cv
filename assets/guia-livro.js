/* ==========================================================
   Livro 3D do guia (ver guia-livro.css).
   Monta em todo [data-guia-livro]. Quando aparece na tela: abre,
   folheia 5 folhas, volta e fecha na capa. Repete a cada ~10 s.
   ========================================================== */
(function () {
  'use strict';
  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^\/]*$/, '') : 'assets/';
  })();
  var A = 'M358.52,202.56c-16.18,6.4-30.94,12.13-37.15,14.2-7.34,2.35-14.48,4.7-21.44,7.05,2.35,15.33,3.67,27.27,4.33,33.86,7.71,70.82-21.35,149.54-92.07,162.52-4.14.66-8.28.94-12.32.94-16.93,0-32.35-5.55-45.61-16.27-20.69-16.65-34.05-44.86-35.93-75.33-5.27-77.12,52.29-117.19,115.21-143.43-13.83-61.7-35.36-109.66-58.69-127.44-10.91-1.5-32.16,26.99-41.19,39.5l-1.32,1.88c-44.3,64.05-68.37,142.48-72.89,238.7-.94,19.19-16.83,34.23-36.02,34.23H0C0,248.74,27.65,148.48,84.46,66.47l1.69-2.35c19.37-26.71,59.63-82.29,114.27-58.22l4.33,2.35c44.67,29.44,70.07,98.94,84.17,157.91,1.6-.56,8.84-3.39,18.06-7.05,24.73-9.88,51.73,8.37,51.73,35.08v8.65l-.19-.28ZM243.78,245.36c-43.36,19.75-69.5,43.07-66.96,80.41.85,13.83,6.68,27.56,14.3,33.76,3.48,2.82,6.87,3.76,11.38,3.1,38.47-7.05,47.12-64.33,43.36-98.85-.66-6.21-1.32-12.32-2.07-18.43h0Z';
  var GRAF = '<svg class="lv-capa__graf" viewBox="0 0 358.7 421.13" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="' + A + '"/></svg>';

  function lines(ws) { return ws.map(function (w) { return '<i class="pg__ln" style="width:' + w + '%"></i>'; }).join(''); }
  /* 10 páginas de miolo (frente = página da direita, verso = da esquerda) */
  var PAGES = [
    '<span class="pg__k">Guia de boas práticas</span><p class="pg__h">Sumário</p><ul class="pg__toc"><li><b>01</b>Qualificação pela MIA</li><li><b>02</b>Handoff no Comunicador</li><li><b>03</b>Pós-visita e NPS</li><li><b>04</b>Checklist de implantação</li></ul>',
    '<span class="pg__big">01</span><p class="pg__h">Qualificação<br>pela MIA</p>' + lines([92, 86, 90, 60]),
    '<span class="pg__k">01 · Qualificação</span><p class="pg__h">O lead chega pronto</p>' + lines([96, 90, 94, 72]) + '<div class="pg__box">Intenção · capacidade financeira · produto de interesse</div>' + lines([88, 93, 54]),
    '<span class="pg__big">02</span><p class="pg__h">Handoff no<br>Comunicador</p>' + lines([90, 84, 92, 48]),
    '<span class="pg__k">02 · Handoff</span><p class="pg__h">Nada se perde na troca</p>' + lines([94, 88, 70]) + '<div class="pg__chat"><i style="width:70%"></i><i style="width:55%"></i><i style="width:78%"></i><i style="width:40%"></i></div>' + lines([90, 62]),
    '<span class="pg__big">03</span><p class="pg__h">Pós-visita<br>e NPS</p>' + lines([88, 92, 80, 56]),
    '<span class="pg__k">03 · Pós-visita</span><p class="pg__h">Avaliação na timeline</p>' + lines([92, 86, 64]) + '<div class="pg__bars"><i style="height:38%"></i><i style="height:52%"></i><i style="height:46%"></i><i style="height:70%"></i><i style="height:84%"></i><i style="height:96%"></i></div>' + lines([90, 58]),
    '<span class="pg__big">04</span><p class="pg__h">Checklist de<br>implantação</p>' + lines([90, 86, 52]),
    '<span class="pg__k">04 · Checklist</span><p class="pg__h">Antes de ligar a MIA</p><ul class="pg__chk"><li>Filas por empreendimento</li><li>Dono do lead definido</li><li>Estágios do funil mapeados</li><li>Comunicador oficial ativo</li><li>Pesquisa de NPS pós-visita</li></ul>' + lines([88, 70]),
    '<span class="pg__k">Próximo passo</span><p class="pg__h">Fale com a MIA</p>' + lines([94, 90, 86, 92, 60]) + '<div class="pg__box">morada.ai</div>'
  ];
  var LEAVES = 5;

  function build(host) {
    var D = 22, leaves = '';
    for (var i = 0; i < LEAVES; i++) {
      var st = '--z:' + (D / 2 - 1.5 - i * 1.2).toFixed(1) + 'px;--a:' + (-(178 - i * .7)).toFixed(1) + 'deg;--d1:' + (.62 + i * .21).toFixed(2) + 's;--d2:' + (2.5 + (LEAVES - 1 - i) * .09).toFixed(2) + 's';
      leaves += '<div class="livro__leaf" style="' + st + '">' +
        '<div class="livro__face pg">' + PAGES[i * 2] + '<span class="pg__n">' + String(i * 2 + 1).padStart(2, '0') + '</span></div>' +
        '<div class="livro__face livro__face--b pg">' + PAGES[i * 2 + 1] + '<span class="pg__n">' + String(i * 2 + 2).padStart(2, '0') + '</span></div></div>';
    }
    host.classList.add('livro');
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML =
      '<i class="livro__glow"></i><i class="livro__floor"></i>' +
      '<div class="livro__obj">' +
        '<div class="livro__back"></div>' +
        '<div class="livro__base pg"><span class="pg__k">Morada.ai + CV</span><p class="pg__h">Obrigado pela leitura</p>' + lines([92, 88, 94, 70, 90, 56]) + '<span class="pg__n">11</span></div>' +
        leaves +
        '<i class="livro__edge livro__edge--r"></i><i class="livro__edge livro__edge--b"></i><i class="livro__edge livro__edge--t"></i><i class="livro__edge livro__edge--s"></i>' +
        '<div class="livro__leaf livro__cover" style="--z:' + D / 2 + 'px;--a:-179deg;--d1:.08s;--d2:3.12s">' +
          '<div class="livro__face lv-capa">' + GRAF +
            '<img class="lv-capa__art" src="' + BASE + 'mia/morada-icone.jpg" alt="" width="600" height="600">' +
            '<div class="lv-capa__top"><img class="m" src="' + BASE + 'marca-morada.svg" alt="" width="75" height="14"><span class="x">+</span><img class="c" src="' + BASE + 'cv-logo.svg" alt="" width="68" height="18"><em>E-BOOK</em></div>' +
            '<p class="lv-capa__k">Guia de boas práticas</p>' +
            '<p class="lv-capa__t">Integração<br><b>Morada.ai <span class="hl">+ CV</span></b></p>' +
            '<p class="lv-capa__s">Qualificação pela MIA, handoff no Comunicador e pós-visita com NPS automático.</p>' +
            '<div class="lv-capa__f"><span>Material gratuito</span><span>2026</span></div>' +
            '<i class="lv-capa__hinge"></i><i class="lv-capa__gloss"></i>' +
          '</div>' +
          '<div class="livro__face livro__face--b lv-verso">' + GRAF + '</div>' +
        '</div>' +
      '</div>';

    var obj = host.querySelector('.livro__obj'), timer = 0, visible = false, reading = false;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    function read() {
      timer = 0; if (!visible || reading) return;
      reading = true; host.classList.add('is-reading');
    }
    obj.addEventListener('animationend', function (e) {
      if (e.target !== obj || e.animationName !== 'livroClose') return;
      host.classList.remove('is-reading'); reading = false;
      if (visible) timer = setTimeout(read, 3000);
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        host.classList.toggle('is-off', !visible);
        if (visible && !reading && !timer) timer = setTimeout(read, 400);
        if (!visible && timer) { clearTimeout(timer); timer = 0; }
      }, {threshold: .35}).observe(host);
    }
  }

  function boot() { document.querySelectorAll('[data-guia-livro]').forEach(function (h) { if (!h._livro) { h._livro = true; build(h); } }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
