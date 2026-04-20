(function () {
  const now = new Date();
  const day = now.getDay(); // 0=Dom … 6=Sáb
  const hour = now.getHours();
  const open = hour >= 8 && hour < 17;
  const week = day >= 1 && day <= 5;
  const isOpen = week && open;

  const dotIds = ["dotSeg", "dotTer", "dotQua", "dotQui", "dotSex"];
  const todayIndex = day - 1; // seg=0 … sex=4

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
  if (isOpen) {
    banner.innerHTML =
      '<span style="color:#22c55e;">● Aberto agora</span> — Encerra às 17h00.';
  } else if (week) {
    banner.innerHTML =
      '<span style="color:#ef4444;">● Fechado no momento</span> — Abre às 08h00 nos dias úteis.';
  } else {
    banner.innerHTML =
      '<span style="color:#ef4444;">● Fechado</span> — Retomamos na segunda-feira às 08h00.';
  }
})();

/* ── 2. COPIAR ENDEREÇO ── */
document.getElementById("copyAddress").addEventListener("click", function () {
  const address = "Rua das Acácias, 245 — Centro, Município/MT, CEP 78.000-000";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(address).then(showToast);
  } else {
    // fallback para navegadores antigos
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

function showToast() {
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

/* ── 3. INTERSECTION OBSERVER (animação ao scrollar) ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = "running";
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".contact-card, .info-block").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});
