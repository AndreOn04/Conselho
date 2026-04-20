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

//Atributo O que NÃO compete ao conselho - Cards
const bancoDeDadosVedacoes = {
    policia: "Não pode prender, deter ou conduzir pessoas coercitivamente. Em situações de crime ou risco imediato, deve acionar a polícia. Base legal: atribuições definidas no art. 136 do ECA.",
    penalidades: "Sua função é garantir direitos e aplicar medidas de proteção, e não penalizar condutas. Base legal: arts. 101 e 136 do ECA.",
    guarda: "O Conselho atua no encaminhamento e acompanhamento dos casos, sem poder decisório final. Base legal: arts. 28 a 52 e 148 do ECA.",
    afastar: "Não é uma decisão arbitrária. Base legal: arts. 101, § único, e 136, I, do ECA.",
    house: "Essa proteção é garantida constitucionalmente, salvo exceções legais específicas. Base legal: art. 5º, XI, da Constituição Federal.",
    info: "A exposição indevida pode gerar responsabilização administrativa, civil e penal. Base legal: princípios do ECA e dever funcional aplicado à proteção da criança e do adolescente."
};

document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-toggle-extra');

    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const card = this.closest('.vedacao-item');
            const id = card.getAttribute('data-id');
            const extraContainer = card.querySelector('.conteudo-extra');
            
            if (extraContainer.innerHTML === "") {
                extraContainer.innerHTML = `<p>${bancoDeDadosVedacoes[id]}</p>`;
            }
            const estaAtivo = extraContainer.classList.toggle('active');
            
            this.textContent = estaAtivo ? 'Ler menos' : 'Ler mais';
        });
    });
});
//Atributo O que NÃO compete ao conselho - Cards