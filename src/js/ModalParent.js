/* --- SCRIPT PARA ACCORDION (ABRIR/FECHAR) --- */
document.addEventListener("click", function (event) {
  const header = event.target.closest(".block-header");

  if (!header) return;

  const body = header.nextElementSibling;

  header.classList.toggle("active");

  if (header.classList.contains("active")) {
    body.style.maxHeight = "1200px"; // Valor fixo alto o suficiente
    body.style.opacity = "1";
    body.style.padding = "30px";
  } else {
    body.style.maxHeight = "0";
    body.style.opacity = "0";
    body.style.padding = "0 30px";
  }
});
/* --- FIM SCRIPT PARA ACCORDION (ABRIR/FECHAR) --- */

const bancoArtigos = {
  249:
    "Art. 249. Descumprir, dolosa ou culposamente, os deveres inerentes ao pátrio poder poder familiar ou decorrente de tutela ou guarda, bem assim determinação da autoridade judiciária ou Conselho Tutelar: \n\n" +
    "Pena - multa de três a vinte salários de referência, aplicando-se o dobro em caso de reincidência.",

  129:
    "Art. 129. São medidas aplicáveis aos pais ou responsável: \n\n" +
    "I - encaminhamento a serviços e programas oficiais ou comunitários de proteção, apoio e promoção da família; (Redação dada dada pela Lei nº 13.257, de 2016)",

  "244B":
    "Art. 244-B. Corromper ou facilitar a corrupção de menor de 18 (dezoito) anos, com ele praticando infração penal ou induzindo-o a praticá-la: (Incluído pela Lei nº 12.015, de 2009) \n\n" +
    "Pena - reclusão, de 1 (um) a 4 (quatro) anos. (Incluído pela Lei nº 12.015, de 2009)",
};

document.addEventListener("click", function (e) {
  const trigger = e.target.closest(".trigger-artigo");

  const existingBallon = document.querySelector(".artigo-balloon");
  if (existingBallon) existingBallon.remove();

  if (trigger) {
    const id = trigger.getAttribute("data-id");
    const texto = bancoArtigos[id] || "Artigo não encontrado.";

    if (texto) {
      const balloon = document.createElement("div");
      balloon.className = "artigo-balloon";
      balloon.innerText = texto;
      document.body.appendChild(balloon);

      const rect = trigger.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

      balloon.style.left = rect.left + scrollX + "px";
      balloon.style.top = rect.top + scrollY - balloon.offsetHeight - 12 + "px";
      let topPos = rect.top + scrollY - balloon.offsetHeight - 12;
      if (topPos < scrollY) {
        balloon.style.top = rect.bottom + scrollY + 12;
        balloon.classList.add("balloon-bottom");
      }

      balloon.style.top = topPos + "px";

      requestAnimationFrame(() => {
        balloon.classList.add("show");
      });
    }

    e.stopPropagation();
  }
});
