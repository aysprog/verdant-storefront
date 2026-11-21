'use strict';
/* ========== Data ========== */
const unsplash = (id, w = 640, h = 760) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
const SPECS = {
  Plants: [['Ships in', '12–20 cm nursery pot'], ['Light', 'Bright, indirect'], ['Water', 'When top soil is dry'], ['Guarantee', '30-day healthy arrival']],
  Pots: [['Drainage', 'Included'], ['Finish', 'Hand-finished'], ['Care', 'Wipe clean with a damp cloth'], ['Returns', '30 days']],
  Care: [['Use', 'Indoor & outdoor plants'], ['Quality', 'Tested by our growers'], ['Shipping', 'Free over $75'], ['Returns', '30 days']],
  Decor: [['Material', 'Natural, sustainably sourced'], ['Style', 'Calm, minimal'], ['Assembly', 'Minimal or none'], ['Returns', '30 days']],
};
const PRODUCTS = [

  { id: 'p1', name: 'Monstera Deliciosa', category: 'Plants', price: 38, rating: 4.8, img: unsplash('1525498128493-380d1990a112'), alts: ['1614594975525-e45190c55d0b', '1493673272479-a20888bcee10'], hue: 150, blurb: 'Bold split leaves. Thrives in bright, indirect light.' },
  { id: 'p2', name: 'Snake Plant', category: 'Plants', price: 24, rating: 4.9, img: unsplash('1599009944997-3544a939813c'), alts: ['1547516508-e910d368d995', '1593482892290-f54927ae1bb6'], hue: 135, blurb: 'Nearly unkillable. Tolerates low light and missed waterings.' },
  { id: 'p3', name: 'Fiddle Leaf Fig', category: 'Plants', price: 54, rating: 4.4, img: unsplash('1763616310356-883d6931321a'), alts: ['1545239705-1564e58b9e4a', '1453904300235-0f2f60b15b5d'], hue: 120, blurb: 'A sculptural statement for a sunny corner.' },
  { id: 'p4', name: 'Trailing Pothos', category: 'Plants', price: 19, rating: 4.7, img: unsplash('1757877598243-4fc57b5c2fae'), alts: ['1586883573403-cb7ee339755b', '1775922401880-738228182806'], hue: 165, blurb: 'Soft, cascading vines for shelves and hanging planters.' },
  { id: 'p5', name: 'Terracotta Pot', category: 'Pots', price: 16, rating: 4.6, img: unsplash('1600411833114-bd695886396e'), alts: ['1623173508476-9883063f904b', '1598880940080-ff9a29891b85'], hue: 18, blurb: 'Hand-finished, breathable clay with drainage.' },
  { id: 'p6', name: 'Ceramic Planter', category: 'Pots', price: 32, rating: 4.5, img: unsplash('1613498717076-c0d2d82ecf2d'), alts: ['1611211232932-da3113c5b960', '1613498630970-f2a333cb4974'], hue: 35, blurb: 'Matte glaze with a saucer in a speckled stone finish.' },
  { id: 'p7', name: 'Hanging Macramé', category: 'Pots', price: 22, rating: 4.3, img: unsplash('1768275560700-8fb5446efd60'), alts: ['1537039557108-4a42c334fd5e', '1596724878582-76f1a8fdc24f'], hue: 42, blurb: 'Cotton rope hanger that fits pots up to 20 cm.' },
  { id: 'p8', name: 'Brass Mister', category: 'Care', price: 28, rating: 4.7, img: unsplash('1580133318324-f2f76d987dd8'), alts: ['1531875985735-f135dac5f230', '1643819131797-46919f3009f7'], hue: 48, blurb: 'A fine mist for ferns and humidity lovers.' },
  { id: 'p9', name: 'Organic Soil Mix', category: 'Care', price: 14, rating: 4.8, img: unsplash('1773332611574-d73d8f5cea36'), alts: ['1687552212914-03a30c82053c', '1593482892290-f54927ae1bb6'], hue: 25, blurb: 'Peat-free blend with coco coir and perlite, 5 L.' },
  { id: 'p10', name: 'Pruning Shears', category: 'Care', price: 21, rating: 4.6, img: unsplash('1766902652974-900bb7db80b9'), alts: ['1674996625573-3d2beff984ab', '1595524147656-eb5d0a63e9a9'], hue: 200, blurb: 'Precision-ground steel with a safety lock.' },
  { id: 'p11', name: 'Linen Candle', category: 'Decor', price: 26, rating: 4.5, img: unsplash('1721908406342-b216fb7a0d0f'), alts: ['1721932547078-38a815bb6b17', '1773847469674-189153e5e32d'], hue: 55, blurb: 'Soy wax scented with fig leaf and cedar.' },
  { id: 'p12', name: 'Oak Plant Stand', category: 'Decor', price: 64, rating: 4.9, img: unsplash('1761375211973-86625f5c5cba'), alts: ['1638741280384-36839c90f329', '1721908406342-b216fb7a0d0f'], hue: 30, blurb: 'Solid oak, mid-century silhouette, assembles in minutes.' },
];
const idOf = url => /photo-([^?]+)/.exec(url)[1];
function gallery(p) {
  const zoom = `https://images.unsplash.com/photo-${idOf(p.img)}?auto=format&fit=crop&crop=focalpoint&fp-x=.5&fp-y=.5&fp-z=2.2&w=900&h=1050&q=70`;
  return [
    { src: unsplash(idOf(p.img), 900, 1050), label: 'Front view' },
    { src: unsplash(p.alts[0], 900, 1050), label: 'Side view' },
    { src: unsplash(p.alts[1], 900, 1050), label: 'Styled in a room' },
    { src: zoom, label: 'Close-up detail' },
  ];
}
/** Simulated API — add ?error to the URL to preview the error state. */
const fetchProducts = () => new Promise((res, rej) => setTimeout(() =>
  location.search.includes('error') ? rej(new Error('Network unavailable')) : res(PRODUCTS), 900));

/* ========== Validation & pricing (pure functions) ========== */
function luhn(num) {
  const d = num.replace(/\D/g, '');
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  for (let i = 0; i < d.length; i++) { let n = +d[d.length - 1 - i]; if (i % 2) { n *= 2; if (n > 9) n -= 9; } sum += n; }
  return sum % 10 === 0;
}
function expiryOk(v, now = new Date()) {
  const m = /^(\d{2})\/(\d{2})$/.exec(v.trim());
  if (!m) return false;
  const mo = +m[1], yr = 2000 + +m[2];
  return mo >= 1 && mo <= 12 && (yr > now.getFullYear() || (yr === now.getFullYear() && mo >= now.getMonth() + 1));
}
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email, e.g. name@example.com.';
  if (!/^\+?[0-9\s-]{7,15}$/.test(v.phone.trim())) e.phone = 'Enter a phone number with 7–15 digits.';
  if (v.address.trim().length < 6) e.address = 'Enter your street address.';
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(v.postcode.trim())) e.postcode = 'Enter a valid postcode (3–10 characters).';
  if (!luhn(v.card)) e.card = 'Enter a valid card number.';
  if (!expiryOk(v.expiry)) e.expiry = 'Use MM/YY, not in the past.';
  if (!/^\d{3,4}$/.test(v.cvc.trim())) e.cvc = '3 or 4 digits.';
  return e;
}
const FREE_AT = 75;
function pricing(sub) {
  const shipping = sub === 0 || sub >= FREE_AT ? 0 : 6, tax = +(sub * 0.08).toFixed(2);
  return { sub, shipping, tax, total: +(sub + shipping + tax).toFixed(2) };
}
const money = n => '$' + n.toFixed(2);

/* ========== State & helpers ========== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const state = { products: [], status: 'loading', q: '', cat: 'All', max: 70, sort: 'featured', cart: {} };
try { state.cart = JSON.parse(localStorage.getItem('verdant-cart') || '{}'); } catch (e) { /* storage unavailable */ }
const saveCart = () => { try { localStorage.setItem('verdant-cart', JSON.stringify(state.cart)); } catch (e) { /* ignore */ } };
const byId = id => PRODUCTS.find(p => p.id === id);
const cartItems = () => PRODUCTS.filter(p => state.cart[p.id]).map(p => ({ p, qty: state.cart[p.id] }));
const subtotal = () => cartItems().reduce((s, i) => s + i.p.price * i.qty, 0);

function updateBadge() {
  const b = $('#badge'); b.textContent = cartItems().reduce((s, i) => s + i.qty, 0);
  b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
}
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('aria-hidden', 'true'); t.textContent = '✓ ' + msg;
  document.body.append(t); setTimeout(() => t.remove(), 2400);
}
function addToCart(p, n = 1) {
  state.cart[p.id] = (state.cart[p.id] || 0) + n; saveCart(); updateBadge();
  $('#live').textContent = `${n} × ${p.name} added to cart`; toast(`${p.name} added to cart`);
}

/* Dialog helper: focus trap, Esc, overlay click, scroll lock, focus return */
function mount(cls, html, onKey) {
  const opener = document.activeElement, wrap = document.createElement('div');
  wrap.className = cls; wrap.innerHTML = html; $('#layer').append(wrap);
  const dlg = $('[role=dialog]', wrap); dlg.focus(); document.body.style.overflow = 'hidden';
  const keys = e => {
    if (e.key === 'Escape') return close();
    if (onKey) onKey(e);
    if (e.key !== 'Tab') return;
    const f = $$('button, input, select, a[href]', dlg).filter(x => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  function close() { document.removeEventListener('keydown', keys); wrap.remove(); document.body.style.overflow = ''; if (opener && opener.focus) opener.focus(); }
  document.addEventListener('keydown', keys);
  $('.overlay', wrap).addEventListener('click', close);
  return { wrap, dlg, close };
}

/* ========== Shop grid ========== */
function visible() {
  const q = state.q.trim().toLowerCase();
  const list = state.products.filter(p => (state.cat === 'All' || p.category === state.cat) && p.price <= state.max &&
    (!q || p.name.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q)));
  const by = { featured: () => 0, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating };
  return [...list].sort(by[state.sort]);
}
const stateHTML = (icon, title, text, label, act, role = '') =>
  `<div class="state" ${role ? `role="${role}"` : ''}><div class="state__icon">${icon}</div><h3>${title}</h3><p class="muted">${text}</p><button class="btn" data-act="${act}">${label}</button></div>`;
const cardHTML = (p, i) => `
  <li class="card" style="animation-delay:${Math.min(i, 8) * 70}ms">
    <div class="card__media" style="--hue:${p.hue}">
      <button class="card__open" data-open="${p.id}" aria-label="View details for ${p.name}">
        <img src="${p.img}" alt="" width="640" height="760" loading="lazy" onload="this.classList.add('is-loaded')" onerror="this.remove()">
        ${p.rating >= 4.8 ? '<span class="tag">Bestseller</span>' : ''}<span class="peek">Quick view</span>
      </button>
      <button class="quick" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
    </div>
    <div class="card__body"><p class="eyebrow">${p.category}</p>
      <h3><button class="linkbtn" data-open="${p.id}">${p.name}</button></h3><p class="muted">${p.blurb}</p>
      <div class="card__foot"><strong class="price">${money(p.price)}</strong><span class="rating" aria-label="Rated ${p.rating} out of 5">★ ${p.rating}</span></div></div>
  </li>`;
function renderResults() {
  const el = $('#results'), list = state.status === 'ready' ? visible() : [];
  $('#count').textContent = state.status === 'ready' ? `${list.length} products` : '';
  if (state.status === 'ready') $('#live').textContent = `${list.length} products shown`;
  if (state.status === 'loading') el.innerHTML = '<ul class="grid" aria-busy="true" aria-label="Loading products">' + '<li class="card skeleton"></li>'.repeat(6) + '</ul>';
  else if (state.status === 'error') el.innerHTML = stateHTML('⚠️', 'We couldn’t load the shop', 'Check your connection and try again.', 'Retry', 'retry', 'alert');
  else if (!list.length) el.innerHTML = stateHTML('🔍', 'No matches found', 'Try a different search or widen your price range.', 'Clear filters', 'reset');
  else el.innerHTML = '<ul class="grid">' + list.map(cardHTML).join('') + '</ul>';
}
function load() {
  state.status = 'loading'; renderResults();
  fetchProducts().then(p => { state.products = p; state.status = 'ready'; renderResults(); }).catch(() => { state.status = 'error'; renderResults(); });
}

/* ========== Product quick view ========== */
function openProduct(id) {
  const p = byId(id), views = gallery(p); let i = 0, qty = 1;
  const m = mount('modal-wrap', `<div class="overlay"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" tabindex="-1">
      <button class="icon-btn modal__close" data-act="close" aria-label="Close product details">✕</button>
      <div class="gallery">
        <div class="gallery__stage">${views.map((v, k) => `<img src="${v.src}" alt="${p.name} — ${v.label.toLowerCase()}" width="900" height="1050" class="${k ? '' : 'is-active'}">`).join('')}
          <span class="gallery__label" aria-live="polite"></span></div>
        <div class="thumbs" role="group" aria-label="Product views">${views.map((v, k) =>
          `<button class="thumb" data-view="${k}" aria-label="Show ${v.label.toLowerCase()}"><img src="${v.src.replace('w=900&h=1050', 'w=160&h=190')}" alt="" width="80" height="95" loading="lazy"></button>`).join('')}</div>
      </div>
      <div class="info"><p class="eyebrow">${p.category}</p><h2 id="pm-title">${p.name}</h2>
        <p class="info__meta"><span class="rating">★ ${p.rating}</span><span class="muted">· In stock · Ships in 1–2 days</span></p>
        <p class="info__price">${money(p.price)}</p><p class="info__blurb">${p.blurb}</p>
        <dl class="specs">${SPECS[p.category].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <div class="buy"><div class="qty qty--lg" role="group" aria-label="Quantity"><button data-qty="-1" aria-label="Decrease quantity">−</button><span id="pm-qty" aria-live="polite">1</span><button data-qty="1" aria-label="Increase quantity">+</button></div>
          <button class="btn btn--grow" data-act="buy"></button></div>
        <ul class="perks"><li>🚚 Free delivery over $75</li><li>🌱 30-day plant guarantee</li><li>♻️ Plastic-free packaging</li></ul></div>
    </div>`, e => { if (e.key === 'ArrowRight') show(i + 1); if (e.key === 'ArrowLeft') show(i - 1); });
  const imgs = $$('.gallery__stage img', m.wrap), thumbs = $$('.thumb', m.wrap), stage = $('.gallery__stage', m.wrap);
  function show(n) {
    i = (n + views.length) % views.length;
    imgs.forEach((im, k) => { im.classList.toggle('is-active', k === i); im.setAttribute('aria-hidden', k !== i); });
    thumbs.forEach((t, k) => { t.classList.toggle('thumb--on', k === i); t.setAttribute('aria-pressed', k === i); });
    $('.gallery__label', m.wrap).textContent = `${views[i].label} · ${i + 1}/${views.length}`;
  }
  const price = () => { $('#pm-qty', m.wrap).textContent = qty; $('[data-act=buy]', m.wrap).textContent = `Add to cart · ${money(p.price * qty)}`; };
  show(0); price();
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect(), a = imgs[i];
    a.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`; a.style.transform = 'scale(1.7)';
  });
  stage.addEventListener('mouseleave', () => { imgs[i].style.transform = ''; });
  m.wrap.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.view) show(+t.dataset.view);
    if (t.dataset.qty) { qty = Math.min(10, Math.max(1, qty + +t.dataset.qty)); price(); }
    if (t.dataset.act === 'close') m.close();
    if (t.dataset.act === 'buy') { addToCart(p, qty); m.close(); }
  });
}

/* ========== Cart & checkout drawer ========== */
const BILLING = [['name', 'Full name', 'text', 'name'], ['email', 'Email', 'email', 'email', 1], ['phone', 'Phone', 'tel', 'tel', 1], ['address', 'Billing address', 'text', 'street-address'], ['postcode', 'Postcode', 'text', 'postal-code', 1]];
const PAYMENT = [['card', 'Card number', 'text', 'cc-number', 0, '4242 4242 4242 4242'], ['expiry', 'Expiry', 'text', 'cc-exp', 1, 'MM/YY'], ['cvc', 'CVC', 'text', 'cc-csc', 1, '123']];
const field = ([k, label, type, auto, half, ph = '']) =>
  `<div class="field${half ? ' field--half' : ''}"><label for="f-${k}">${label}</label><input id="f-${k}" name="${k}" type="${type}" autocomplete="${auto}" placeholder="${ph}" ${/card|expiry|cvc/.test(k) ? 'inputmode="numeric"' : ''}></div>`;
function format(k, v) {
  if (k === 'card') return v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
  if (k === 'expiry') { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }
  if (k === 'cvc') return v.replace(/\D/g, '').slice(0, 4);
  return v;
}
function openCart() {
  const m = mount('', `<div class="overlay"></div><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dt" tabindex="-1"></aside>`);
  const dr = $('.drawer', m.wrap), order = 'VC-' + Math.floor(100000 + Math.random() * 900000);
  let step = 'cart';
  const titles = { cart: 'Your cart', checkout: 'Checkout', success: 'Thank you' };
  function draw(focusSel) {
    const items = cartItems(), sub = subtotal(), p = pricing(sub);
    dr.className = step === 'checkout' ? 'drawer drawer--wide' : 'drawer';
    let body;
    if (step === 'success') body = `<div class="state state--success" role="status"><div class="state__icon">✓</div><h3>Order placed</h3><p class="muted">Order <strong>${order}</strong> is confirmed. A receipt is on its way and your plants will be packed with care.</p><button class="btn" data-act="done">Continue shopping</button></div>`;
    else if (!items.length) body = `<div class="state"><div class="state__icon">🧺</div><h3>Your cart is empty</h3><p class="muted">Add something green to get started.</p><button class="btn" data-act="close">Browse the shop</button></div>`;
    else if (step === 'cart') body = `<ul class="lines">${items.map(({ p: it, qty }) => `
      <li class="line"><img class="line__img" src="${it.img}" alt="" width="64" height="64"><div class="line__info"><strong>${it.name}</strong><span class="muted">${money(it.price)} each</span></div>
      <div class="qty" role="group" aria-label="Quantity for ${it.name}"><button data-q="${it.id}" data-d="-1" aria-label="Decrease ${it.name}">−</button><span aria-live="polite">${qty}</span><button data-q="${it.id}" data-d="1" aria-label="Increase ${it.name}">+</button></div></li>`).join('')}</ul>
      <footer class="drawer__foot"><p class="muted ship">${p.shipping === 0 ? '🎉 You’ve unlocked free shipping' : `Add ${money(FREE_AT - sub)} more for free shipping`}</p>
      <div class="bar" aria-hidden="true"><span style="width:${Math.min(100, sub / FREE_AT * 100)}%"></span></div>
      <p class="total"><span>Subtotal</span><strong>${money(sub)}</strong></p><button class="btn btn--block" data-act="checkout">Checkout</button></footer>`;
    else body = `<form class="form" id="co" novalidate>
      <fieldset><legend>Billing details</legend><div class="fgrid">${BILLING.map(field).join('')}</div></fieldset>
      <fieldset><legend>Payment <span class="lock">🔒 Demo only — never enter a real card</span></legend><div class="fgrid">${PAYMENT.map(field).join('')}</div></fieldset>
      <dl class="summary"><div><dt>Subtotal</dt><dd>${money(p.sub)}</dd></div><div><dt>Shipping</dt><dd>${p.shipping ? money(p.shipping) : 'Free'}</dd></div><div><dt>Tax (8%)</dt><dd>${money(p.tax)}</dd></div><div class="summary__total"><dt>Total</dt><dd>${money(p.total)}</dd></div></dl>
      <div class="row"><button type="button" class="btn btn--ghost" data-act="back">Back</button><button type="submit" class="btn" id="pay">Pay ${money(p.total)}</button></div></form>`;
    dr.innerHTML = `<header class="drawer__head"><h2 id="dt">${titles[step]}</h2><button class="icon-btn" data-act="close" aria-label="Close cart">✕</button></header>${body}`;
    if (focusSel) { const f = $(focusSel, dr); if (f) f.focus(); }
  }
  dr.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.q) {
      const id = t.dataset.q, n = (state.cart[id] || 0) + +t.dataset.d;
      if (n > 0) state.cart[id] = n; else delete state.cart[id];
      saveCart(); updateBadge(); draw(state.cart[id] ? `[data-q="${id}"][data-d="${t.dataset.d}"]` : '.drawer__head .icon-btn');
    }
    const a = t.dataset.act;
    if (a === 'close') m.close();
    if (a === 'checkout') { step = 'checkout'; draw('#f-name'); }
    if (a === 'back') { step = 'cart'; draw(); }
    if (a === 'done') { state.cart = {}; saveCart(); updateBadge(); m.close(); }
  });
  dr.addEventListener('input', e => { const i = e.target; if (i.name) i.value = format(i.name, i.value); });
  dr.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target, v = Object.fromEntries(new FormData(form)), errs = validate(v);
    $$('.field__error, .alert', form).forEach(x => x.remove());
    $$('input', form).forEach(i => { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); });
    const keys = Object.keys(errs);
    keys.forEach(k => {
      const i = $('#f-' + k, form); i.setAttribute('aria-invalid', 'true'); i.setAttribute('aria-describedby', 'e-' + k);
      i.insertAdjacentHTML('afterend', `<span id="e-${k}" class="field__error">${errs[k]}</span>`);
    });
    if (keys.length) { form.insertAdjacentHTML('afterbegin', `<p role="alert" class="alert">Please fix ${keys.length} field(s) below.</p>`); return $('#f-' + keys[0], form).focus(); }
    const pay = $('#pay', form); pay.disabled = true; pay.textContent = 'Processing…';
    setTimeout(() => { step = 'success'; draw(); }, 1200);
  });
  draw();
}

/* ========== Wiring ========== */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open], [data-add], [data-act]'); if (!t || t.closest('#layer')) return;
  if (t.dataset.open) openProduct(t.dataset.open);
  if (t.dataset.add) addToCart(byId(t.dataset.add));
  if (t.dataset.act === 'retry') load();
  if (t.dataset.act === 'reset') { state.q = ''; state.cat = 'All'; state.max = 70; $('#filters').reset(); $('#price-l').textContent = 'Max price: $70'; syncChips(); renderResults(); }
});
$('#cart-btn').addEventListener('click', openCart);
const syncChips = () => $$('.chip').forEach(c => c.classList.toggle('chip--on', $('input', c).checked));
$('#q').addEventListener('input', e => { state.q = e.target.value; renderResults(); });
$('#sort').addEventListener('change', e => { state.sort = e.target.value; renderResults(); });
$('#price').addEventListener('input', e => { state.max = +e.target.value; $('#price-l').textContent = `Max price: $${state.max}`; renderResults(); });
$$('input[name=cat]').forEach(r => r.addEventListener('change', () => { state.cat = r.value; syncChips(); renderResults(); }));
$('#filters').addEventListener('submit', e => e.preventDefault());
window.addEventListener('scroll', () => $('#top').classList.toggle('top--solid', scrollY > 12), { passive: true });

$('#nl-form').addEventListener('submit', e => {
  e.preventDefault();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('#nl').value.trim()), msg = $('#nl-msg');
  msg.className = ok ? 'nl-ok' : 'nl-err'; msg.textContent = ok ? '✓ You’re on the list. Welcome!' : 'Please enter a valid email address.';
  $('#nl').setAttribute('aria-invalid', !ok);
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('reveal--in'); io.unobserve(en.target); } }), { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('reveal--in'));

updateBadge(); load();

/* Self-tests: open index.html?selftest and check the browser console (F12) */
if (location.search.includes('selftest')) {
  const t = (name, ok) => console[ok ? 'log' : 'error']((ok ? 'PASS ' : 'FAIL ') + name);
  const good = { name: 'Ayesha Khan', email: 'a@b.com', phone: '+92 300 1234567', address: '12 Garden Road', postcode: '63100', card: '4242 4242 4242 4242', expiry: '12/45', cvc: '123' };
  t('valid form has no errors', Object.keys(validate(good)).length === 0);
  t('empty form has 8 errors', Object.keys(validate({ name: '', email: '', phone: '', address: '', postcode: '', card: '', expiry: '', cvc: '' })).length === 8);
  t('luhn accepts valid / rejects invalid', luhn('4242424242424242') && !luhn('4242424242424241'));
  t('expired card rejected', !!validate({ ...good, expiry: '01/20' }).expiry);
  t('shipping $6 under $75, free at $75', pricing(50).shipping === 6 && pricing(75).shipping === 0);
  t('8% tax', pricing(100).total === 108);
}
