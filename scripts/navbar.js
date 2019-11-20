// Navbar menu
const navbarCollapseEl = document.getElementsByClassName('navbar-collapse')[0];
// Toggle menu button
const navbarTogglerEl = document.getElementsByClassName('navbar-toggler')[0];

// This checks if the menu is showing and if so, close it. And viceversa.
function toggleMenu() {
    const isShowingMenu = !navbarTogglerEl.classList.contains('collapsed');
    if (isShowingMenu) {
        navbarTogglerEl.classList.add('collapsed');
        navbarCollapseEl.classList.remove('show');
    } else {
        navbarTogglerEl.classList.remove('collapsed');
        navbarCollapseEl.classList.add('show');
    }
}

// We need to close the menu after the item is clicked if the toggle button is showing
function onNavbarMenuItemClick() {
    if (navbarTogglerEl.style.display !== 'none') {
        this.toggleMenu();
    }
}

// Listens for a click on the toggler menu button.
navbarTogglerEl.addEventListener('click', toggleMenu);
