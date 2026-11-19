// CV Alteknik - script.js

// Nomor WhatsApp (format 62..., tanpa + dan tanpa 0 di depan)
var NOMOR_WA = '6285893125043';

// Link WhatsApp
document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/' + NOMOR_WA + '?text=' + encodeURIComponent(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
});

// Menu mobile
var navBtn = document.getElementById('navBtn');
var navMenu = document.getElementById('navMenu');
function tutupMenu() {
    navMenu.classList.remove('open');
    navBtn.setAttribute('aria-expanded', 'false');
}
navBtn.addEventListener('click', function () {
    var buka = navMenu.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', String(buka));
});
navMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', tutupMenu); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') tutupMenu(); });

// Carousel
var slides = document.querySelectorAll('.slide');
var dots = document.getElementById('dots');
var idx = 0, timer;
slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Banner ' + (i + 1));
    b.addEventListener('click', function () { tampil(i); mulai(); });
    dots.appendChild(b);
});
function tampil(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('on', i === idx); });
    dots.querySelectorAll('button').forEach(function (d, i) { d.classList.toggle('on', i === idx); });
}
function mulai() {
    clearInterval(timer);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(function () { tampil(idx + 1); }, 5000);
}
document.querySelector('.c-btn.prev').addEventListener('click', function () { tampil(idx - 1); mulai(); });
document.querySelector('.c-btn.next').addEventListener('click', function () { tampil(idx + 1); mulai(); });
tampil(0);
mulai();

// Lightbox portofolio
var lb = document.getElementById('lb');
var lbImg = document.getElementById('lbImg');
document.querySelectorAll('.g-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.showModal();
    });
});
lb.addEventListener('click', function () { lb.close(); });

// Tahun copyright otomatis
document.getElementById('tahun').textContent = new Date().getFullYear();