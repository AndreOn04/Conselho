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

  if (btns.length > 0 && modal && modalText) {
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
  }

  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("on-visible");
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("on-visible");
    }
  });
});
// Animação Modal - Conselho na prática