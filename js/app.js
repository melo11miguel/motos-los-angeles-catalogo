/* ============================================================================
   MOTOS LOS ÁNGELES — motor del catálogo
   Sin dependencias externas. Funciona abriendo index.html directamente.
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Datos */
  const inventario = CASCOS.filter(c => c.activo !== false);

  const ETIQUETA = { abierto: 'ABIERTO', abatible: 'ABATIBLE', integral: 'INTEGRAL' };

  /* Iconos por tipo de casco, dibujados a mano en SVG */
  const ICONO = {
    abierto:  '<svg viewBox="0 0 24 24"><path d="M4 15a8 8 0 0 1 16 0v2H4v-2Z"/><path d="M4 17h9"/></svg>',
    abatible: '<svg viewBox="0 0 24 24"><path d="M4 13a8 8 0 0 1 16 0v3H4v-3Z"/><path d="M4 16h11l3 3"/><path d="M15.5 8.5 19 5"/></svg>',
    integral: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 16 0v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"/><path d="M4 13h9a3 3 0 0 1 3 3v4"/></svg>',
  };

  const precioCOP = n =>
    n == null ? 'Por definir' : '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const precioHTML = precioCOP;

  /* En la versión publicada (un solo archivo), window.FOTOS trae cada
     imagen ya embebida en base64. En la versión local con carpeta /img,
     window.FOTOS no existe y simplemente se usa la ruta relativa. */
  const FOTOS = (typeof window !== 'undefined' && window.FOTOS) || {};
  const srcDe = img => img ? (FOTOS[img] || ('img/' + img)) : SIN_FOTO;

  /* Placeholder para referencias del Excel que aún no tienen foto */
  const SIN_FOTO = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <rect width="600" height="750" fill="#181b21"/>
  <g fill="none" stroke="#343a43" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 420a150 150 0 0 1 300 0v55H150Z"/>
    <path d="M150 445h300"/>
  </g>
  <text x="300" y="600" text-anchor="middle" font-family="ui-monospace,monospace" font-size="22" letter-spacing="5" fill="#5b6270">FALTA FOTO</text>
</svg>`);

  const enlaceWA = casco => {
    const base = 'https://wa.me/' + NEGOCIO.whatsapp + '?text=';
    const precioTxt = casco && casco.precio != null
      ? `— ${precioCOP(casco.precio)}.`
      : `(precio a confirmar).`;
    const txt = casco
      ? `Hola *${NEGOCIO.nombre}* 👋\nMe interesa el casco *${casco.nombre}* (${casco.version}) ${precioTxt}\n¿Está disponible y en qué tallas?`
      : `Hola *${NEGOCIO.nombre}* 👋\nQuisiera información sobre los cascos del catálogo.`;
    return base + encodeURIComponent(txt);
  };

  /* ------------------------------------------------------------ Preloader */
  const preloader = $('#preloader');
  const anillo    = $('.ring-fg');
  const pct       = $('#preloaderPct');
  const LARGO     = 2 * Math.PI * 52;

  function progreso(p) {
    pct.textContent = Math.round(p * 100);
    anillo.style.strokeDashoffset = LARGO * (1 - p);
  }

  function cerrarPreloader() {
    progreso(1);
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.classList.remove('no-scroll');
    }, 320);
  }

  /* Precarga las primeras imágenes para que el catálogo no aparezca vacío */
  function precargar() {
    const primeras = inventario.slice(0, 12).map(c => srcDe(c.img));
    if (!primeras.length) return cerrarPreloader();

    let listas = 0;
    const tick = () => {
      listas++;
      progreso(Math.min(listas / primeras.length, 1));
      if (listas === primeras.length) cerrarPreloader();
    };
    primeras.forEach(src => {
      const im = new Image();
      im.onload = im.onerror = tick;
      im.src = src;
    });
    // Red de seguridad: nunca dejar el preloader colgado
    setTimeout(cerrarPreloader, 4500);
  }

  document.body.classList.add('no-scroll');

  /* --------------------------------------------------------- Estado de UI */
  const estado = { texto: '', cat: 'todos', orden: 'def' };

  const grid1 = $('#grid1'), vacio1 = $('#vacio1');

  /* --------------------------------------------------------- Render tarjeta */
  function tarjeta(c, i) {
    const el = document.createElement('article');
    el.className = 'card' + (c.pendiente ? ' card--pendiente' : '');
    el.style.setProperty('--d', Math.min(i, 11) * 55 + 'ms');
    el.dataset.id = c.id;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${c.nombre} ${c.version}, ${precioCOP(c.precio)}.${c.pendiente ? ' Foto pendiente.' : ' Ver foto grande.'}`);

    el.innerHTML = `
      <div class="card__media">
        <img class="card__img" src="${srcDe(c.img)}" alt="Casco ${c.nombre} ${c.version}" loading="lazy" decoding="async">
        <div class="card__badges">
          ${c.pendiente ? '<span class="badge badge--pend">FALTA FOTO</span>' : ''}
          ${c.destacado ? '<span class="badge badge--acc">DESTACADO</span>' : ''}
          ${c.nino ? '<span class="badge badge--kid">NIÑO</span>' : ''}
          <span class="badge">${ETIQUETA[c.categoria]}</span>
        </div>
        <span class="card__tipo" title="${ETIQUETA[c.categoria]}">${ICONO[c.categoria]}</span>
        <span class="card__zoom">${c.pendiente ? 'SIN FOTO' : 'VER FOTO'}</span>
      </div>
      <div class="card__body">
        <p class="card__marca">${c.marca}</p>
        <h3 class="card__nombre">${c.nombre}</h3>
        <p class="card__version">${c.version}</p>
        <div class="card__pie">
          <span class="card__precio"><small>PRECIO</small><b>${precioHTML(c.precio)}</b></span>
          <a class="card__wa" href="${enlaceWA(c)}" target="_blank" rel="noopener"
             aria-label="Cotizar ${c.nombre} por WhatsApp" title="Cotizar por WhatsApp">
            <svg viewBox="0 0 24 24" class="ico ico--fill"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a12 12 0 0 1-6.2-5.4c-.5-.8-.8-1.7-.8-2.5 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.5.9 1.6 2 2.7 2.5.3.2.5.1.6 0l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4v.9Z"/></svg>
          </a>
        </div>
      </div>`;

    // Abrir lightbox (salvo si se hizo clic en el botón de WhatsApp)
    el.addEventListener('click', ev => {
      if (ev.target.closest('.card__wa')) return;
      abrirLB(c.id);
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); abrirLB(c.id); }
    });

    if (!menosMovimiento) inclinar(el);
    return el;
  }

  /* Inclinación 3D suave siguiendo el cursor */
  function inclinar(el) {
    let raf = 0;
    el.addEventListener('pointermove', ev => {
      if (ev.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - .5;
        const y = (ev.clientY - r.top) / r.height - .5;
        el.style.transform =
          `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-6px)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  }

  /* ------------------------------------------------------------- Filtrado */
  function filtrar(lista) {
    const q = estado.texto.trim().toLowerCase();
    let r = lista;

    if (q) {
      r = r.filter(c =>
        (c.nombre + ' ' + c.version + ' ' + c.marca + ' ' + ETIQUETA[c.categoria])
          .toLowerCase().includes(q));
    }
    if (estado.cat !== 'todos') r = r.filter(c => c.categoria === estado.cat);

    const orden = {
      asc:  (a, b) => a.precio - b.precio,
      desc: (a, b) => b.precio - a.precio,
      az:   (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
    }[estado.orden];

    return orden ? [...r].sort(orden) : r;
  }

  /* Lista visible actualmente — la usa el lightbox para navegar con flechas */
  let visibles = [];

  function pintar() {
    visibles = filtrar(inventario);

    grid1.replaceChildren(...visibles.map(tarjeta));
    vacio1.hidden = visibles.length > 0;
    $('#count1').textContent = visibles.length + (visibles.length === 1 ? ' modelo' : ' modelos');

    observarTarjetas();
  }

  /* --------------------------------------------- Entrada animada al scroll */
  let obsCards;
  function observarTarjetas() {
    if (menosMovimiento) {
      $$('.card').forEach(c => c.classList.add('in'));
      return;
    }
    obsCards?.disconnect();
    obsCards = new IntersectionObserver((entradas, o) => {
      entradas.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
    $$('.card').forEach(c => obsCards.observe(c));
  }

  const obsReveal = new IntersectionObserver((entradas, o) => {
    entradas.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
    });
  }, { threshold: .15 });
  $$('.reveal').forEach(el => obsReveal.observe(el));

  /* ------------------------------------------------------------- Lightbox */
  const lb = $('#lb');
  let lbIdx = -1;

  function abrirLB(id) {
    lbIdx = visibles.findIndex(c => c.id === id);
    if (lbIdx < 0) return;
    lb.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => lb.classList.add('show'));
    llenarLB();
    $('#lbX').focus();
  }

  function llenarLB() {
    const c = visibles[lbIdx];
    if (!c) return;
    $('#lbImg').src = srcDe(c.img);
    $('#lbImg').alt = `Casco ${c.nombre} ${c.version}`;
    $('#lbNombre').textContent = c.nombre;
    $('#lbVersion').textContent = `${c.version} · ${ETIQUETA[c.categoria]}`;
    $('#lbPrecio').innerHTML = precioHTML(c.precio);
    $('#lbWa').href = enlaceWA(c);
  }

  function cerrarLB() {
    lb.classList.remove('show');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { lb.hidden = true; }, 380);
  }

  const moverLB = paso => {
    if (!visibles.length) return;
    lbIdx = (lbIdx + paso + visibles.length) % visibles.length;
    llenarLB();
  };

  $('#lbX').onclick    = cerrarLB;
  $('#lbPrev').onclick = () => moverLB(-1);
  $('#lbNext').onclick = () => moverLB(1);
  lb.addEventListener('click', ev => { if (ev.target === lb) cerrarLB(); });

  document.addEventListener('keydown', ev => {
    if (lb.hidden) return;
    if (ev.key === 'Escape')     cerrarLB();
    if (ev.key === 'ArrowLeft')  moverLB(-1);
    if (ev.key === 'ArrowRight') moverLB(1);
  });

  /* Deslizar en móvil para cambiar de foto */
  let tx0 = null;
  lb.addEventListener('touchstart', e => { tx0 = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (tx0 === null) return;
    const d = e.changedTouches[0].clientX - tx0;
    if (Math.abs(d) > 55) moverLB(d < 0 ? 1 : -1);
    tx0 = null;
  }, { passive: true });

  /* ------------------------------------------------------ Filtro categoría */
  $$('#chipsCat .chip').forEach(b => {
    b.onclick = () => {
      estado.cat = b.dataset.cat;
      $$('#chipsCat .chip').forEach(x => x.classList.toggle('on', x === b));
      pintar();
    };
  });

  /* ------------------------------------------------------------- Controles */
  const inputBuscar = $('#buscar');
  let tDebounce;
  inputBuscar.addEventListener('input', () => {
    $('.search').classList.toggle('filled', inputBuscar.value.length > 0);
    clearTimeout(tDebounce);
    tDebounce = setTimeout(() => { estado.texto = inputBuscar.value; pintar(); }, 150);
  });
  $('#limpiar').onclick = () => {
    inputBuscar.value = '';
    estado.texto = '';
    $('.search').classList.remove('filled');
    pintar();
    inputBuscar.focus();
  };

  $('#orden').onchange = e => { estado.orden = e.target.value; pintar(); };

  /* ------------------------------------------------- Nav, scroll y anclas */
  const nav = $('#nav'), barra = $('#scrollbar'), fab = $('#fab');
  const secciones = ['#inicio', '#catalogo', '#contacto'];

  let ticking = false;
  function alScroll() {
    const y = window.scrollY;
    const alto = document.documentElement.scrollHeight - innerHeight;
    barra.style.width = (alto > 0 ? (y / alto) * 100 : 0) + '%';
    nav.classList.toggle('stuck', y > 40);
    fab.classList.toggle('show', y > innerHeight * .6);

    // Resalta el enlace de la sección visible
    let activo = secciones[0];
    for (const s of secciones) {
      const el = $(s);
      if (el && el.getBoundingClientRect().top <= innerHeight * .35) activo = s;
    }
    $$('.nav__links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === activo));
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(alScroll); }
  }, { passive: true });

  $('#burger').onclick = () => nav.classList.toggle('open');
  $$('.nav__links a').forEach(a => a.onclick = () => nav.classList.remove('open'));

  /* ------------------------------------------------ Contadores del hero */
  function contar(el, hasta) {
    if (menosMovimiento) { el.textContent = hasta; return; }
    const dur = 1400, t0 = performance.now();
    const paso = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(hasta * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  /* --------------------------------------------------------- Datos varios */
  const anio = new Date().getFullYear();
  $('#anio').textContent = anio;
  $('#anioHero').textContent = anio;

  $('#cHorario').textContent = NEGOCIO.horario || 'Consúltanos por WhatsApp';
  $('#cDir').textContent = NEGOCIO.direccion || 'Escríbenos y te compartimos la ubicación';
  $('#waGeneral').href = enlaceWA(null);
  $('#fab').href = enlaceWA(null);
  $('#waCatalogo').href = enlaceWA(null);

  const stats = $$('.hero__stats .cnt');
  stats[0].dataset.to = inventario.length;
  stats[1].dataset.to = new Set(inventario.map(c => c.marca)).size;

  /* ------------------------------------------------------------- Arranque */
  pintar();
  precargar();
  alScroll();
  setTimeout(() => stats.forEach(el => contar(el, +el.dataset.to)), 700);

  /* Aviso claro si las fotos no cargan (ej. carpeta /img movida) */
  addEventListener('error', ev => {
    if (ev.target?.tagName === 'IMG') ev.target.style.opacity = '.25';
  }, true);
})();
