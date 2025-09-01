function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            menuToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('show');

            const span = menuToggle.querySelector('.visually-hidden');
            if (span) {
                span.textContent = isExpanded ? 'Abrir menú' : 'Cerrar menú';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('show');
                const span = menuToggle.querySelector('.visually-hidden');
                if (span) {
                    span.textContent = 'Abrir menú';
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && primaryNav.classList.contains('show')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('show');
                const span = menuToggle.querySelector('.visually-hidden');
                if (span) {
                    span.textContent = 'Abrir menú';
                }
                menuToggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('show');
                const span = menuToggle.querySelector('.visually-hidden');
                if (span) {
                    span.textContent = 'Abrir menú';
                }
            }
        });
    }

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Formulario enviado');
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
