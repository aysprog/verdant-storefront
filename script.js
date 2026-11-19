'use strict';
const unsplash = (id, w = 640, h = 760) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
const PRODUCTS = [

  { id: 'p1', name: 'Monstera Deliciosa', category: 'Plants', price: 38, rating: 4.8, img: unsplash('1525498128493-380d1990a112'), hue: 150, blurb: 'Bold split leaves. Thrives in bright, indirect light.' },
  { id: 'p2', name: 'Snake Plant', category: 'Plants', price: 24, rating: 4.9, img: unsplash('1599009944997-3544a939813c'), hue: 135, blurb: 'Nearly unkillable. Tolerates low light and missed waterings.' },
  { id: 'p3', name: 'Fiddle Leaf Fig', category: 'Plants', price: 54, rating: 4.4, img: unsplash('1763616310356-883d6931321a'), hue: 120, blurb: 'A sculptural statement for a sunny corner.' },
  { id: 'p4', name: 'Trailing Pothos', category: 'Plants', price: 19, rating: 4.7, img: unsplash('1757877598243-4fc57b5c2fae'), hue: 165, blurb: 'Soft, cascading vines for shelves and hanging planters.' },
  { id: 'p5', name: 'Terracotta Pot', category: 'Pots', price: 16, rating: 4.6, img: unsplash('1600411833114-bd695886396e'), hue: 18, blurb: 'Hand-finished, breathable clay with drainage.' },
  { id: 'p6', name: 'Ceramic Planter', category: 'Pots', price: 32, rating: 4.5, img: unsplash('1613498717076-c0d2d82ecf2d'), hue: 35, blurb: 'Matte glaze with a saucer in a speckled stone finish.' },
  { id: 'p7', name: 'Hanging Macramé', category: 'Pots', price: 22, rating: 4.3, img: unsplash('1768275560700-8fb5446efd60'), hue: 42, blurb: 'Cotton rope hanger that fits pots up to 20 cm.' },
  { id: 'p8', name: 'Brass Mister', category: 'Care', price: 28, rating: 4.7, img: unsplash('1580133318324-f2f76d987dd8'), hue: 48, blurb: 'A fine mist for ferns and humidity lovers.' },
  { id: 'p9', name: 'Organic Soil Mix', category: 'Care', price: 14, rating: 4.8, img: unsplash('1773332611574-d73d8f5cea36'), hue: 25, blurb: 'Peat-free blend with coco coir and perlite, 5 L.' },
  { id: 'p10', name: 'Pruning Shears', category: 'Care', price: 21, rating: 4.6, img: unsplash('1766902652974-900bb7db80b9'), hue: 200, blurb: 'Precision-ground steel with a safety lock.' },
  { id: 'p11', name: 'Linen Candle', category: 'Decor', price: 26, rating: 4.5, img: unsplash('1721908406342-b216fb7a0d0f'), hue: 55, blurb: 'Soy wax scented with fig leaf and cedar.' },
  { id: 'p12', name: 'Oak Plant Stand', category: 'Decor', price: 64, rating: 4.9, img: unsplash('1761375211973-86625f5c5cba'), hue: 30, blurb: 'Solid oak, mid-century silhouette, assembles in minutes.' },
];

const $ = s => document.querySelector(s);
let cart = {};
try { cart = JSON.parse(localStorage.getItem('verdant-cart') || '{}'); } catch (e) { /* storage unavailable */ }

function renderCount() {
  $('#badge').textContent = Object.values(cart).reduce((a, b) => a + b, 0);
}

function render() {
  const q = $('#q').value.trim().toLowerCase(), cat = $('#cat').value;
  const list = PRODUCTS.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q));
  $('#grid').innerHTML = list.map(p => `
    <li class="card"><img src="${p.img}" alt="${p.name}" width="640" height="760" loading="lazy">
      <div><h3>${p.name}</h3><p>$${p.price.toFixed(2)}</p><button class="add" data-id="${p.id}">Add to cart</button></div></li>`).join('');
  $('#empty').hidden = list.length > 0;
}

$('#grid').addEventListener('click', e => {
  const b = e.target.closest('.add'); if (!b) return;
  cart[b.dataset.id] = (cart[b.dataset.id] || 0) + 1;
  try { localStorage.setItem('verdant-cart', JSON.stringify(cart)); } catch (err) { /* ignore */ }
  renderCount();
});
$('#q').addEventListener('input', render);
$('#cat').addEventListener('change', render);
renderCount(); render();
