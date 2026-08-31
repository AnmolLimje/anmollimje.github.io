/**
 * ===================================================================
 * CYBERPUNK GAMING PORTFOLIO ENGINE - ANMOL LIMJE
 * Features: Web Audio Synth SFX, Interactive Canvas Background,
 * Retro Bug Hunter Mini-Game, Interactive Cyber Terminal & Mobile Controls
 * ===================================================================
 */

// ================= 1. WEB AUDIO API SYNTHESIZER (ZERO LAG, NO EXTERNAL FILES) =================
class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }
    }

    resumeContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playHover() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(480, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {}
    }

    playClick() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playLaser() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(950, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {}
    }

    playExplosion() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(160, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.22);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.22);
        } catch (e) {}
    }

    playPowerup() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const notes = [440, 554, 659, 880];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const startTime = this.ctx.currentTime + (idx * 0.05);
                gain.gain.setValueAtTime(0.06, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.1);
            });
        } catch (e) {}
    }

    playFanfare() {
        if (!this.enabled || !this.ctx) return;
        this.resumeContext();
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                const startTime = this.ctx.currentTime + (idx * 0.08);
                gain.gain.setValueAtTime(0.1, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch (e) {}
    }
}

const cyberAudio = new CyberAudioEngine();

// Setup SFX Toggle Button
const sfxToggleBtn = document.getElementById('sfx-toggle');
if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
        cyberAudio.enabled = !cyberAudio.enabled;
        const icon = sfxToggleBtn.querySelector('.sfx-icon');
        const text = sfxToggleBtn.querySelector('.btn-text');
        if (cyberAudio.enabled) {
            icon.textContent = '🔊';
            text.textContent = 'SFX: ON';
            sfxToggleBtn.style.color = 'var(--neon-cyan)';
            cyberAudio.playPowerup();
        } else {
            icon.textContent = '🔇';
            text.textContent = 'SFX: OFF';
            sfxToggleBtn.style.color = 'var(--text-dim)';
        }
    });
}

// Bind UI audio cues to interactive elements
document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .project-card, .trophy-card, .stat-cell');
    if (target) {
        cyberAudio.playHover();
    }
});

document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, .filter-btn, .term-chip');
    if (target) {
        cyberAudio.playClick();
    }
});


// ================= 2. CUSTOM CYBER CURSOR =================
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');
const cursorReticle = document.querySelector('.cursor-reticle');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
    if (cursorReticle) {
        cursorReticle.style.left = `${mouseX}px`;
        cursorReticle.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    if (cursorFollower) {
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();


// ================= 3. DYNAMIC CYBER BACKGROUND CANVAS =================
const bgCanvas = document.getElementById('cyber-bg-canvas');
if (bgCanvas) {
    const bgCtx = bgCanvas.getContext('2d');
    let width = bgCanvas.width = window.innerWidth;
    let height = bgCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.6 + 0.8,
            color: Math.random() > 0.4 ? 'rgba(0, 243, 255, ' : 'rgba(255, 0, 85, '
        });
    }

    function renderBackground() {
        bgCtx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0) p1.x = width;
            if (p1.x > width) p1.x = 0;
            if (p1.y < 0) p1.y = height;
            if (p1.y > height) p1.y = 0;

            bgCtx.beginPath();
            bgCtx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            bgCtx.fillStyle = p1.color + '0.7)';
            bgCtx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    bgCtx.beginPath();
                    bgCtx.moveTo(p1.x, p1.y);
                    bgCtx.lineTo(p2.x, p2.y);
                    const alpha = (1 - dist / 110) * 0.2;
                    bgCtx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                    bgCtx.lineWidth = 0.7;
                    bgCtx.stroke();
                }
            }

            const mdx = p1.x - mouseX;
            const mdy = p1.y - mouseY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 100) {
                bgCtx.beginPath();
                bgCtx.moveTo(p1.x, p1.y);
                bgCtx.lineTo(mouseX, mouseY);
                bgCtx.strokeStyle = `rgba(255, 0, 85, ${(1 - mDist / 100) * 0.35})`;
                bgCtx.lineWidth = 0.9;
                bgCtx.stroke();
            }
        }

        requestAnimationFrame(renderBackground);
    }
    renderBackground();
}


// ================= 4. MOBILE NAVIGATION DRAWER =================
const hudMenuToggle = document.getElementById('hud-menu-toggle');
const hudNav = document.getElementById('hud-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

function openMobileNav() {
    if (hudNav) hudNav.classList.add('mobile-active');
    document.body.style.overflow = 'hidden';
    cyberAudio.playClick();
}

function closeMobileNav() {
    if (hudNav) hudNav.classList.remove('mobile-active');
    document.body.style.overflow = '';
}

if (hudMenuToggle) {
    hudMenuToggle.addEventListener('click', openMobileNav);
}

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
}

document.querySelectorAll('.hud-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});


// ================= 5. BOSS RAIDS (PROJECTS) FILTERING =================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'flex';
                gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// ================= 6. RETRO BUG HUNTER 2077 (CANVAS MINI-GAME) =================
const gameCanvas = document.getElementById('game-canvas');
const gameOverlay = document.getElementById('game-overlay');
const startGameBtn = document.getElementById('start-game-btn');
const scoreDisplay = document.getElementById('game-score');
const hiDisplay = document.getElementById('game-hi');
const livesDisplay = document.getElementById('game-lives');

if (gameCanvas) {
    const gCtx = gameCanvas.getContext('2d');
    let gameLoopId = null;
    let isPlaying = false;
    let score = 0;
    let hiScore = localStorage.getItem('al_cyber_hiscore') || 2450;
    let lives = 3;

    hiDisplay.textContent = hiScore;

    // Player Drone
    const player = {
        x: gameCanvas.width / 2,
        y: gameCanvas.height - 35,
        width: 32,
        height: 22,
        speed: 6,
        movingLeft: false,
        movingRight: false,
        shootCooldown: 0
    };

    let bullets = [];
    let enemies = [];
    let enemySpawnTimer = 0;
    let particles = [];

    function resetGame() {
        score = 0;
        lives = 3;
        bullets = [];
        enemies = [];
        particles = [];
        player.x = gameCanvas.width / 2;
        updateUI();
    }

    function updateUI() {
        scoreDisplay.textContent = score;
        livesDisplay.textContent = '❤️'.repeat(Math.max(0, lives));
        if (score > hiScore) {
            hiScore = score;
            localStorage.setItem('al_cyber_hiscore', hiScore);
            hiDisplay.textContent = hiScore;
        }
    }

    function spawnEnemy() {
        const types = [
            { name: 'Null Pointer', color: '#ff0055', hp: 1, score: 100, speed: 1.6, symbol: '👾' },
            { name: 'Memory Leak', color: '#00f3ff', hp: 2, score: 250, speed: 1.1, symbol: '☣️' },
            { name: 'Build Error', color: '#ffd700', hp: 3, score: 400, speed: 0.8, symbol: '⚡' }
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        enemies.push({
            x: Math.random() * (gameCanvas.width - 40) + 20,
            y: -25,
            width: 24,
            height: 24,
            ...type
        });
    }

    function createExplosion(x, y, color) {
        cyberAudio.playExplosion();
        if (navigator.vibrate) navigator.vibrate(40);
        for (let i = 0; i < 12; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color: color,
                radius: Math.random() * 2.5 + 1,
                life: 20
            });
        }
    }

    function shootLaser() {
        if (player.shootCooldown <= 0) {
            cyberAudio.playLaser();
            if (navigator.vibrate) navigator.vibrate(20);
            bullets.push({
                x: player.x,
                y: player.y - 10,
                radius: 3.5,
                speed: 8,
                color: '#00f3ff'
            });
            player.shootCooldown = 12;
        }
    }

    // Keyboard Controls
    window.addEventListener('keydown', (e) => {
        if (!isPlaying) return;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') player.movingLeft = true;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') player.movingRight = true;
        if (e.code === 'Space') {
            shootLaser();
            e.preventDefault();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') player.movingLeft = false;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') player.movingRight = false;
    });

    // Mobile Game Touch Controls
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnShoot = document.getElementById('btn-shoot');

    function attachTouch(btn, onDown, onUp) {
        if (!btn) return;
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            onDown();
        }, { passive: false });
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            onUp();
        }, { passive: false });
        btn.addEventListener('mousedown', onDown);
        btn.addEventListener('mouseup', onUp);
        btn.addEventListener('mouseleave', onUp);
    }

    attachTouch(btnLeft, () => { player.movingLeft = true; }, () => { player.movingLeft = false; });
    attachTouch(btnRight, () => { player.movingRight = true; }, () => { player.movingRight = false; });
    attachTouch(btnShoot, () => { shootLaser(); }, () => {});

    function gameLoop() {
        if (!isPlaying) return;

        // Clear canvas
        gCtx.fillStyle = 'rgba(4, 7, 15, 0.4)';
        gCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Player Movement
        if (player.movingLeft && player.x > player.width / 2) player.x -= player.speed;
        if (player.movingRight && player.x < gameCanvas.width - player.width / 2) player.x += player.speed;
        if (player.shootCooldown > 0) player.shootCooldown--;

        // Draw Player Drone
        gCtx.save();
        gCtx.translate(player.x, player.y);
        gCtx.fillStyle = '#00f3ff';
        gCtx.shadowColor = '#00f3ff';
        gCtx.shadowBlur = 8;
        gCtx.beginPath();
        gCtx.moveTo(0, -12);
        gCtx.lineTo(16, 10);
        gCtx.lineTo(0, 4);
        gCtx.lineTo(-16, 10);
        gCtx.closePath();
        gCtx.fill();
        gCtx.restore();

        // Update & Draw Bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.y -= b.speed;

            gCtx.beginPath();
            gCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            gCtx.fillStyle = b.color;
            gCtx.shadowColor = b.color;
            gCtx.shadowBlur = 6;
            gCtx.fill();

            if (b.y < -10) bullets.splice(i, 1);
        }

        // Enemy Spawning
        enemySpawnTimer++;
        if (enemySpawnTimer > 45) {
            spawnEnemy();
            enemySpawnTimer = 0;
        }

        // Update & Draw Enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            e.y += e.speed;

            gCtx.font = '18px sans-serif';
            gCtx.textAlign = 'center';
            gCtx.fillText(e.symbol, e.x, e.y);

            // Collision with Bullets
            for (let j = bullets.length - 1; j >= 0; j--) {
                const b = bullets[j];
                const dist = Math.hypot(e.x - b.x, e.y - b.y);
                if (dist < e.width) {
                    bullets.splice(j, 1);
                    e.hp--;
                    if (e.hp <= 0) {
                        createExplosion(e.x, e.y, e.color);
                        score += e.score;
                        updateUI();
                        enemies.splice(i, 1);
                        break;
                    }
                }
            }

            // Collision with Player / Bottom
            if (e.y > gameCanvas.height - 10) {
                enemies.splice(i, 1);
                lives--;
                updateUI();
                if (lives <= 0) gameOver();
            }
        }

        // Update & Draw Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            gCtx.beginPath();
            gCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            gCtx.fillStyle = p.color;
            gCtx.fill();

            if (p.life <= 0) particles.splice(i, 1);
        }

        gameLoopId = requestAnimationFrame(gameLoop);
    }

    function gameOver() {
        isPlaying = false;
        cancelAnimationFrame(gameLoopId);
        gameOverlay.style.display = 'flex';
        document.getElementById('overlay-title').textContent = 'MISSION FAILED';
        document.getElementById('overlay-sub').textContent = `Final Score: ${score} Bugs Squashed!`;
        startGameBtn.textContent = 'PLAY AGAIN (REBOOT)';
    }

    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            cyberAudio.playFanfare();
            gameOverlay.style.display = 'none';
            resetGame();
            isPlaying = true;
            gameLoop();
        });
    }
}


// ================= 7. INTERACTIVE CYBER COMMAND TERMINAL =================
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalForm && terminalInput && terminalOutput) {
    const commands = {
        help: () => [
            "Available Cybernetic Directives:",
            "  • 'about'     - Access Anmol's profile overview",
            "  • 'experience'- Display story quests & work history",
            "  • 'projects'  - View landmark project raids (ABHA, Pandora, etc.)",
            "  • 'skills'    - Query RPG skill tree abilities",
            "  • 'awards'    - Open trophy room accolades",
            "  • 'contact'   - Display transmission communication channels",
            "  • 'hire'      - Initialize recruitment summon protocol",
            "  • 'matrix'    - Toggle cyber matrix palette",
            "  • 'clear'     - Clear terminal buffer"
        ],
        about: () => [
            "============================================================",
            "ANMOL LIMJE // LEAD MOBILE APPLICATION ARCHITECT",
            "Experience: 7.5+ Years | Scale: Millions of Citizens",
            "Specialization: Flutter, Native Android/iOS, Bloc, GetX, AI Tools",
            "ABDM National Health Ecosystem Lead (ABHA, Aarogya Setu 2.0)",
            "============================================================"
        ],
        experience: () => [
            "[QUEST 05] LTIMindtree (Dec 2023 - Present) -> Specialist Mobile Eng (ABHA, Aarogya Setu 2.0)",
            "[QUEST 04] Mobile Programming India (Jul 2023 - Nov 2023) -> Meet Pandora Lead (AWS Amplify, GetX)",
            "[QUEST 03] Piexxi Technology (Nov 2021 - Apr 2023) -> Android App Dev & Lead (NowZone, Uniconnect, OpenCV)",
            "[QUEST 02] 4i Softwares (Oct 2020 - Oct 2021) -> Full Stack Dev (IClass A/V, PHP, MySQL)",
            "[QUEST 01] Electus Technologies (Mar 2018 - Aug 2020) -> Autonomous Chess Bot, Robotics & Vision"
        ],
        projects: () => [
            "• ABHA (Ayushman Bharat Health Account) [Govt of India ABDM - Millions Scale]",
            "• Aarogya Setu 2.0 [National Health Super App - STOMP WebSockets, Health Connect]",
            "• Meet Pandora [Youth Mental Wellness Engine with AWS Amplify]",
            "• Autonomous Chess Bot & uArm [Raspberry Pi + Computer Vision Robotics]",
            "• NowZone [BLE Biosensor Health App]",
            "• Uniconnect [Campus Higher-Education Ecosystem]"
        ],
        skills: () => [
            "• Mobile: Flutter, Dart, Native Android (Kotlin/Java), iOS (Swift)",
            "• State: Bloc Pattern, GetX, Provider, Clean Architecture, MVVM",
            "• Backend: REST, STOMP WebSockets, Firebase, AWS Amplify, GCP, .NET Web API",
            "• AI & Vision: Antigravity/Gemini, GitHub Copilot, Cursor, OpenCV Object Recognition",
            "• Plugins: Aadhaar Face RD Service, DigiLocker, Health Connect, MapMyIndia"
        ],
        awards: () => [
            "🏆 LTIM Trailblazer SQUAD – 2025 (LTIMindtree Elite Award)",
            "⭐ Best Performer of the Year 2022-2023 (Piexxi Technology LLP)",
            "🎖️ Best Performer of the Month x2 (Piexxi Technology LLP)",
            "👑 1st Rank Twice at IIT Techfest IRC (2017 & 2018)",
            "⚡ 1st Rank at IIT Techfest Maze Runner (2016)",
            "🎓 1st Rank Academic Gold Medal – PGDCCA (Hislop College)"
        ],
        contact: () => [
            "📡 Transmission Channels:",
            "  Phone: +91-89-2860-4892",
            "  Email: Limje.anmol31@gmail.com",
            "  LinkedIn: linkedin.com/in/anmol-limje-a3a854a4",
            "  Base: Nagpur, MH, India (440013)"
        ],
        hire: () => {
            cyberAudio.playFanfare();
            setTimeout(() => {
                window.location.href = "mailto:Limje.anmol31@gmail.com?subject=Offer%20/%20Mission%20Briefing%20for%20Anmol%20Limje";
            }, 800);
            return [
                "🚀 INITIATING RECRUITMENT PROTOCOL...",
                "Dispatching transmission link to Limje.anmol31@gmail.com..."
            ];
        },
        matrix: () => {
            cyberAudio.playPowerup();
            document.body.classList.toggle('matrix-mode');
            return ["⚡ MATRIX THEME TOGGLED."];
        },
        clear: () => {
            terminalOutput.innerHTML = '';
            return [];
        }
    };

    function appendOutput(lines, isCmd = false) {
        lines.forEach(text => {
            const line = document.createElement('div');
            line.className = isCmd ? 'term-line cyan-text' : 'term-line';
            line.textContent = text;
            terminalOutput.appendChild(line);
        });
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function executeCommand(raw) {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;
        cyberAudio.playClick();
        appendOutput([`anmol@root:~$ ${cmd}`], true);

        if (commands[cmd]) {
            const res = commands[cmd]();
            appendOutput(res);
        } else {
            appendOutput([`Command '${cmd}' not recognized. Type 'help' for directives.`]);
        }
    }

    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
    });

    // 1-Tap Quick Command Chips for Mobile
    document.querySelectorAll('.term-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) executeCommand(cmd);
        });
    });
}


// ================= 8. KONAMI CODE EASTER EGG =================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

window.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            cyberAudio.playFanfare();
            alert("🎮 SECRET CODE UNLOCKED! // GOD MODE ACTIVE: Unlimited Mana, 100% Architecture Mastery!");
            document.body.style.filter = "hue-rotate(90deg)";
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});


// ================= 9. GSAP SCROLL TRIGGERS & ANIMATIONS =================
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.cyber-section').forEach(sec => {
        gsap.from(sec.querySelectorAll('.section-title-wrap, .quest-card, .project-card, .skill-branch, .trophy-card, .edu-holo-card, .comms-card'), {
            scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray('.s-fill, .bar-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 92%",
            },
            width: targetWidth,
            duration: 1.1,
            ease: "power2.out"
        });
    });
}
