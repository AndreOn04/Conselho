/* ── 1. STATUS DE FUNCIONAMENTO ── */
(function () {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const open = hour >= 8 && hour < 17;
  const week = day >= 1 && day <= 5;
  const isOpen = week && open;

  const dotIds = ["dotSeg", "dotTer", "dotQua", "dotQui", "dotSex"];
  const todayIndex = day - 1;

  dotIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (i === todayIndex) {
      el.style.background = isOpen ? "#22c55e" : "#ef4444";
      el.title = isOpen ? "Aberto agora" : "Fechado agora";
    } else {
      el.style.background = "#d1d5db";
    }
  });

  const banner = document.getElementById("statusBanner");
  if (!banner) return;
  if (isOpen) {
    banner.innerHTML = '<span style="color:#22c55e;">● Aberto agora</span> — Encerra às 17h00.';
  } else if (week) {
    banner.innerHTML = '<span style="color:#ef4444;">● Fechado no momento</span> — Abre às 08h00 nos dias úteis.';
  } else {
    banner.innerHTML = '<span style="color:#ef4444;">● Fechado</span> — Retomamos na segunda-feira às 08h00.';
  }
})();

/* ── 2. COPIAR ENDEREÇO ── */
const copyAddressEl = document.getElementById("copyAddress");
if (copyAddressEl) {
  copyAddressEl.addEventListener("click", function () {
    const address = "Rua das Acácias, 245 — Centro, Município/MT, CEP 78.000-000";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(showToast);
    } else {
      const ta = document.createElement("textarea");
      ta.value = address;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast();
    }
  });
}

function showToast() {
  const t = document.getElementById("toast");
  if (!t) return;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

/* ── 3. INTERSECTION OBSERVER ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = "running";
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".contact-card, .info-block").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

/* ══════════════════════════════════════════
   LOCALIZADOR — Conselhos Tutelares Cuiabá
══════════════════════════════════════════ */
const CONSELHOS = [
  {
    id: 0,
    nome: "Conselho Tutelar Plantão",
    numero: "🌙",
    plantao: true,
    endereco: "Av. Getúlio Vargas, nº 997, bairro Centro",
    telefones: ["(65) 99206-6741"],
    email: "conselhotutelarplantaocuiaba@gmail.com",
    horario: "18h às 08h (plantão noturno)",
    bairros: ["centro", "centro sul", "todos", "plantão", "emergência", "urgência", "noturno"],
    mapsQuery: "Av.+Getúlio+Vargas+997+Centro+Cuiabá+MT",
  },
  {
    id: 1,
    nome: "1º Conselho Tutelar",
    regiao: "Centro Sul",
    numero: "01",
    plantao: false,
    endereco: "Av. Getúlio Vargas, nº 997, bairro Centro Sul",
    telefones: ["(65) 3317-6733", "(65) 99217-7873"],
    email: "ct.centro2@gmail.com",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["centro", "centro sul", "praeiro", "goiabeiras", "lixeira", "areão", "santa helena", "porto", "bandeirantes"],
    mapsQuery: "Av.+Getúlio+Vargas+997+Centro+Sul+Cuiabá+MT",
  },
  {
    id: 2,
    nome: "2º Conselho Tutelar",
    regiao: "Pedra 90",
    numero: "02",
    plantao: false,
    endereco: "Av. Nilton Rabelo de Castro — Pedra 90 (Anexo ao CRAS Pedra 90)",
    telefones: ["(65) 3617-1950", "(65) 99244-8766"],
    email: "ct.pedra90@cuiaba.mt.gov.br",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["pedra 90", "pedra90", "grande terceiro", "pascoal ramos", "novo terceiro", "osmar cabral", "sul"],
    mapsQuery: "Av.+Nilton+Rabelo+de+Castro+Pedra+90+Cuiabá+MT",
  },
  {
    id: 3,
    nome: "3º Conselho Tutelar",
    regiao: "CPA",
    numero: "03",
    plantao: false,
    endereco: "Rua Jornalista Caramuru de Campos Maciel, nº 4, quadra 19, bairro CPA II",
    telefones: ["(65) 3616-6872", "(65) 99215-5608"],
    email: "ct.cpa@cuiaba.mt.gov.br",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["cpa", "cpa i", "cpa ii", "cpa iii", "cpa iv", "morada do ouro", "plano diretor", "novo horizonte", "parque cuiabá"],
    mapsQuery: "Rua+Jornalista+Caramuru+de+Campos+Maciel+4+CPA+II+Cuiabá+MT",
  },
  {
    id: 4,
    nome: "4º Conselho Tutelar",
    regiao: "Cidade Alta",
    numero: "04",
    plantao: false,
    endereco: "Rua Maurício Cardoso, nº 744, Cidade Alta",
    telefones: ["(65) 3617-1405", "(65) 99238-6890"],
    email: "ct.santaizabel@cuiaba.mt.gov.br",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["cidade alta", "santa isabel", "santa izabel", "jardim florianópolis", "alvorada", "santa marta", "dom aquino", "grande cidade alta"],
    mapsQuery: "Rua+Maurício+Cardoso+744+Cidade+Alta+Cuiabá+MT",
  },
  {
    id: 5,
    nome: "5º Conselho Tutelar",
    regiao: "Coxipó",
    numero: "05",
    plantao: false,
    endereco: "Rua Antônio Dorileo, nº 116, Coophema",
    telefones: ["(65) 3313-3155", "(65) 99209-7377"],
    email: "ct.coxipo@cuiaba.mt.gov.br",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["coxipó", "coophema", "coxipó da ponte", "coxipó do ouro", "jardim das américas", "rio médio", "nova esperança", "recanto dos pássaros"],
    mapsQuery: "Rua+Antônio+Dorileo+116+Coophema+Cuiabá+MT",
  },
  {
    id: 6,
    nome: "6º Conselho Tutelar",
    regiao: "Planalto",
    numero: "06",
    plantao: false,
    endereco: "Av. Parecis, nº 168, bairro Planalto",
    telefones: ["(65) 3617-1712", "(65) 99209-7377"],
    email: "ct.planalto@cuiaba.mt.gov.br",
    horario: "Segunda a Sexta, 08h às 18h",
    bairros: ["planalto", "grande planalto", "jardim leblon", "pico do amor", "jardim paulista", "verdão", "quilombo", "jardim imperial", "residencial"],
    mapsQuery: "Av.+Parecis+168+Planalto+Cuiabá+MT",
  },
];

/* ── normaliza texto ── */
function norm(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/* ── busca ── */
function buscar(termo) {
  if (!termo) return [];
  const t = norm(termo);
  const exatos = [], parciais = [];
  CONSELHOS.forEach((c) => {
    const match = c.bairros.some((b) => {
      const bn = norm(b);
      if (bn === t) return true;
      if (bn.includes(t) || t.includes(bn)) { parciais.push(c); return false; }
      return false;
    });
    if (match) exatos.push(c);
  });
  const vistos = new Set();
  return [...exatos, ...parciais].filter((c) => (vistos.has(c.id) ? false : vistos.add(c.id)));
}

/* ── autocomplete ── */
const TODOS_BAIRROS = [
  ...new Set(CONSELHOS.flatMap((c) => c.bairros).map((b) => b.toLowerCase())),
].sort();

/* ── renderiza card ── */
function renderCard(conselho, termoBusca) {
  const card = document.createElement("div");
  card.className = `ct-card${conselho.plantao ? " plantao" : ""}`;
  card.style.animationDelay = `${conselho.id * 0.06}s`;

  const badgeText = conselho.plantao ? "🔴 Plantão Noturno" : `${conselho.numero}ª Unidade`;
  const badgeClass = conselho.plantao ? "card-badge plantao-badge" : "card-badge";

  const tels = conselho.telefones
    .map((t) => `<a href="tel:${t.replace(/\D/g, "")}">${t}</a>`)
    .join(" &nbsp;·&nbsp; ");

  const tn = norm(termoBusca || "");
  const bairrosTags = conselho.bairros
    .filter((b) => !["todos", "plantão", "urgência", "emergência", "noturno"].includes(b))
    .slice(0, 6)
    .map((b) => {
      const bn = norm(b);
      const isMatch = tn && (bn.includes(tn) || tn.includes(bn));
      return `<span class="tag-bairro${isMatch ? " match" : ""}">${b}</span>`;
    })
    .join("");

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${conselho.mapsQuery}`;

  card.innerHTML = `
    <div class="card-num" aria-hidden="true">${conselho.numero}</div>
    <div class="card-top">
      <div class="card-name">
        ${conselho.nome}
        ${conselho.regiao ? `<br><small style="font-weight:400;color:var(--muted);font-size:.82rem;">${conselho.regiao}</small>` : ""}
      </div>
      <span class="${badgeClass}">${badgeText}</span>
    </div>
    <div class="card-rows">
      <div class="card-row">
        <span class="row-icon">📍</span>
        <div><strong>Endereço</strong>${conselho.endereco}</div>
      </div>
      <div class="card-row">
        <span class="row-icon">📞</span>
        <div><strong>Telefone</strong>${tels}</div>
      </div>
      <div class="card-row">
        <span class="row-icon">✉️</span>
        <div><strong>E-mail</strong><a href="mailto:${conselho.email}">${conselho.email}</a></div>
      </div>
    </div>
    ${bairrosTags ? `<div class="bairros-wrap">${bairrosTags}</div>` : ""}
    <div class="card-actions">
      <a class="btn-map accent" href="${mapsUrl}" target="_blank" rel="noopener">🗺️ Ver no mapa</a>
      <a class="btn-tel" href="tel:${conselho.telefones[0].replace(/\D/g, "")}">📞 Ligar agora</a>
    </div>
  `;
  return card;
}

/* ── mostra resultados ── */
function mostrarResultados(lista, termo) {
  const stateEmpty    = document.getElementById("stateEmpty");
  const stateResults  = document.getElementById("stateResults");
  const stateNotFound = document.getElementById("stateNotFound");
  const cardsGrid     = document.getElementById("cardsGrid");
  const resultLabel   = document.getElementById("resultLabel");
  const resultCount   = document.getElementById("resultCount");

  if (!stateEmpty) return; // localizador não está nesta página

  stateEmpty.hidden = true;
  stateNotFound.hidden = true;

  if (lista.length === 0) {
    stateResults.hidden = true;
    stateNotFound.hidden = false;
    return;
  }

  stateResults.hidden = false;
  cardsGrid.innerHTML = "";

  resultLabel.textContent = termo ? `Conselhos que atendem "${termo}"` : "Todos os Conselhos Tutelares";
  resultCount.textContent = `${lista.length} unidade${lista.length > 1 ? "s" : ""} encontrada${lista.length > 1 ? "s" : ""}`;

  lista.forEach((c) => cardsGrid.appendChild(renderCard(c, termo)));
}

/* ── limpar ── */
function limpar() {
  const searchInput = document.getElementById("searchInput");
  const suggestion  = document.getElementById("suggestion");
  if (searchInput) searchInput.value = "";
  if (suggestion)  suggestion.hidden = true;
  document.getElementById("stateEmpty").hidden    = false;
  document.getElementById("stateResults").hidden  = true;
  document.getElementById("stateNotFound").hidden = true;
}

/* ── inicializa localizador apenas se o HTML existir ── */
const searchInput = document.getElementById("searchInput");
const sugBox      = document.getElementById("suggestion"); // <-- id corrigido

if (searchInput && sugBox) {

  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim();
    if (!val) { sugBox.hidden = true; return; }

    const vn = norm(val);
    const matches = TODOS_BAIRROS.filter((b) => b.includes(vn)).slice(0, 8);

    if (!matches.length) { sugBox.hidden = true; return; }

    sugBox.innerHTML = "";
    matches.forEach((b) => {
      const c = CONSELHOS.find((ct) => ct.bairros.some((cb) => norm(cb) === norm(b)));
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.innerHTML = `
        <span>${b.charAt(0).toUpperCase() + b.slice(1)}</span>
        ${c ? `<span class="sug-badge">${c.nome.replace("Conselho Tutelar", "CT")}</span>` : ""}
      `;
      item.addEventListener("click", () => {
        searchInput.value = b;
        sugBox.hidden = true;
        mostrarResultados(buscar(b), b);
      });
      sugBox.appendChild(item);
    });
    sugBox.hidden = false;
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sugBox.hidden = true;
      mostrarResultados(buscar(searchInput.value.trim()), searchInput.value.trim());
    }
    if (e.key === "Escape") sugBox.hidden = true;
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapCba")) sugBox.hidden = true;
  });

  /* botões — usando os IDs do seu HTML */
  document.getElementById("btnVerAll").addEventListener("click", () => {
    searchInput.value = "";
    sugBox.hidden = true;
    mostrarResultados(CONSELHOS, "");
  });

  document.getElementById("btnClear").addEventListener("click", limpar);

  document.getElementById("btnVerTodosNF").addEventListener("click", () => {
    searchInput.value = "";
    mostrarResultados(CONSELHOS, "");
  });
}