(function () {

    const mainImg = document.getElementById('main-img');
    const thumbs = document.querySelectorAll('.thumb');

    let currentImageIndex = 0;
    const images = [
        {
            main: 'https://placehold.co/600x420?text=Producto+1',
            thumb: 'https://placehold.co/72x72?text=1',
            alt: 'Vista principal del producto - Imagen 1'
        },
        {
            main: 'https://placehold.co/600x420?text=Producto+2',
            thumb: 'https://placehold.co/72x72?text=2',
            alt: 'Vista principal del producto - Imagen 2'
        },
        {
            main: 'https://placehold.co/600x420?text=Producto+3',
            thumb: 'https://placehold.co/72x72?text=3',
            alt: 'Vista principal del producto - Imagen 3'
        },
        {
            main: 'https://placehold.co/600x420?text=Producto+4',
            thumb: 'https://placehold.co/72x72?text=4',
            alt: 'Vista principal del producto - Imagen 4'
        }
    ];

    function initCarousel() {
        createCarouselIndicators();
        setupThumbnails();
        updateActiveThumbnail(0);
        setupKeyboardNavigation();
        setupTouchNavigation();
    }

    function createCarouselIndicators() {
        const mainImageContainer = document.querySelector('.main-image');
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';

        images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
            indicator.addEventListener('click', () => goToImage(index));
            indicatorsContainer.appendChild(indicator);
        });

        mainImageContainer.appendChild(indicatorsContainer);
    }

    function setupThumbnails() {
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => goToImage(index));

            const img = thumb.querySelector('img');
            if (img && images[index]) {
                img.src = images[index].thumb;
                img.alt = `Miniatura ${index + 1} del producto`;
            }
        });
    }

    function changeImage(direction) {
        const newIndex = currentImageIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            goToImage(newIndex);
        } else if (newIndex < 0) {
            goToImage(images.length - 1);
        } else {
            goToImage(0);
        }
    }

    function goToImage(index) {
        if (index === currentImageIndex || index < 0 || index >= images.length) return;

        mainImg.classList.add('fade-out');

        setTimeout(() => {
            currentImageIndex = index;
            mainImg.src = images[index].main;
            mainImg.alt = images[index].alt;

            updateActiveThumbnail(index);
            updateActiveIndicator(index);

            mainImg.classList.remove('fade-out');
            mainImg.classList.add('fade-in');

            setTimeout(() => {
                mainImg.classList.remove('fade-in');
            }, 300);
        }, 150);
    }

    function updateActiveThumbnail(index) {
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    function updateActiveIndicator(index) {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.gallery')) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        changeImage(-1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        changeImage(1);
                        break;
                }
            }
        });
    }

    function setupTouchNavigation() {
        let startX = 0;
        let endX = 0;
        const mainImageContainer = document.querySelector('.main-image');

        mainImageContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        mainImageContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    changeImage(1);
                } else {
                    changeImage(-1);
                }
            }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }

})();

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}