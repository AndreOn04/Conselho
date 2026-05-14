(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
 
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize); resize();
 
  for (let i = 0; i < 60; i++) pts.push({
    x: Math.random()*1400, y: Math.random()*900,
    vx: (Math.random()-.5)*.3, vy: -(Math.random()*.4+.1),
    r: Math.random()*2.5+.8, a: Math.random()*.2+.04,
    p: Math.random()*Math.PI*2
  });
 
  (function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.p += .015; p.x += p.vx; p.y += p.vy;
      if (p.y < -8) { p.y = H+8; p.x = Math.random()*W; }
      if (p.x < -8) p.x = W+8;
      if (p.x > W+8) p.x = -8;
      const a = p.a + Math.sin(p.p)*.06;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(192,128,58,${a})`;
      ctx.fill();
    });
    for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if (d<100) {
        ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(192,128,58,${.05*(1-d/100)})`; ctx.lineWidth=.5; ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  })();
})();
 
/* ── 2. HERO ENTRADA ── */
(function () {
  ['.hero-law-badge','.hero-title','.hero-subtitle','.hero-nav'].forEach(s => {
    const el = document.querySelector(s);
    if (el) { el.style.opacity='1'; el.style.transform='none'; }
  });
  const cue = document.getElementById('scrollCue');
  if (cue) cue.style.opacity='1';
})();
 
/* ── 3. REVEAL POR SCROLL ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('up'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
 
  document.querySelectorAll('.reveal, .tl-item, .ct-card').forEach(el => {
    obs.observe(el);
  });
})();
 
/* ── 4. CONTADOR ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target, dur = 1400, step = 14;
      let cur = 0, total = Math.ceil(dur/step);
      const t = setInterval(() => {
        cur++;
        el.textContent = Math.round(target*(cur/total)).toLocaleString('pt-BR');
        if (cur >= total) { el.textContent = target.toLocaleString('pt-BR'); clearInterval(t); }
      }, step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-target]').forEach(n => obs.observe(n));
})();
 
/* ── 5. ACCORDION ── */
document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.acc-item');
    const body = item.querySelector('.acc-body');
    const isOpen = item.classList.contains('open');
 
    // fecha todos
    document.querySelectorAll('.acc-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.acc-body').style.maxHeight = '0';
      i.querySelector('.acc-trigger').setAttribute('aria-expanded','false');
    });
 
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded','true');
    }
  });
});
 
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('up');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    obs.observe(el);
  });
})();