function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (!menuToggle || !primaryNav) return;

    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        primaryNav.classList.toggle('show');
        menuToggle.querySelector('.visually-hidden').textContent =
            expanded ? 'Abrir menú' : 'Cerrar menú';
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.nav')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('show');
            menuToggle.querySelector('.visually-hidden').textContent = 'Abrir menú';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && primaryNav.classList.contains('show')) {
            menuToggle.click();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('show');
            menuToggle.querySelector('.visually-hidden').textContent = 'Abrir menú';
        }
    });
}

class Carousel {
    constructor() {
        this.current = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.dots = document.querySelectorAll('.indicator');
        this.delay = 5000;
        this.timer = null;

        if (this.slides.length) this.init();
    }

    init() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        this.dots.forEach((dot, i) =>
            dot.addEventListener('click', () => this.go(i)));

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        this.touchSupport();

        const container = document.querySelector('.carousel-container');
        container?.addEventListener('mouseenter', () => this.pause());
        container?.addEventListener('mouseleave', () => this.play());

        this.play();
        this.update();
    }

    touchSupport() {
        let startX = 0;
        const t = this.track;
        t?.addEventListener('touchstart', e => (startX = e.touches[0].clientX),
            { passive: true });
        t?.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
        });
    }

    update() {
        this.track.style.transform = `translateX(-${this.current * 100}%)`;
        this.slides.forEach((s, i) => s.classList.toggle('active', i === this.current));
        this.dots.forEach((d, i) => {
            d.classList.toggle('active', i === this.current);
            d.setAttribute('aria-current', i === this.current);
        });
    }

    go(i) { this.current = i; this.update(); this.reset(); }
    next() { this.current = (this.current + 1) % this.slides.length; this.update(); this.reset(); }
    prev() { this.current = (this.current - 1 + this.slides.length) % this.slides.length; this.update(); this.reset(); }

    play() { this.timer ??= setInterval(() => this.next(), this.delay); }
    pause() { clearInterval(this.timer); this.timer = null; }
    reset() { this.pause(); this.play(); }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    new Carousel();
});

const style = document.createElement('style');
style.textContent = `
  .carousel-slide {opacity:0; transition:opacity .5s ease;}
  .carousel-slide.active{opacity:1;}
`;
document.head.appendChild(style);