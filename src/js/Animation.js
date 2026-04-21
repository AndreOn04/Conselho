(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
 
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();
 
  function rand(a, b) { return a + Math.random() * (b - a); }
 
  for (let i = 0; i < 55; i++) {
    particles.push({
      x: rand(0, W), y: rand(0, H),
      r: rand(1, 3.5),
      vx: rand(-.25, .25), vy: rand(-.15, -.4),
      alpha: rand(.05, .25),
      pulse: rand(0, Math.PI * 2)
    });
  }
 
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.pulse += .018;
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = rand(0, W); }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W+10) p.x = -10;
 
      const a = p.alpha + Math.sin(p.pulse) * .08;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(192,128,58,${a})`;
      ctx.fill();
    });
 
    // linhas suaves entre partículas próximas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(192,128,58,${.06*(1-d/90)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
 
/* ── 2. HERO ENTRADA ── */
(function () {
  const items = ['.hero-eyebrow','.hero-title','.hero-subtitle','.hero-pills'];
  items.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
  });
 
  const cue = document.getElementById('scrollCue');
  if (cue) cue.style.opacity = '1';
})();
 
/* ── 3. INTERSECTION OBSERVER — reveal ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
 
  document.querySelectorAll(
    '.direito-item, .stat-item, .divider-quote, .divider-source'
  ).forEach(el => obs.observe(el));
})();
 
/* ── 4. COUNTER ANIMADO ── */
(function () {
  const nums = document.querySelectorAll('[data-target]');
 
  function animCount(el) {
    const target = +el.dataset.target;
    const dur = 1600;
    const step = 16;
    const total = Math.ceil(dur / step);
    let cur = 0;
 
    const t = setInterval(() => {
      cur++;
      const val = Math.round(target * (cur / total));
      el.textContent = val.toLocaleString('pt-BR');
      if (cur >= total) { el.textContent = target.toLocaleString('pt-BR'); clearInterval(t); }
    }, step);
  }
 
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .5 });
 
  nums.forEach(n => obs.observe(n));
})();
 
/* ── 5. ACCORDION DE ARTIGOS ── */
document.querySelectorAll('.artigo-item').forEach(item => {
  function toggle() {
    const open = item.classList.contains('open');
    // fecha todos do mesmo grupo
    item.closest('.artigos-list').querySelectorAll('.artigo-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  }
  item.addEventListener('click', toggle);
  item.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); toggle(); } });
});
 
/* ── 6. PARALLAX SUAVE NAS IMAGENS ── */
(function () {
  const visuals = document.querySelectorAll('.direito-visual img');
  let ticking = false;
 
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      visuals.forEach(img => {
        const rect = img.closest('.direito-visual').getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - window.innerHeight / 2) * 0.06;
        img.style.transform = `scale(1.08) translateY(${offset}px)`;
      });
      ticking = false;
    });
    ticking = true;
  });
})();