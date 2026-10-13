const SUPABASE_URL = "https://tekamtmjvfoloazfnzyz.supabase.co";
const SUPABASE_CHAVE = "sb_publishable_AqgDyDi8hr3LaBPCIbTHlw_9VU0oyOO";
const CONSELHO_DONO = 3; // 3º Conselho (CPA)

function soDigitos(texto) {
  return texto.replace(/\D/g, "");
}

async function carregarDados() {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/conselhos?id=eq.${CONSELHO_DONO}&select=telefones,emails`,
      { headers: { apikey: SUPABASE_CHAVE } }
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

    document.querySelectorAll('[data-info="telefone"]').forEach((el) => (el.textContent = tel));
    document.querySelectorAll('[data-info="telefone-link"]').forEach((el) => (el.href = "tel:+55" + soDigitos(tel)));
    document.querySelectorAll('[data-info="email"]').forEach((el) => (el.textContent = email));
    document.querySelectorAll('[data-info="email-link"]').forEach((el) => (el.href = "mailto:" + email));

    console.log("[dados] Carregado do banco:", tel, email);
  } catch (erro) {
    console.warn("[dados] Falha ao falar com o banco, mantendo o HTML:", erro);
  }
}

carregarDados();