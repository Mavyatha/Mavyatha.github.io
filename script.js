document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');
    const animatedElements = document.querySelectorAll(
        '.stat-item, .edu-card, .skill-category, .experience-card, .project-card, .achievement-card, .contact-item'
    );

    // Scroll-to-top button
    const updateScrollButton = () => {
        if (window.scrollY > 450) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', updateScrollButton, { passive: true });
    updateScrollButton();

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');

            if (!targetId || !targetId.startsWith('#')) {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reveal elements when they enter the viewport
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -45px 0px'
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    // Active navigation item
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 220;
        let currentSection = 'about';

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
});
