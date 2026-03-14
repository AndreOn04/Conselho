// Dropdown
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  dropdowns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const parent = this.parentElement;
      const menu = parent.querySelector(".submenu");

      document.querySelectorAll(".submenu").forEach((m) => {
        if (m !== menu) m.classList.remove("active");
      });

      menu.classList.toggle("active");
      parent.classList.toggle("active");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".submenu")
      .forEach((m) => m.classList.remove("active"));
    document
      .querySelectorAll(".dropdown")
      .forEach((d) => d.classList.remove("active"));
  });
});

// Responsividade - Hanburguer - Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const iconName = navMenu.classList.contains("active")
      ? "close-outline"
      : "menu-outline";
    menuIcon.querySelector("ion-icon").setAttribute("name", iconName);
  });

  dropdowns.forEach((btn) => {
    e.preventDefault();
    const submenu = this.parentElement.querySelector(".submenu");

    document.querySelectorAll(".submenu").forEach((m) => {
      if (m !== submenu) m.classList.remove("active");
    });

    submenu.classList.toggle("active");
  });
});

// Animações HERO
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  observer.observe(aboutSection);
});

// Animação Composição conselho
document.addEventListener("DOMContentLoaded", () => {
  // Selecionamos todos os itens da lista
  const listItems = document.querySelectorAll(".comp-item");

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;

        item.classList.add("show-item");

        const checkAreas = item.querySelectorAll(".check-area");

        checkAreas.forEach((area, areaIndex) => {
          setTimeout(
            () => {
              if (!area.querySelector("ion-icon")) {
                area.innerHTML =
                  '<ion-icon name="checkmark-circle"></ion-icon>';
              }

              setTimeout(() => {
                area.classList.add("active");
              }, 100);
            },
            600 + areaIndex * 300,
          );
        });

        observer.unobserve(item);
      }
    });
  }, observerOptions);

  listItems.forEach((item) => {
    itemObserver.observe(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const helpElements = document.querySelectorAll(
    ".help-header, .help-text-side, .help-visual-slide",
  );

  const generalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          generalObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  helpElements.forEach((el) => generalObserver.observe(el));

  const checklistItems = document.querySelectorAll(".help-checklist-area p");

  const listObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const span = entry.target.querySelector(".check-area");
          if (span) {
            if (!span.querySelector("ion-icon")) {
              span.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
            }
            span.classList.add("active");
          }
          listObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.9,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  checklistItems.forEach((item) => listObserver.observe(item));
});