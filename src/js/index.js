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

// ProgressBar
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / height) * 100;

  progressBar.style.width = progress + "%";
});

// ProgressBar

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

  if (aboutSection) {
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
  const infoCol = document.querySelector(".reveal-bottom");
  const formCol = document.querySelector(".reveal-right");

  setTimeout(() => {
    if (infoCol) infoCol.classList.add("active-reveal");

    setTimeout(() => {
      if (formCol) formCol.classList.add("active-reveal");
    }, 200);
  }, 100);
});
// Animação Página Contato

/* FAQ Section */
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((allItems) => {
        allItems.classList.remove("active");
      });
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
/* FAQ Section */

// Animaçao School
document.addEventListener("DOMContentLoaded", () => {
  const secaoSchool = document.querySelector("#school");
  const numero2 = document.querySelector(".n2");

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
      colors: [
        "#ff0000",
        "#ffa500",
        "#ffff00",
        "#008000",
        "#0000ff",
        "#4b0082",
        "#ee82ee",
      ],
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispararNoElemento(numero2);
          observer.unobserve(secaoSchool);
        }
      });
    },
    { threshold: 0.5 },
  );

  if (secaoSchool) observer.observe(secaoSchool);

  if (numero2) {
    numero2.style.cursor = "pointer";
    numero2.addEventListener("mouseenter", () => {
      dispararNoElemento(numero2);
    });
  }
});
// Animaçao School

// Animação Modal - Conselho na prática
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal-overlay");
  const modalText = document.getElementById("modalText");
  const btns = document.querySelectorAll(".btn-law-modal");
  const closeBtn = document.querySelector(".close-modal");

  const lawData = {
    "136-1":
      "Art. 136. I - atender, aconselhar e encaminhar à rede de serviços públicos ou privados, crianças e adolescentes que se encontrem em situação de risco pessoal ou social;",

    "136-2":
      "Art. 136. II - Compete ao Conselho Tutelar: aplicar medidas de proteção, nas hipóteses previstas nos arts. 98 e 101, inclusive: \n\n" +
      "a) matricular os menores em estabelecimentos de ensino; \n\n" +
      "b) encaminhá-los para tratamento médico, psicológico, psiquiátrico ou hospitalar;",

    "136-3":
      "Art. 136. III - promover a execução de suas decisões, podendo: \n\n" +
      "a) requisitar serviços públicos nas áreas de saúde, educação, serviço social, previdência, trabalho e segurança; \n\n" +
      "b) representar junto à autoridade judiciária nos casos de descumprimento injustificado de suas deliberações.",

    "136-4":
      "Art. 136. IV - São atribuições do Conselho Tutelar: \n\n" +
      "encaminhar ao Ministério Público notícia de fato que constitua infração administrativa ou penal contra os direitos da criança ou adolescente;",

    "136-5":
      "Art. 136. V - fiscalizar entidades governamentais ou não, públicas ou privadas, que executem programas de acolhimento institucional, visando à garantia dos direitos de crianças e adolescentes. ",
  };

  btns.forEach((btn) => {
    btn.onclick = function () {
      const artKey = this.getAttribute("data-art");
      console.log("Botão clicado! Artigo:", artKey);

      if (lawData[artKey]) {
        modalText.innerText = lawData[artKey];
        modal.classList.add("on-visible");
      }
    };
  });

  const closeModal = () => modal.classList.remove("on-visible");

  closeBtn.onclick = closeModal;

  modal.onclick = function (e) {
    if (e.target === modal) closeModal();
  };
});
// Animação Modal - Conselho na prática
