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
// Dropdown

// Responsividade - Hanburguer - Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  // Menu Hamburguer
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = menuIcon.querySelector("ion-icon");
      if (icon) {
        const isOpened = navMenu.classList.contains("active");
        icon.setAttribute("name", isOpened ? "close-outline" : "menu-outline");
      }
    });
  }

  dropdowns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = btn.parentElement.querySelector(".submenu");

        document.querySelectorAll(".submenu").forEach((m) => {
          if (m !== submenu) m.classList.remove("active");
        });

        submenu.classList.toggle("active");
      }
    });
  });
});
// Responsividade - Hanburguer - Menu

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

  if(aboutSection) {
    observer.observe(aboutSection);
  }
});
// Animações HERO

// Animação Composição conselho
document.addEventListener("DOMContentLoaded", () => {
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
// Animação Composição conselho

// Animação CheckLists
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
// Animação CheckLists

// Animação Página Contato
document.addEventListener("DOMContentLoaded", () => {

  const infoCol = document.querySelector('.reveal-bottom');
  const formCol = document.querySelector('.reveal-right');

  setTimeout(() => {
    if(infoCol) infoCol.classList.add('active-reveal');

    setTimeout(() => {
      if(formCol) formCol.classList.add('active-reveal');
    }, 200);
  }, 100);
});
// Animação Página Contato

/* FAQ Section */
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(allItems => {
        allItems.classList.remove('active');
      });
      if(!isActive) {
        item.classList.add('active');
      }
    })
  })
})
/* FAQ Section */


// Animaçao School 
document.addEventListener("DOMContentLoaded", () => {
    const secaoSchool = document.querySelector('#school');
    const numero2 = document.querySelector('.n2');

    const dispararNoElemento = (elemento) => {
        if (!elemento) return;

        const rect = elemento.getBoundingClientRect();
        
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: x, y: y }, 
            zIndex: 1,
            colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dispararNoElemento(numero2); 
                observer.unobserve(secaoSchool);
            }
        });
    }, { threshold: 0.5 });

    if (secaoSchool) observer.observe(secaoSchool);

    if (numero2) {
        numero2.style.cursor = 'pointer';
        numero2.addEventListener('mouseenter', () => {
            dispararNoElemento(numero2);
        });
    }
});
// Animaçao School 