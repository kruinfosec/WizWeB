function sideMenu(state) {
    var sideMenu = document.getElementById("side-menu");
    if (state === 0) {
        sideMenu.classList.add('active');  // Show side menu
    } else {
        sideMenu.classList.remove('active');  // Hide side menu
    }
}

