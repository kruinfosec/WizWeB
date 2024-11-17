// JavaScript to control the side-menu functionality

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu');
    const sideMenu = document.querySelector('.side-menu');
    const closeIcon = document.querySelector('.side-menu .close');

    // Function to open the side-menu
    menuIcon.addEventListener('click', () => {
        sideMenu.classList.add('active');
    });

    // Function to close the side-menu
    closeIcon.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });

    // Optional: Close side-menu if user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            sideMenu.classList.remove('active');
        }
    });
});
