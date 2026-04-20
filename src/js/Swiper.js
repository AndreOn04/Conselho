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