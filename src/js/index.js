// Dropdown
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');

    dropdowns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.parentElement;
            const menu = parent.querySelector('.submenu');

            document.querySelectorAll('.submenu').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });

            menu.classList.toggle('active');
            parent.classList.toggle('active');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.submenu').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    })
});

// Responsividade - Hanburguer - Menu
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown-toggle');

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const iconName = navMenu.classList.contains('active') ? 'close-outline' : 'menu-outline';
        menuIcon.querySelector('ion-icon').setAttribute('name', iconName);
    });

    dropdowns.forEach(btn => {
        e.preventDefault();
        const submenu = this.parentElement.querySelector('.submenu');

        document.querySelectorAll('.submenu').forEach(m => {
            if(m !== submenu) m.classList.remove('active');
        });

        submenu.classList.toggle('active');
    })

})
