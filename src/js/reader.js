(function () {

  const READABLE_SELECTORS = [
    ".about-section .swiper-slide",
    ".composition-section .comp-item",
    ".help-section .help-summary-paragraphs",
    ".help-section .help-checklist-area",
    ".faq-section .faq-item",
  ];

  const SPEEDS = [0.85, 1, 1.2, 1.45];
  const SPEED_LABELS = ["0.85×", "1×", "1.2×", "1.45×"];

  let utterance = null;
  let isPlaying = false;
  let isPaused = false;
  let speedIndex = 1;
  let fullText = "";
  let chunks = [];
  let currentChunkIndex = 0;
  let currentCharOffset = 0;
  let progressKey = "readerProgress";

  function extractText() {
    const parts = [];
    READABLE_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const clone = el.cloneNode(true);
        clone
          .querySelectorAll("ion-icon, img, button, .icon, .image, .number")
          .forEach((n) => n.remove());

        let text = clone.innerText.replace(/\s+/g, " ").trim();
        if (text.length > 15) parts.push(text);
      });
    });
    return parts.join(".\n\n");
  }

  function splitIntoChunks(text) {
    return text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
  }

  function saveProgress() {
    const read = chunks.slice(0, currentChunkIndex).join("").length + (currentCharOffset || 0);
    localStorage.setItem(progressKey, JSON.stringify({ charIndex: read }));
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(progressKey))?.charIndex || 0;
    } catch {
      return 0;
    }
  }

  function clearProgress() {
    localStorage.removeItem(progressKey);
  }

  function startReading() {
    if (!("speechSynthesis" in window)) return alert("Navegador não suporta.");

    if (isPaused) {
      window.speechSynthesis.resume();
      isPaused = false;
      isPlaying = true;
      updateUI();
      return;
    }

    window.speechSynthesis.cancel();
    fullText = extractText();
    if (!fullText) return;

    chunks = splitIntoChunks(fullText);
    const savedPos = loadProgress();

    let acc = 0;
    currentChunkIndex = 0;
    currentCharOffset = 0;

    for (let i = 0; i < chunks.length; i++) {
      if (acc + chunks[i].length >= savedPos) {
        currentChunkIndex = i;
        currentCharOffset = savedPos - acc;
        break;
      }
      acc += chunks[i].length;
    }

    speakNextChunk();
  }

  function speakNextChunk() {
    if (currentChunkIndex >= chunks.length) {
      finishReading();
      return;
    }

    const text = chunks[currentChunkIndex].slice(currentCharOffset || 0);

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = SPEEDS[speedIndex];
    utterance.pitch = 1.05;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    const bestVoice = voices.find((v) => v.name.includes("Google") && v.lang === "pt-BR") ||
                     voices.find((v) => v.lang.startsWith("pt-BR")) ||
                     voices.find((v) => v.lang.startsWith("pt"));

    if (bestVoice) utterance.voice = bestVoice;

    utterance.onend = () => {
      currentCharOffset = 0;
      currentChunkIndex++;
      saveProgress();
      setTimeout(speakNextChunk, 160);
    };

    utterance.onerror = () => {
      isPlaying = false;
      isPaused = false;
      updateUI();
    };

    window.speechSynthesis.speak(utterance);
    isPlaying = true;
    isPaused = false;
    updateUI();
  }

  function finishReading() {
    isPlaying = false;
    isPaused = false;
    clearProgress();
    updateUI();
    updateProgress(100);
  }

  function pauseReading() {
    window.speechSynthesis.pause();
    isPaused = true;
    isPlaying = false;
    saveProgress();
    updateUI();
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    isPlaying = false;
    isPaused = false;
    clearProgress();
    currentChunkIndex = 0;
    currentCharOffset = 0;
    updateUI();
    updateProgress(0);
  }

  function cycleSpeed() {
    speedIndex = (speedIndex + 1) % SPEEDS.length;
    const speedBtn = document.getElementById("reader-speed");
    if (speedBtn) speedBtn.textContent = SPEED_LABELS[speedIndex];

    if (!isPlaying) return;

    saveProgress();
    window.speechSynthesis.cancel();

    setTimeout(() => {
      if (isPlaying) speakNextChunk();
    }, 25);
  }

  function updateProgress(pct) {
    const bar = document.getElementById("reader-progress-fill");
    const label = document.getElementById("reader-pct");
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = pct + "%";
  }

  function updateGlobalProgress() {
    if (!fullText) return;
    const read = chunks.slice(0, currentChunkIndex).join("").length + (currentCharOffset || 0);
    const pct = Math.round((read / fullText.length) * 100);
    updateProgress(Math.min(100, pct));
  }

  function updateUI() {
    const btnPlay = document.getElementById("reader-play");
    const btnPause = document.getElementById("reader-pause");
    const btnStop = document.getElementById("reader-stop");
    const status = document.getElementById("reader-status");

    if (!btnPlay) return;

    if (isPlaying) {
      btnPlay.style.display = "none";
      btnPause.style.display = "flex";
      btnStop.style.display = "flex";
      status.textContent = "Lendo...";
      status.style.color = "#22c55e";
    } else if (isPaused) {
      btnPlay.style.display = "flex";
      btnPause.style.display = "none";
      btnStop.style.display = "flex";
      status.textContent = "Pausado";
      status.style.color = "#e0a455";
    } else {
      btnPlay.style.display = "flex";
      btnPause.style.display = "none";
      btnStop.style.display = "none";
      status.textContent = "Parado";
      status.style.color = "rgba(255,255,255,.35)";
    }
  }

  function togglePlayer() {
    const panel = document.getElementById("reader-panel");
    const fab = document.getElementById("reader-fab-btn");
    const open = panel.classList.toggle("open");
    fab.setAttribute("aria-expanded", open);
  }

  function injectPlayer() {
    const css = `
      #reader-fab { position: fixed; bottom: 160px; left: 20px; z-index: 9998; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
      #reader-fab-btn {
        width: 56px; height: 56px; border-radius: 50%; background: #0d1f3c; border: 2px solid #c0803a;
        color: #e0a455; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center;
        justify-content: center; box-shadow: 0 4px 20px rgba(13,31,60,.4); transition: all .2s;
      }
      #reader-fab-btn:hover { background: #152d56; transform: scale(1.1); }

      #reader-panel {
        background: #0d1f3c; border: 1px solid rgba(192,128,58,.3); border-radius: 8px;
        padding: 16px; width: 240px; box-shadow: 0 12px 40px rgba(13,31,60,.6);
        display: none; flex-direction: column; gap: 12px;
      }
      #reader-panel.open { display: flex; }

      .reader-label { font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: #c0803a; }
      #reader-status { font-size: .75rem; margin-top: -4px; }
      .reader-controls { display: flex; align-items: center; gap: 8px; }
      .reader-btn {
        width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,.15);
        background: rgba(255,255,255,.06); color: #fff; font-size: 1.1rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .reader-btn.primary { background: #c0803a; border-color: #c0803a; width: 44px; height: 44px; font-size: 1.2rem; }
      #reader-speed {
        margin-left: auto; padding: 6px 12px; border-radius: 4px; background: rgba(192,128,58,.15);
        border: 1px solid rgba(192,128,58,.3); color: #e0a455; font-weight: 700; cursor: pointer;
      }
      .reader-progress-track { height: 4px; background: rgba(255,255,255,.1); border-radius: 2px; overflow: hidden; }
      #reader-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #c0803a, #e0a455); transition: width .3s; }
    `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const html = `
      <div id="reader-fab">
        <div id="reader-panel" role="region" aria-label="Leitor de texto">
          <div class="reader-label">Leitor de Texto</div>
          <span id="reader-status">Parado</span>

          <div class="reader-controls">
            <button class="reader-btn primary" id="reader-play" title="Reproduzir">▶</button>
            <button class="reader-btn primary" id="reader-pause" title="Pausar" style="display:none;">⏸</button>
            <button class="reader-btn" id="reader-stop" title="Parar" style="display:none;">⏹</button>
            <button id="reader-speed" title="Velocidade">1×</button>
          </div>

          <div class="reader-progress-track">
            <div id="reader-progress-fill"></div>
          </div>
          <div style="font-size:0.68rem; color:#888; text-align:right;" id="reader-pct">0%</div>
        </div>

        <button id="reader-fab-btn" aria-label="Abrir leitor de texto" title="Leitor de texto">🔊</button>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);

    // Eventos
    document.getElementById("reader-fab-btn").addEventListener("click", togglePlayer);
    document.getElementById("reader-play").addEventListener("click", startReading);
    document.getElementById("reader-pause").addEventListener("click", pauseReading);
    document.getElementById("reader-stop").addEventListener("click", stopReading);
    document.getElementById("reader-speed").addEventListener("click", cycleSpeed);

    setInterval(() => { if (isPlaying) updateGlobalProgress(); }, 700);

    setInterval(() => {
      if (isPlaying && !window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPlayer);
  } else {
    injectPlayer();
  }

})();