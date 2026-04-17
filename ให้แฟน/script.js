const magicButton = document.getElementById('magicButton');
const moreButton = document.getElementById('moreButton');
const poemButton = document.getElementById('poemButton');
const poemButtonAlt = document.getElementById('poemButtonAlt');
const promiseButton = document.getElementById('promiseButton');
const promiseButtonAlt = document.getElementById('promiseButtonAlt');
const soundToggle = document.getElementById('soundToggle');
const messageCard = document.getElementById('messageCard');
const poemCard = document.getElementById('poemCard');
const promiseCard = document.getElementById('promiseCard');
const loveMessage = document.getElementById('loveMessage');
const lovePoem = document.getElementById('lovePoem');
const lovePromise = document.getElementById('lovePromise');
const heartCountLabel = document.getElementById('heartCount');
const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');

const particles = [];
const stars = [];
const particleColors = ['#ff8ac2', '#ffd6e9', '#ff6f97', '#ffffff', '#ffadc3'];
const mapWrapper = document.querySelector('.map-wrapper');
const routePath = document.querySelector('.route-line');
const mapSvg = document.querySelector('.route-map');
const routeHearts = [];
let routeAnimationFrame = null;
let starfieldInitialized = false;
let audioEnabled = true;
let heartsSent = 0;
let audioContext = null;
let chordGain = null;
let clickGain = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, vx, vy, size, color, life, type = 'confetti') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.life = life;
        this.age = 0;
        this.type = type;
        this.rotation = Math.random() * Math.PI * 2;
        this.opacity = 1;
    }

    update(delta) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        this.vy += this.type === 'confetti' ? 0.03 * delta : 0;
        this.age += delta;
        this.rotation += 0.05 * delta;
        this.opacity = Math.max(0, 1 - this.age / this.life);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.bezierCurveTo(this.size, -this.size * 1.1, this.size * 1.2, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(-this.size * 1.2, this.size / 3, -this.size, -this.size * 1.1, 0, -this.size / 2);
            ctx.fill();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
    }
}

class Star {
    constructor(x, y, radius, alpha) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = alpha;
        this.phase = Math.random() * Math.PI * 2;
    }

    update(delta) {
        this.phase += delta * 0.002;
        this.alpha = 0.4 + Math.sin(this.phase) * 0.25;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function buildStarfield() {
    stars.length = 0;
    const total = 120;
    for (let i = 0; i < total; i += 1) {
        stars.push(new Star(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            0.8 + Math.random() * 1.7,
            0.4 + Math.random() * 0.4
        ));
    }
    starfieldInitialized = true;
}

function emitParticles(x, y, count, type = 'confetti') {
    for (let i = 0; i < count; i += 1) {
        const speed = 1 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed * (type === 'heart' ? 0.2 : 0.7) - (type === 'heart' ? 0.8 : 1.4);
        const size = type === 'heart' ? 12 + Math.random() * 6 : 6 + Math.random() * 8;
        const color = type === 'heart' ? '#ff8db0' : particleColors[Math.floor(Math.random() * particleColors.length)];
        const life = 1.4 + Math.random() * 0.8;
        particles.push(new Particle(x, y, vx, vy, size, color, life, type));
    }
}

function animateParticles(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const delta = 16;

    if (!starfieldInitialized) {
        buildStarfield();
    }

    stars.forEach((star) => {
        star.update(delta);
        star.draw();
    });

    for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.update(delta);
        if (particle.age >= particle.life) {
            particles.splice(i, 1);
            continue;
        }
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}

function createRouteHeart() {
    const heart = document.createElement('div');
    heart.className = 'route-heart';
    mapWrapper.appendChild(heart);
    routeHearts.push({ element: heart, progress: 0, speed: 0.0005 + Math.random() * 0.00085 });
}

function updateRouteHearts(timestamp) {
    if (!routeAnimationFrame) {
        routeAnimationFrame = timestamp;
    }
    const delta = (timestamp - routeAnimationFrame) || 16;
    routeAnimationFrame = timestamp;

    const removeIndices = [];
    const pathLength = routePath.getTotalLength();
    const bounds = mapSvg.getBoundingClientRect();
    const scaleX = bounds.width / 720;
    const scaleY = bounds.height / 320;

    routeHearts.forEach((item, index) => {
        item.progress += item.speed * delta;
        if (item.progress >= 1) {
            item.element.remove();
            removeIndices.push(index);
            return;
        }

        const point = routePath.getPointAtLength(item.progress * pathLength);
        item.element.style.left = `${point.x * scaleX}px`;
        item.element.style.top = `${point.y * scaleY}px`;
        item.element.style.opacity = `${1 - item.progress * 0.8}`;
    });

    for (let i = removeIndices.length - 1; i >= 0; i -= 1) {
        routeHearts.splice(removeIndices[i], 1);
    }

    requestAnimationFrame(updateRouteHearts);
}

function startRouteAnimation() {
    setInterval(() => {
        createRouteHeart();
        heartsSent += 1;
        heartCountLabel.textContent = heartsSent;
    }, 600);
    requestAnimationFrame(updateRouteHearts);
}

function tweenText(target, text, speed = 26) {
    target.textContent = '';
    const chars = Array.from(text);
    let index = 0;

    return new Promise((resolve) => {
        const interval = setInterval(() => {
            target.textContent += chars[index];
            index += 1;
            if (index >= chars.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function initAudioContext() {
    if (audioContext || !audioEnabled) {
        return;
    }
    if (!window.AudioContext && !window.webkitAudioContext) {
        audioEnabled = false;
        return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    chordGain = audioContext.createGain();
    chordGain.gain.value = 0.02;
    chordGain.connect(audioContext.destination);

    clickGain = audioContext.createGain();
    clickGain.gain.value = 0.06;
    clickGain.connect(audioContext.destination);
}

function playChord() {
    if (!audioEnabled) return;
    initAudioContext();
    if (!audioContext) return;

    const notes = [330, 440, 554.37];
    const now = audioContext.currentTime;

    notes.forEach((frequency, index) => {
        const osc = audioContext.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency, now + index * 0.05);
        osc.connect(chordGain);
        osc.start(now + index * 0.05);
        osc.stop(now + 0.4 + index * 0.05);
    });
}

function playClickSound() {
    if (!audioEnabled) return;
    initAudioContext();
    if (!audioContext || !clickGain) return;

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);

    const release = audioContext.createGain();
    release.gain.setValueAtTime(0.14, now);
    release.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(release).connect(clickGain);

    osc.start(now);
    osc.stop(now + 0.12);
}

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        return;
    }
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function sendNotification(title, body) {
    if (!('Notification' in window)) {
        return;
    }
    if (Notification.permission !== 'granted') {
        return;
    }
    try {
        const notification = new Notification(title, {
            body,
            icon: '',
            silent: true
        });
        notification.onclick = () => window.focus();
    } catch (error) {
        // ignore if browser blocks
    }
}

async function fetchFromApi(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('API error');
        }
        const data = await response.json();
        return Object.values(data)[0];
    } catch (error) {
        return null;
    }
}

async function presentCard(type) {
    const apiMap = {
        message: { path: '/api/message', fallback: 'ขอโทษครับ เกิดข้อผิดพลาดในการโหลดข้อความ' },
        poem: { path: '/api/poem', fallback: 'ขอโทษครับ เกิดข้อผิดพลาดในการโหลดบทกวี' },
        promise: { path: '/api/promise', fallback: 'ขอโทษครับ เกิดข้อผิดพลาดในการโหลดคำสัญญา' }
    };

    const config = apiMap[type];
    const text = await fetchFromApi(config.path) || config.fallback;

    messageCard.classList.remove('hidden');
    poemCard.classList.add('hidden');
    promiseCard.classList.add('hidden');

    if (type === 'message') {
        await tweenText(loveMessage, text, 24);
    } else if (type === 'poem') {
        await tweenText(lovePoem, text, 28);
        poemCard.classList.remove('hidden');
    } else {
        await tweenText(lovePromise, text, 28);
        promiseCard.classList.remove('hidden');
    }

    emitParticles(window.innerWidth * 0.5, window.innerHeight * 0.2, 48, 'confetti');
    emitParticles(window.innerWidth * 0.5, window.innerHeight * 0.2, 18, 'heart');
    playChord();
}

function handleButtonClick(type, notificationTitle) {
    playClickSound();
    requestNotificationPermission();
    if (notificationTitle) {
        sendNotification(notificationTitle, 'แตะเพื่ออ่านคำรักที่ส่งให้เธอได้เลย');
    }
    presentCard(type);
}

magicButton.addEventListener('click', () => handleButtonClick('message', 'จดหมายรักจากฉันถึงเธอ'));
moreButton.addEventListener('click', () => handleButtonClick('message', 'ข้อความรักเพิ่มเติม'));
poemButton.addEventListener('click', () => handleButtonClick('poem', 'บทกวีจากหัวใจ'));
poemButtonAlt.addEventListener('click', () => handleButtonClick('poem', 'บทกวีจากหัวใจ'));
promiseButton.addEventListener('click', () => handleButtonClick('promise', 'คำสัญญาเพื่ิอเธอ'));
promiseButtonAlt.addEventListener('click', () => handleButtonClick('promise', 'คำสัญญาเพื่ิอเธอ'));
soundToggle.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    soundToggle.textContent = audioEnabled ? 'เสียงเปิด/ปิด' : 'ปิดเสียงแล้ว';
});

window.addEventListener('resize', () => {
    resizeCanvas();
    buildStarfield();
});

window.addEventListener('load', () => {
    resizeCanvas();
    buildStarfield();
    animateParticles();
    startRouteAnimation();
    requestNotificationPermission();
});
