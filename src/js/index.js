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

// Dark Mode
const chk = document.getElementById("chk");
const body = document.body;

if (chk) {
  chk.addEventListener("change", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  if (chk) chk.checked = true;
}

function toggleSettingsMenu() {
  const menu = document.getElementById("fabMenu");
  const btn = document.querySelector(".fab-main-btn ion-icon");

  if (!menu || !btn) return;

  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    btn.style.transform = "rotate(90deg)";
  } else {
    btn.style.transform = "rotate(0deg)";
  }
}

// Fechar menu ao clicar fora
function toggleSettingsMenu() {
  const menu = document.getElementById("fabMenu");
  const btnIcon = document.querySelector(".fab-main-btn ion-icon");

  if (!menu || !btnIcon) return;

  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    btnIcon.style.transform = "rotate(90deg)";
  } else {
    btnIcon.style.transform = "rotate(0deg)";
  }
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("fabMenu");
  const settingsBtn = document.getElementById("settingsFab");

  if (!menu || !settingsBtn) return;

  if (!settingsBtn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("active");

    const icon = settingsBtn.querySelector("ion-icon");
    if (icon) icon.style.transform = "rotate(0deg)";
  }
});

// ProgressBar
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  if (progressBar) {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;

    progressBar.style.width = progress + "%";
  }
});
// ProgressBar

// Responsividade - Hanburguer - Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  // Menu Hamburguer
  if (menuIcon && navMenu ) {
    menuIcon.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      
      const barsIcon = menuIcon.querySelector(".fa-bars-staggered");
      const closeIcon = menuIcon.querySelector(".icon-close");

      if (navMenu.classList.contains("active")) {
        barsIcon.style.display = "none";
        closeIcon.style.display = "block";
      } else {
        barsIcon.style.display = "block";
        closeIcon.style.display = "none";
      }
    });
  }
  // Menu Hamburguer

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

// Swiper - Slider
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: false,
    speed: 600,
    grabCursor: true,
    allowTouchMove: true,

    effect: "slide",

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
  });

  function startAnimationSlide() {
    setInterval(() => {
      if (swiper && !swiper.isEnd && !swiper.animating) {
        const nudgeAmount = swiper.width * 0.3;
        const currentTranslate = swiper.translate;

        swiper.setTransition(800);
        swiper.setTranslate(currentTranslate - nudgeAmount);

        setTimeout(() => {
          swiper.setTransition(600);
          swiper.setTranslate(currentTranslate);

          setTimeout(() => swiper.updateProgress(), 600);
        }, 1000);
      }
    }, 7000);
  }

  startAnimationSlide();
});
// Swiper - Slider

// Settings - Configurações
const configManager = {
    fonts: [
        { name: 'Inter', val: "'Inter', sans-serif" },
        { name: 'Poppins', val: "'Poppins', sans-serif" },
        { name: 'Montserrat', val: "'Montserrat', sans-serif" },
        { name: 'Roboto', val: "'Roboto', sans-serif" },
        { name: 'Open Sans', val: "'Open Sans', sans-serif" },
        { name: 'Playfair Display', val: "'Playfair Display', serif" },
        { name: 'Lato', val: "'Lato', sans-serif" },
        { name: 'Oswald', val: "'Oswald', sans-serif" }
    ],
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
};

function initSettings() {
    const familyArea = document.getElementById('font-family-options');
    const weightArea = document.getElementById('font-weight-options');

    const savedFont = localStorage.getItem('preferredFont');
    const savedWeight = localStorage.getItem('preferredWeight');

    if(savedFont) {
      document.documentElement.style.setProperty('--font-main', savedFont);
      document.body.style.fontFamily = savedFont;
    }

    if(savedWeight) {
      document.documentElement.style.setProperty('--weight-main', savedWeight);
      document.body.style.fontWeight = savedWeight;
    }

    // Renderizar Fontes
    configManager.fonts.forEach(f => {
        const b = document.createElement('button');
        b.textContent = f.name;
        b.style.fontFamily = f.val;

        if(localStorage.getItem('preferredFont') === f.val) {
          b.classList.add('active');
        }
        
        b.onclick = () => {
            familyArea.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');

            localStorage.setItem('preferredFont', f.val);
          
            document.documentElement.style.setProperty('--font-main', f.val);
            document.body.style.fontFamily = f.val;
        };
        familyArea.appendChild(b);
    });
    
    configManager.weights.forEach(w => {
        const b = document.createElement('button');
        b.textContent = w;
        if(savedWeight == w) b.classList.add('active');

        if(localStorage.getItem('preferredWeight') == w) {
          b.classList.add('active');
        }
        
        b.onclick = () => {
            
            weightArea.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');

            localStorage.setItem('preferredWeight', w);
            
            document.documentElement.style.setProperty('--weight-main', w);
            document.body.style.fontWeight = w;
        };
        weightArea.appendChild(b);
        if(savedFont) document.body.style.fontFamily = savedFont;
    });
}

document.addEventListener("DOMContentLoaded", initSettings);

// Settings - Configurações
