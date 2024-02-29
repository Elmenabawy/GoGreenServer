const handleNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 0;
    navbar.classList.toggle('scrolled', scrolled);
};



window.addEventListener('scroll', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', handleHamburgerMenu);

// Other homepage-specific code can be added here
