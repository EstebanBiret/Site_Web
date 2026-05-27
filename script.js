(function () {
    'use strict';

    const scrollBtn = document.querySelector('.scroll-up-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) scrollBtn.classList.add('show');
        else                      scrollBtn.classList.remove('show');
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('sticky');
        else                     navbar.classList.remove('sticky');
    }, { passive: true });

    const sections     = document.querySelectorAll('section[id]');
    const navLinks     = document.querySelectorAll('.menu-link');
    const observer     = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`.menu-link[href="#${entry.target.id}"]`)
                    .forEach(l => l.classList.add('active'));
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));

    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMenu() {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });

    const viewport  = document.querySelector('.slider-viewport');
    const track     = document.getElementById('sliderTrack');
    const dotsWrap  = document.getElementById('sliderDots');
    const prevBtn   = document.getElementById('prevBtn');
    const nextBtn   = document.getElementById('nextBtn');

    if (track) {
        const cards     = Array.from(track.querySelectorAll('.projet-card'));
        const total     = cards.length;
        let current     = 0;
        let perView     = getPerView();
        let cardWidth   = 0;
        let gap         = 24;
        let dots        = [];

        function getPerView() {
            const w = window.innerWidth;
            if (w < 600)  return 1;
            if (w < 960)  return 2;
            return 3;
        }

        function setSizes() {
            const viewW = viewport.offsetWidth;
            perView  = getPerView();
            cardWidth = (viewW - gap * (perView - 1)) / perView;
            cards.forEach(c => {
                c.style.width  = cardWidth + 'px';
                c.style.marginRight = gap + 'px';
            });
            const maxIndex = total - perView;
            if (current > maxIndex) current = Math.max(0, maxIndex);
            updatePosition(false);
            renderDots();
        }

        function updatePosition(animate = true) {
            track.style.transition = animate
                ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            const offset = current * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;
            updateControls();
        }

        function updateControls() {
            const maxIndex = total - perView;
            prevBtn.disabled = current <= 0;
            nextBtn.disabled = current >= maxIndex;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function renderDots() {
            dotsWrap.innerHTML = '';
            dots = [];
            const maxIndex = total - perView;
            const count    = maxIndex + 1;
            for (let i = 0; i < count; i++) {
                const btn = document.createElement('button');
                btn.className = 'slider-dot' + (i === current ? ' active' : '');
                btn.setAttribute('role', 'tab');
                btn.setAttribute('aria-label', `Projet ${i + 1}`);
                btn.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(btn);
                dots.push(btn);
            }
        }

        function goTo(index) {
            const maxIndex = total - perView;
            current = Math.max(0, Math.min(index, maxIndex));
            updatePosition(true);
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        document.addEventListener('keydown', e => {
            if (!isInView(viewport)) return;
            if (e.key === 'ArrowLeft')  goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });

        function isInView(el) {
            const r = el.getBoundingClientRect();
            return r.top < window.innerHeight && r.bottom > 0;
        }

        let startX = 0, startY = 0, isDragging = false, moved = false;

        viewport.addEventListener('pointerdown', e => {
            startX    = e.clientX;
            startY    = e.clientY;
            isDragging = true;
            moved      = false;
        });

        viewport.addEventListener('pointermove', e => {
            if (!isDragging) return;
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);
            if (dx > 8) moved = true;
            if (dx > dy && moved) e.preventDefault();
        }, { passive: false });

        viewport.addEventListener('pointerup', e => {
            if (!isDragging) return;
            isDragging = false;
            if (!moved) return;
            const dx = e.clientX - startX;
            const threshold = cardWidth * 0.2;
            if (dx < -threshold) goTo(current + 1);
            else if (dx > threshold) goTo(current - 1);
        });

        viewport.addEventListener('pointercancel', () => { isDragging = false; });

        setSizes();
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setSizes, 120);
        }, { passive: true });
    }

})();