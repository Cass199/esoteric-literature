// Configuration des particules
const PARTICLE_COUNT = 20;
const PARTICLE_LIFETIME = 1000; // millisecondes
const PARTICLE_SIZE_RANGE = { min: 2, max: 6 };
const PARTICLE_SPEED = 0.5;

// Création du curseur personnalisé
function createCustomCursor() {
    // Créer le conteneur du curseur
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // Créer l'étoile du curseur
    const star = document.createElement('div');
    star.className = 'cursor-star';
    cursor.appendChild(star);
    
    // Créer le conteneur de particules
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    
    // Ajouter les éléments au DOM
    document.body.appendChild(cursor);
    document.body.appendChild(particleContainer);
    
    return { cursor, particleContainer };
}

// Classe pour gérer les particules
class StarParticle {
    constructor(x, y, container) {
        this.element = document.createElement('div');
        this.element.className = 'star-particle';
        
        // Taille aléatoire
        const size = Math.random() * 
            (PARTICLE_SIZE_RANGE.max - PARTICLE_SIZE_RANGE.min) + 
            PARTICLE_SIZE_RANGE.min;
        
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        
        // Position initiale
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        
        // Vélocité aléatoire
        this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
        this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
        
        container.appendChild(this.element);
        
        // Supprimer après animation
        setTimeout(() => {
            this.element.remove();
        }, PARTICLE_LIFETIME);
    }
    
    update() {
        const currentLeft = parseFloat(this.element.style.left);
        const currentTop = parseFloat(this.element.style.top);
        
        this.element.style.left = `${currentLeft + this.vx}px`;
        this.element.style.top = `${currentTop + this.vy}px`;
    }
}

// Initialisation du curseur magique
function initMagicCursor() {
    const { cursor, particleContainer } = createCustomCursor();
    let particles = [];
    let lastX = 0;
    let lastY = 0;
    let lastParticleTime = 0;
    
    // Mettre à jour la position du curseur
    function updateCursorPosition(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Déplacer le curseur
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        // Créer des particules si suffisamment de temps s'est écoulé
        const now = Date.now();
        if (now - lastParticleTime > 50) { // Limite le nombre de particules
            createParticle(x, y);
            lastParticleTime = now;
        }
        
        lastX = x;
        lastY = y;
    }
    
    // Créer une nouvelle particule
    function createParticle(x, y) {
        const particle = new StarParticle(x, y, particleContainer);
        particles.push(particle);
        
        // Nettoyer les anciennes particules
        setTimeout(() => {
            const index = particles.indexOf(particle);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }, PARTICLE_LIFETIME);
    }
    
    // Animer les particules
    function updateParticles() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(updateParticles);
    }
    
    // Event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', updateCursorPosition);
    
    // Démarrer l'animation des particules
    updateParticles();
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initMagicCursor);