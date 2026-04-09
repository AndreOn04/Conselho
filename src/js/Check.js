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
        if(entry.isIntersecting) {
          const span = entry.target.querySelector(".check-area");
          if(span) {
            if(!span.querySelector("ion-icon")) {
              span.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
            } 
            span.classList.add("active");
          }
          listObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  )
  checklistItems.forEach((item) => listObserver.observe(item));
});
// Animação CheckLists