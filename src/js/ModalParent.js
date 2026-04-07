/* --- SCRIPT PARA ACCORDION (ABRIR/FECHAR) --- */
document.addEventListener("click", function (event) {
  const header = event.target.closest(".block-header");

  if (!header) return;

  const body = header.nextElementSibling;

  header.classList.toggle("active");

  if (header.classList.contains("active")) {
    body.style.maxHeight = "1200px";
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

   132: "Art. 132. Em cada Município e em cada Região Administrativa do Distrito Federal haverá, no mínimo, 1 (um) Conselho Tutelar como órgão integrante da administração pública local, composto de \n\n" + " 5 (cinco) membros, escolhidos pela população local para mandato de \n\n" + " 4 (quatro) anos, permitida recondução por novos processos de escolha.",

   111: "Direitos sociais são os direitos que visam garantir aos indivíduos o exercício e usufruto de direitos fundamentais em condições de igualdade, para que tenham uma vida digna por meio da proteção e garantias dadas pelo estado de direito.",

   222: "Orçamento é a parte de um plano financeiro estratégico que compreende a previsão de receitas e despesas futuras para a administração de determinado exercício (período de tempo). \n\n" + " Aplica-se tanto ao setor governamental quanto ao privado, pessoa jurídica ou física."
};

const bancoConceitos = {
  "poder-executivo": {
    titulo: "Poder Executivo",
    texto: "No Brasil, uma prefeitura é a sede do poder executivo do município (semelhante à câmara municipal, em Portugal). Esta é comandada por um prefeito e dividida em secretarias de governo, como educação, saúde ou meio ambiente. O termo prefeitura também pode designar o prédio onde está instalada a sede do governo municipal, também chamado de paço municipal onde geralmente se localiza o gabinete do prefeito.",
    imagem: "../src/imagens/Prefeitura.jpg"
  },

  "legislativo": {
    titulo: "Poder Legislativo",
    texto: "Câmara municipal, no Brasil, é o órgão legislativo de cada um dos municípios, configurando-se como a assembleia de representantes dos seus cidadãos.",
    imagem: "../src/imagens/Palácio.jpg"
  }
}

document.addEventListener("click", function (e) {
  const triggerArtigo = e.target.closest(".trigger-artigo");
    const triggerConceito = e.target.closest(".trigger-conceito");

    const existingBallon = document.querySelector(".artigo-balloon");
    if (existingBallon) existingBallon.remove();

    if (triggerArtigo || triggerConceito) {
        const balloon = document.createElement("div");
        balloon.className = "artigo-balloon";
        
        if (triggerArtigo) {
            const id = triggerArtigo.getAttribute("data-id");
            balloon.innerText = bancoArtigos[id] || "Artigo não encontrado.";
        } 
        else if (triggerConceito) {
            const id = triggerConceito.getAttribute("data-id");
            const dado = bancoConceitos[id];
            if (dado) {
                balloon.classList.add("conceito-balao");
                balloon.innerHTML = `
                    <img src="${dado.imagem}" class="balao-imagem">
                    <div class="balao-info">
                        <h4>${dado.titulo}</h4>
                        <p>${dado.texto}</p>
                    </div>
                `;
            }
        }

        document.body.appendChild(balloon);
        
        const target = triggerArtigo || triggerConceito;
        const rect = target.getBoundingClientRect();
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

        balloon.style.left = rect.left + scrollX + "px";
        let topPos = rect.top + scrollY - balloon.offsetHeight - 12;
        
        if (topPos < scrollY) {
            topPos = rect.bottom + scrollY + 12;
            balloon.classList.add("balloon-bottom");
        }
        balloon.style.top = topPos + "px";

        requestAnimationFrame(() => {
            balloon.classList.add("show");
        });

        e.stopPropagation();
    }
});
