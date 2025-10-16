/**
 * Indigenous Art Atlas - Global App Logic
 *
 * This file handles sitewide functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initBackToTop();
});

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (button) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });
        button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}
