/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
}
animCursor();

/* ── LOADER ── */
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 2100);
});

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});
function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
}));

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ── COUNTER ── */
function formatNum(n, target) {
    if (target >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (target >= 1000) return (n / 1000).toFixed(0) + 'K';
    return Math.round(n).toString();
}
const counters = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        let start = null;
        const dur = 2200;
        function step(ts) {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / dur, 1);
            const ease = 1 - Math.pow(1 - prog, 3);
            el.textContent = formatNum(ease * target, target);
            if (prog < 1) requestAnimationFrame(step);
            else el.textContent = formatNum(target, target);
        }
        requestAnimationFrame(step);
        counterIO.unobserve(el);
    });
}, { threshold: 0.4 });
counters.forEach(c => counterIO.observe(c));

/* ── GALLERY FILTER ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            const show = filter === 'all' || item.dataset.cat === filter;
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            if (show) {
                item.style.opacity = '1'; item.style.transform = 'scale(1)'; item.style.display = '';
            } else {
                item.style.opacity = '0'; item.style.transform = 'scale(0.95)';
                setTimeout(() => { if (item.dataset.cat !== filter && filter !== 'all') item.style.display = 'none'; }, 400);
            }
        });
    });
});

/* ── LIGHTBOX ── */
function openLightbox(el) {
    const img = el.querySelector('img');
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
});

/* ── CONTACT FORM ── */
function submitForm() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg = document.getElementById('fmsg').value.trim();
    if (!name || !email || !msg) { alert('Please fill in all required fields.'); return; }
    const el = document.getElementById('formMsg');
    el.classList.add('visible');
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmsg').value = '';
    setTimeout(() => el.classList.remove('visible'), 5000);
}

/* ── PARALLAX HERO ── */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) hero.style.transform = `scale(1) translateY(${window.scrollY * 0.3}px)`;
});