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