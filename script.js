const carta = document.getElementById('carta');
const convite = document.getElementById('convite');
const audio = document.getElementById('musica');
const canvas = document.getElementById('fogos');
const ctx = canvas.getContext('2d');
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
 
function criarParticulas(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 1.5) * 6,
      alpha: 1,
      size: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}
 
function animarParticulas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animarParticulas);
}
 
animarParticulas();
 
carta.addEventListener('click', () => {
  carta.style.display = 'none';
  convite.style.display = 'block';
  convite.classList.add('show');
  audio.play().catch(() => console.log("Autoplay bloqueado."));
  criarParticulas(window.innerWidth / 2, window.innerHeight / 2);
});