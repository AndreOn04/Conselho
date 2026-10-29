const SUPABASE_URL = "https://tekamtmjvfoloazfnzyz.supabase.co";
const SUPABASE_CHAVE = "sb_publishable_AqgDyDi8hr3LaBPCIbTHlw_9VU0oyOO";
const CONSELHO_DONO = 3; // 3º Conselho (CPA)
let enderecoAtual =
  "Rua Jornalista Caramuru de Campos Maciel, nº 4, quadra 19, bairro CPA II, Cuiabá/MT";

function soDigitos(texto) {
  return texto.replace(/\D/g, "");
}

async function carregarDados() {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/conselhos?id=eq.${CONSELHO_DONO}&select=telefones,emails,endereco,abre,fecha,whatsapp`,
      { headers: { apikey: SUPABASE_CHAVE } },
    );
    if (!resp.ok) {
      console.warn("[dados] Banco respondeu com erro:", resp.status);
      return;
    }
    const [conselho] = await resp.json();
    if (!conselho || !conselho.telefones.length || !conselho.emails.length) {
      console.warn("[dados] Resposta vazia ou incompleta, mantendo o HTML.");
      return;
    }

    const tel = conselho.telefones[0];
    const email = conselho.emails[0];
    if (conselho.endereco) enderecoAtual = conselho.endereco + ", Cuiabá/MT";

    if (conselho.abre && conselho.fecha) {
      const abre = conselho.abre.slice(0, 5); // "08:00"
      const fecha = conselho.fecha.slice(0, 5); // "18:00"
      window.horarioAtual = { abre, fecha };

      const fmt = (h) => h.replace(":", "h"); // "08:00"
      document.querySelectorAll('[data-info="horario"]').forEach((el) => {
        el.textContent = `${fmt(abre)} – ${fmt(fecha)}`;
      });
    }

    const zap = conselho.whatsapp ? soDigitos(conselho.whatsapp) : "";

    document.querySelectorAll('[data-info="whatsapp-link"]').forEach((el) => {
      if (zap) {
        el.href =
          "https://wa.me/55" +
          zap +
          "?text=" +
          encodeURIComponent(
            "Olá, gostaria de informações sobre o Conselho Tutelar.",
          );
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    document.querySelectorAll('[data-info="whatsapp"]').forEach((el) => {
      el.textContent = conselho.whatsapp || "";
    });

    document
      .querySelectorAll('[data-info="telefone"]')
      .forEach((el) => (el.textContent = tel));
    document
      .querySelectorAll('[data-info="telefone-link"]')
      .forEach((el) => (el.href = "tel:+55" + soDigitos(tel)));
    document
      .querySelectorAll('[data-info="email"]')
      .forEach((el) => (el.textContent = email));
    document
      .querySelectorAll('[data-info="email-link"]')
      .forEach((el) => (el.href = "mailto:" + email));

    // console.log("[dados] Carregado do banco:", tel, email);
  } catch (erro) {
    // console.warn("[dados] Falha ao falar com o banco, mantendo o HTML:", erro);
  }
}
carregarDados();
