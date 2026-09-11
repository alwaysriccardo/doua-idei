// Ambient Particle Canvas
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() > 0.5 ? 260 : 200; // Purple / Cyan accents
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 45; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Navigation Pill Active State Observer
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Interactive Demo 1: MedGemma Scan Simulation
const scanBtn = document.getElementById('run-scan-btn');
const scanBeam = document.getElementById('scan-beam');
const scanBox = document.getElementById('scan-box');
const scanResult = document.getElementById('scan-result-text');

let isScanning = false;

if (scanBtn) {
  scanBtn.addEventListener('click', () => {
    if (isScanning) return;
    isScanning = true;
    scanBtn.innerText = 'Analiză în curs...';
    scanBtn.style.opacity = '0.7';
    scanBeam.classList.add('scanning');
    scanBox.classList.remove('revealed');
    scanResult.innerHTML = '<span style="color: var(--cyan);">Procesare felii imagistice axiale...</span>';

    setTimeout(() => {
      scanResult.innerHTML = '<span style="color: #fbbf24;">Segmentare anatomică automată MedGemma...</span>';
    }, 1200);

    setTimeout(() => {
      scanBeam.classList.remove('scanning');
      scanBox.classList.add('revealed');
      scanResult.innerHTML = '<strong>Rezultat:</strong> Hernie discală L4-L5 <span style="color: #4ade80; font-weight:700;">(Acuratețe 98.4%)</span>';
      scanBtn.innerText = 'Scanează din nou';
      scanBtn.style.opacity = '1';
      isScanning = false;
    }, 2500);
  });
}

// Interactive Demo 2: Chat Personality & Compatibility Simulation
const chatBtn = document.getElementById('run-chat-btn');
const chatResult = document.getElementById('chat-ai-result');

let isAnalyzingChat = false;

if (chatBtn) {
  chatBtn.addEventListener('click', () => {
    if (isAnalyzingChat) return;
    isAnalyzingChat = true;
    chatBtn.innerText = 'Extragere tipare...';
    chatBtn.style.opacity = '0.7';

    setTimeout(() => {
      chatResult.style.display = 'block';
      chatBtn.innerText = 'Reanalizează Conversația';
      chatBtn.style.opacity = '1';
      isAnalyzingChat = false;
    }, 1400);
  });
}
