// ============================================================
// 🎂 Birthday Website — Interactive Script
// ============================================================
// ⚙️ CONFIG: เปลี่ยนชื่อแฟนได้ที่นี่
const PARTNER_NAME_TH = 'คนพิเศษของฉัน';
const PARTNER_NAME_EN = 'My Special One';
let currentLang = 'th';

const TRANSLATIONS = {
  th: {
    typingText: `สุขสันต์วันเกิดนะ${PARTNER_NAME_TH} 💙`,
    enterBtn: '✨ กดเพื่อเข้าสู่เซอร์ไพรส์ ✨',
    wishesTitle: '💌 ถึงคนพิเศษของฉัน',
    wish1: 'สุขสันต์วันเกิดนะที่รัก<br>ขอให้วันนี้เป็นวันที่เต็มไปด้วยรอยยิ้มและความสุข<br>เหมือนที่เธอทำให้ฉันมีความสุขทุกวัน',
    wish2: 'ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตฉัน<br>ทุกช่วงเวลาที่อยู่ด้วยกันมันมีค่ามากเลยนะ<br>ฉันโชคดีมากที่มีเธอ',
    wish3: 'ขอให้ทุกความฝันของเธอเป็นจริง<br>ขอให้มีแต่สิ่งดีๆ เข้ามาในชีวิต<br>และฉันจะอยู่เคียงข้างเธอเสมอนะ 💙',
    galleryTitle: '📸 ช่วงเวลาของเรา',
    captions: ['เดินด้วยกันทุกที่ 🌸', 'วันฝนตก กาแฟอุ่นๆ ☕', 'คืนที่นับดาวด้วยกัน 🌙', 'สุขสันต์วันเกิดนะที่รัก 🎂'],
    timelineTitle: '💝 เส้นทางของเรา',
    timeline: [
      { date: '📅 วันแรกที่เจอกัน', title: 'จุดเริ่มต้นของเรา ✨', desc: 'วันที่ชีวิตฉันเปลี่ยนไป ตั้งแต่วินาทีที่ได้เจอเธอ ฉันรู้เลยว่าเธอพิเศษ' },
      { date: '💬 วันที่เริ่มคุยกัน', title: 'ยิ่งรู้จัก ยิ่งหลงรัก 💫', desc: 'ทุกข้อความ ทุกบทสนทนา ทำให้ฉันยิ้มได้ทุกครั้ง เธอทำให้วันธรรมดากลายเป็นวันพิเศษ' },
      { date: '💖 ช่วงเวลาแห่งความสุข', title: 'ทุกวันที่มีเธอ 🌈', desc: 'ไม่ว่าจะเป็นวันไหน แค่มีเธออยู่ด้วย ทุกอย่างก็สมบูรณ์แบบ' },
      { date: '🎂 วันนี้ — วันเกิดเธอ', title: 'วันพิเศษสุดๆ 🎉', desc: 'วันนี้เป็นวันของเธอ ขอให้เป็นวันที่มีความสุขที่สุด ฉันรักเธอนะ 💙' },
    ],
    cakeTitle: '🎂 เค้กวันเกิด',
    cakeInstruction: 'ลองเป่าเค้กดูสิ 🎂',
    blowBtn: '🎤 กดเพื่อเปิดไมค์แล้วเป่าเค้ก',
    cakeMessage: 'ขอให้คำอธิษฐานของเธอเป็นจริงนะ 💫',
    micReady: '🎤 ไมค์พร้อมแล้ว — เป่าเลย!',
    micError: '❌ ไม่สามารถเข้าถึงไมค์ได้ — กดเทียนเพื่อดับแทนได้เลย',
    finalTitle: '🎁 ยังมีอีกหนึ่งเซอร์ไพรส์...',
    finalBtn: 'เปิดข้อความสุดท้าย',
    finalMessage: 'ขอบคุณที่เกิดมาบนโลกนี้นะ<br>และมาเป็นคนพิเศษของฉัน 💙',
    closeBtn: 'ปิด ✕',
    footer: 'Made with 💖 for you',
    musicTitle: 'เปิด/ปิดเพลง',
  },
  en: {
    typingText: `Happy Birthday, ${PARTNER_NAME_EN} 💙`,
    enterBtn: '✨ Enter the Surprise ✨',
    wishesTitle: '💌 To My Special One',
    wish1: 'Happy Birthday, my love<br>May today be filled with smiles and happiness<br>Just like how you make me happy every day',
    wish2: 'Thank you for being a part of my life<br>Every moment together is so precious<br>I am so lucky to have you',
    wish3: 'May all your dreams come true<br>May only good things come into your life<br>And I will always be by your side 💙',
    galleryTitle: '📸 Our Moments',
    captions: ['Walking together everywhere 🌸', 'Rainy days, warm coffee ☕', 'Counting stars together 🌙', 'Happy Birthday, my love 🎂'],
    timelineTitle: '💝 Our Journey',
    timeline: [
      { date: '📅 The day we first met', title: 'Our Beginning ✨', desc: 'The day my life changed. From the moment I met you, I knew you were special.' },
      { date: '💬 When we started talking', title: 'The more I know, the more I love 💫', desc: 'Every message, every conversation made me smile. You turned ordinary days into something special.' },
      { date: '💖 Moments of happiness', title: 'Every day with you 🌈', desc: 'No matter what day it is, just having you by my side makes everything perfect.' },
      { date: '🎂 Today — Your Birthday', title: 'The most special day 🎉', desc: 'Today is your day. I wish you the happiest day ever. I love you 💙' },
    ],
    cakeTitle: '🎂 Birthday Cake',
    cakeInstruction: 'Try blowing out the candles! 🎂',
    blowBtn: '🎤 Tap to enable mic & blow the candles',
    cakeMessage: 'May all your wishes come true 💫',
    micReady: '🎤 Mic is ready — Blow now!',
    micError: '❌ Cannot access mic — Tap candles to blow out instead',
    finalTitle: '🎁 One more surprise...',
    finalBtn: 'Open the final message',
    finalMessage: 'Thank you for being born into this world<br>And for being my special one 💙',
    closeBtn: 'Close ✕',
    footer: 'Made with 💖 for you',
    musicTitle: 'Toggle music',
  }
};

function T(key) { return TRANSLATIONS[currentLang][key]; }

function switchLanguage(lang) {
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  // Update toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Landing page typing text (if still visible, just show full text)
  const typingEl = document.getElementById('typing-text');
  const landing = document.getElementById('landing-page');
  if (landing && !landing.classList.contains('hidden')) {
    typingEl.textContent = t.typingText;
  }

  // Enter button
  document.getElementById('enter-btn').textContent = t.enterBtn;

  // Wishes
  const wishTitle = document.querySelector('#wishes .section-title');
  if (wishTitle) wishTitle.textContent = t.wishesTitle;
  const wishPs = document.querySelectorAll('.wish-card p');
  if (wishPs[0]) wishPs[0].innerHTML = t.wish1;
  if (wishPs[1]) wishPs[1].innerHTML = t.wish2;
  if (wishPs[2]) wishPs[2].innerHTML = t.wish3;

  // Gallery
  const galTitle = document.querySelector('#gallery .section-title');
  if (galTitle) galTitle.textContent = t.galleryTitle;
  document.querySelectorAll('.polaroid .caption').forEach((cap, i) => {
    if (t.captions[i]) cap.textContent = t.captions[i];
  });

  // Timeline
  const tlTitle = document.querySelector('#timeline .section-title');
  if (tlTitle) tlTitle.textContent = t.timelineTitle;
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    if (t.timeline[i]) {
      const d = item.querySelector('.timeline-date');
      const tt = item.querySelector('.timeline-title');
      const dd = item.querySelector('.timeline-desc');
      if (d) d.textContent = t.timeline[i].date;
      if (tt) tt.textContent = t.timeline[i].title;
      if (dd) dd.textContent = t.timeline[i].desc;
    }
  });

  // Cake
  const cakeTitle = document.querySelector('#cake-section .section-title');
  if (cakeTitle) cakeTitle.textContent = t.cakeTitle;
  const cakeInst = document.querySelector('.cake-instruction');
  if (cakeInst) cakeInst.textContent = t.cakeInstruction;
  const blowBtn = document.getElementById('start-blow-btn');
  if (blowBtn) blowBtn.textContent = t.blowBtn;
  const cakeMsg = document.getElementById('cake-message');
  if (cakeMsg) cakeMsg.textContent = t.cakeMessage;

  // Final
  const finTitle = document.querySelector('#final-section .section-title');
  if (finTitle) finTitle.textContent = t.finalTitle;
  const finBtn = document.getElementById('final-btn');
  if (finBtn) finBtn.textContent = t.finalBtn;
  const finMsg = document.querySelector('#final-overlay .spotlight-content h2');
  if (finMsg) finMsg.innerHTML = t.finalMessage;
  const closeBtn = document.getElementById('close-overlay');
  if (closeBtn) closeBtn.textContent = t.closeBtn;

  // Footer
  const footer = document.querySelector('.footer p');
  if (footer) footer.textContent = t.footer;

  // Music toggle title
  const musicBtn = document.getElementById('music-toggle');
  if (musicBtn) musicBtn.title = t.musicTitle;
}

// Keep TYPING_TEXT as a getter for current language
function getTypingText() { return TRANSLATIONS[currentLang].typingText; }

// ============================================================
// 1. LANDING PAGE — Particles & Typing
// ============================================================
(function initLanding() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let hearts = [];
  let stars = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create heart particles
  function createHeart() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 1.2 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    };
  }

  // Create star particles
  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
    };
  }

  for (let i = 0; i < 40; i++) {
    const h = createHeart();
    h.y = Math.random() * canvas.height;
    hearts.push(h);
  }
  for (let i = 0; i < 100; i++) stars.push(createStar());

  function drawHeart(cx, cy, size, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(0, -3 * s);
    ctx.bezierCurveTo(-5 * s, -15 * s, -22 * s, -8 * s, -12 * s, 5 * s);
    ctx.lineTo(0, 15 * s);
    ctx.lineTo(12 * s, 5 * s);
    ctx.bezierCurveTo(22 * s, -8 * s, 5 * s, -15 * s, 0, -3 * s);
    ctx.closePath();
    ctx.restore();
  }

  function animateLanding() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stars
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = 0.3 + Math.sin(s.twinkle) * 0.3;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hearts
    hearts.forEach(h => {
      h.y -= h.speedY;
      h.x += h.speedX;
      h.rotation += h.rotSpeed;
      if (h.y < -30) {
        Object.assign(h, createHeart());
      }
      ctx.fillStyle = `rgba(255,192,203,${h.opacity})`;
      drawHeart(h.x, h.y, h.size, h.rotation);
      ctx.fill();
    });

    animId = requestAnimationFrame(animateLanding);
  }
  animateLanding();

  // Typing animation
  const typingEl = document.getElementById('typing-text');
  let charIndex = 0;
  const typingStr = getTypingText();

  function typeChar() {
    if (charIndex <= typingStr.length) {
      typingEl.innerHTML = typingStr.slice(0, charIndex) + '<span class="cursor-blink"></span>';
      charIndex++;
      setTimeout(typeChar, 80 + Math.random() * 60);
    } else {
      // Show button after typing
      setTimeout(() => {
        document.getElementById('enter-btn').classList.add('visible');
      }, 500);
    }
  }
  setTimeout(typeChar, 800);

  // Expose cleanup
  window._cleanupLanding = () => {
    cancelAnimationFrame(animId);
  };
})();

// ============================================================
// 2. ENTER SURPRISE — Transition
// ============================================================
function enterSurprise() {
  createSparklesAt(event.target);
  const landing = document.getElementById('landing-page');
  landing.classList.add('hidden');
  setTimeout(() => {
    window._cleanupLanding();
    landing.style.display = 'none';
    const main = document.getElementById('main-content');
    main.classList.add('visible');
    initBgParticles();
    initScrollReveal();
  }, 1200);
}

// ============================================================
// 3. BACKGROUND PARTICLES (Main page)
// ============================================================
function initBgParticles() {
  const canvas = document.getElementById('bg-particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    const type = Math.random() > 0.5 ? 'heart' : 'star';
    return {
      type,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (type === 'heart' ? 8 : 3) + 2,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.2 + 0.05,
      phase: Math.random() * Math.PI * 2,
    };
  }

  for (let i = 0; i < 60; i++) particles.push(createParticle());

  function drawHeart(cx, cy, size) {
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(cx, cy - 3 * s);
    ctx.bezierCurveTo(cx - 5 * s, cy - 15 * s, cx - 22 * s, cy - 8 * s, cx - 12 * s, cy + 5 * s);
    ctx.lineTo(cx, cy + 15 * s);
    ctx.lineTo(cx + 12 * s, cy + 5 * s);
    ctx.bezierCurveTo(cx + 22 * s, cy - 8 * s, cx + 5 * s, cy - 15 * s, cx, cy - 3 * s);
    ctx.closePath();
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.phase) * 0.2;
      p.phase += 0.01;
      if (p.y < -20) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }
      if (p.type === 'heart') {
        ctx.fillStyle = `rgba(255,192,203,${p.opacity})`;
        drawHeart(p.x, p.y, p.size);
      } else {
        ctx.fillStyle = `rgba(173,216,230,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================================
// 4. SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ============================================================
// 5. MUSIC — Web Audio API Piano Melody
// ============================================================
let musicCtx = null;
let isMusicPlaying = false;
let melodyInterval = null;

const MELODY_NOTES = [
  // Happy Birthday in frequencies (C major, gentle)
  { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
  { freq: 262, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 1.0 },
  { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
  { freq: 262, dur: 0.6 }, { freq: 392, dur: 0.6 }, { freq: 349, dur: 1.0 },
  { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 523, dur: 0.6 },
  { freq: 440, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 0.6 }, { freq: 294, dur: 1.0 },
  { freq: 466, dur: 0.4 }, { freq: 466, dur: 0.2 }, { freq: 440, dur: 0.6 },
  { freq: 349, dur: 0.6 }, { freq: 392, dur: 0.6 }, { freq: 349, dur: 1.2 },
];

function playNote(ctx, freq, startTime, duration) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Soft piano-like envelope
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.03, startTime + duration * 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  // Add harmonics for richness
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, startTime);
  gain2.gain.setValueAtTime(0, startTime);
  gain2.gain.linearRampToValueAtTime(0.02, startTime + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain).connect(ctx.destination);
  osc2.connect(gain2).connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.1);
  osc2.start(startTime);
  osc2.stop(startTime + duration + 0.1);
}

function playMelody() {
  if (musicCtx) musicCtx.close();
  musicCtx = new (window.AudioContext || window.webkitAudioContext)();
  let time = musicCtx.currentTime + 0.1;

  MELODY_NOTES.forEach(note => {
    playNote(musicCtx, note.freq, time, note.dur);
    time += note.dur + 0.05;
  });

  const totalDur = MELODY_NOTES.reduce((s, n) => s + n.dur + 0.05, 0);
  melodyInterval = setTimeout(() => {
    if (isMusicPlaying) playMelody();
  }, totalDur * 1000 + 500);
}

function toggleMusic() {
  const btn = document.getElementById('music-toggle');
  if (isMusicPlaying) {
    isMusicPlaying = false;
    btn.classList.remove('playing');
    btn.textContent = '🔇';
    if (musicCtx) { musicCtx.close(); musicCtx = null; }
    clearTimeout(melodyInterval);
  } else {
    isMusicPlaying = true;
    btn.classList.add('playing');
    btn.textContent = '🎵';
    playMelody();
  }
}

// ============================================================
// 6. BLOW DETECTION — Microphone API
// ============================================================
let blowCtx = null;
let blowAnalyser = null;
let blowStream = null;
let candlesBlown = 0;
const TOTAL_CANDLES = 5;
let isBlowing = false;
let blowAccumulator = 0;

async function startBlowDetection() {
  const btn = document.getElementById('start-blow-btn');
  const status = document.getElementById('blow-status');
  const barContainer = document.getElementById('blow-bar');

  try {
    blowStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    blowCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = blowCtx.createMediaStreamSource(blowStream);
    blowAnalyser = blowCtx.createAnalyser();
    blowAnalyser.fftSize = 512;
    source.connect(blowAnalyser);

    btn.style.display = 'none';
    barContainer.style.display = 'block';
    status.textContent = T('micReady');

    detectBlow();
  } catch (err) {
    status.textContent = T('micError');
    enableTapToBlowOut();
  }
}

function detectBlow() {
  if (candlesBlown >= TOTAL_CANDLES) return;

  const bufferLength = blowAnalyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  blowAnalyser.getByteFrequencyData(dataArray);

  // Check low frequency energy (blow sound is low freq, ~20-500Hz)
  let lowFreqEnergy = 0;
  const lowBins = Math.floor(500 / (blowCtx.sampleRate / blowAnalyser.fftSize));
  for (let i = 0; i < lowBins && i < bufferLength; i++) {
    lowFreqEnergy += dataArray[i];
  }
  lowFreqEnergy /= lowBins;

  const threshold = 80;
  const fillEl = document.getElementById('blow-fill');

  if (lowFreqEnergy > threshold) {
    blowAccumulator += 2;
    if (blowAccumulator > 100) blowAccumulator = 100;
  } else {
    blowAccumulator = Math.max(0, blowAccumulator - 3);
  }

  fillEl.style.width = blowAccumulator + '%';

  if (blowAccumulator >= 60) {
    blowOutNextCandle();
    blowAccumulator = 0;
  }

  requestAnimationFrame(detectBlow);
}

function blowOutNextCandle() {
  if (candlesBlown >= TOTAL_CANDLES) return;
  candlesBlown++;
  const candle = document.getElementById('candle-' + candlesBlown);
  candle.classList.add('blown');
  createSmoke(candle);

  if (candlesBlown >= TOTAL_CANDLES) {
    allCandlesBlown();
  }
}

function createSmoke(candleEl) {
  const smoke = candleEl.querySelector('.smoke');
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    particle.style.setProperty('--drift', (Math.random() * 20 - 10) + 'px');
    particle.style.animationDelay = (i * 0.15) + 's';
    smoke.appendChild(particle);
    setTimeout(() => particle.remove(), 2500);
  }
}

function enableTapToBlowOut() {
  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const candle = document.getElementById('candle-' + i);
    candle.style.cursor = 'pointer';
    candle.addEventListener('click', function handler() {
      if (!this.classList.contains('blown')) {
        blowOutNextCandle();
      }
    });
  }
}

function allCandlesBlown() {
  // Stop mic
  if (blowStream) {
    blowStream.getTracks().forEach(t => t.stop());
  }
  if (blowCtx) blowCtx.close();

  document.getElementById('blow-status').textContent = '';
  document.getElementById('blow-bar').style.display = 'none';

  // Show message
  setTimeout(() => {
    document.getElementById('cake-message').classList.add('visible');
    launchConfetti();
    createSparklesBurst();
  }, 500);
}

// ============================================================
// 7. CONFETTI
// ============================================================
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#FFC0CB', '#FFD700', '#ADD8E6', '#FF69B4', '#87CEEB', '#FFB6C1', '#DDA0DD', '#F0E68C'];

  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -18 - 5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.25,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vx *= 0.99;

      if (frame > 60) p.opacity -= 0.008;
      if (p.opacity <= 0) return;
      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (alive && frame < 300) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animate();
}

// ============================================================
// 8. SPARKLE EFFECTS
// ============================================================
function createSparklesAt(element) {
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width) + 'px';
    spark.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height) + 'px';
    spark.style.background = ['gold', '#FFC0CB', '#ADD8E6', '#fff'][Math.floor(Math.random() * 4)];
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }
}

function createSparklesBurst() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const spark = document.createElement('div');
      spark.className = 'sparkle';
      spark.style.left = (cx + (Math.random() - 0.5) * 400) + 'px';
      spark.style.top = (cy + (Math.random() - 0.5) * 400) + 'px';
      spark.style.width = (Math.random() * 8 + 4) + 'px';
      spark.style.height = spark.style.width;
      spark.style.background = ['gold', '#FFC0CB', '#ADD8E6', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 5)];
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }, i * 50);
  }
}

// ============================================================
// 9. FINAL SURPRISE
// ============================================================
function showFinalMessage() {
  createSparklesAt(document.getElementById('final-btn'));
  const overlay = document.getElementById('final-overlay');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  setTimeout(() => launchConfetti(), 800);
}

function closeOverlay() {
  const overlay = document.getElementById('final-overlay');
  overlay.classList.remove('visible');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

// ============================================================
// 10. PREVENT SCROLL ON LANDING
// ============================================================
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  // Re-enable scroll after entering
  const observer = new MutationObserver(() => {
    if (document.getElementById('landing-page').classList.contains('hidden')) {
      document.body.style.overflow = '';
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('landing-page'), { attributes: true });
});
