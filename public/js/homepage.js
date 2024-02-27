const handleNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 0;
    navbar.classList.toggle('scrolled', scrolled);
};

const handleHamburgerMenu = () => {
    const navbarToggle = document.getElementById('js-navbar-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('js-nav-links');

    navbarToggle.addEventListener('click', () => {
        navbar.classList.toggle('show');
        navLinks.classList.toggle('show');
    });
};

window.addEventListener('scroll', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', handleHamburgerMenu);

// Other homepage-specific code can be added here
