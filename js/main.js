// ============================
// ヒーロースライドショー
// ============================
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

if (slides.length > 0) {
  slides[0].classList.add('active');
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000); // 4秒ごとに切り替え
}

// ============================
// ハンバーガーメニュー（スマホ用）
// ============================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ============================
// スムーズスクロール
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // スマホメニューを閉じる
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
      }
    }
  });
});

// ============================
// カーソルエフェクト（軌跡 + クリックキラキラ）
// ============================
const sparkColors = ['#87CEEB', '#FFB6C1', '#FFD700', '#ffffff', '#c9a8e8'];

const trailChars = ['✦', '✧', '⋆', '★', '✨'];

function createParticle(x, y, isClick) {
  const count = isClick ? 12 : 1;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
    const angle = isClick ? (Math.PI * 2 / count) * i + Math.random() * 0.5 : 0;
    const speed = isClick ? Math.random() * 60 + 30 : 0;
    const offsetX = isClick ? Math.cos(angle) * speed : (Math.random() - 0.5) * 8;
    const offsetY = isClick ? Math.sin(angle) * speed : (Math.random() - 0.5) * 8;
    const size = isClick ? Math.random() * 8 + 4 : Math.random() * 10 + 8;
    const char = trailChars[Math.floor(Math.random() * trailChars.length)];

    el.textContent = isClick ? '' : char;
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: ${size}px;
      color: ${color};
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
      text-shadow: 0 0 6px ${color};
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
      opacity: 1;
      line-height: 1;
      ${isClick ? `width: ${size}px; height: ${size}px; border-radius: 50%; background: ${color}; box-shadow: 0 0 ${size * 2}px ${color};` : ''}
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 600);
  }
}

let lastTrail = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrail < 15) return;
  lastTrail = now;
  createParticle(e.clientX, e.clientY, false);
});

const cheerWords = ['We can do it!', "Let's Go!", 'You got this!', 'Go UNICORNS!', 'Hit ZERO!', 'Go!Fight!Win!'];

document.addEventListener('click', (e) => {
  createParticle(e.clientX, e.clientY, true);

  const word = cheerWords[Math.floor(Math.random() * cheerWords.length)];
  const el = document.createElement('div');
  el.textContent = word;
  el.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY - 20}px;
    transform: translate(-50%, -50%);
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 900;
    background: linear-gradient(135deg, #87CEEB, #FFB6C1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    pointer-events: none;
    z-index: 9999;
    white-space: nowrap;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    opacity: 1;
  `;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translate(-50%, -120%)';
    el.style.opacity = '0';
  });

  setTimeout(() => el.remove(), 800);
});


