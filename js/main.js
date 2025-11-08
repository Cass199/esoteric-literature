// Fonction pour créer une étoile
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    return star;
}

// Fonction pour créer un sceau cosmique
function createCosmicSeal() {
    const seal = document.createElement('canvas');
    seal.width = 200;
    seal.height = 200;
    seal.className = 'cosmic-seal';
    
    const ctx = seal.getContext('2d');
    ctx.strokeStyle = '#9D71E8';
    ctx.lineWidth = 2;
    
    // Dessiner le cercle extérieur
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, Math.PI * 2);
    ctx.stroke();
    
    // Dessiner l'étoile
    ctx.beginPath();
    for (let i = 0; i < 7; i++) {
        const angle = (i * 2 * Math.PI) / 7;
        const x = 100 + 60 * Math.cos(angle);
        const y = 100 + 60 * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    
    // Dessiner des symboles mystiques
    ctx.font = '20px serif';
    ctx.fillStyle = '#9D71E8';
    const symbols = ['☽', '☉', '☿', '♄', '⚝', '♦', '☮'];
    symbols.forEach((symbol, i) => {
        const angle = (i * 2 * Math.PI) / 7;
        const x = 100 + 90 * Math.cos(angle);
        const y = 100 + 90 * Math.sin(angle);
        ctx.fillText(symbol, x - 10, y + 10);
    });
    
    return seal;
}

// Fonction pour créer un ornement cosmique
function createCosmicOrnament() {
    const ornament = document.createElement('canvas');
    ornament.width = 300;
    ornament.height = 100;
    ornament.className = 'cosmic-ornament';
    
    const ctx = ornament.getContext('2d');
    ctx.strokeStyle = '#9D71E8';
    ctx.lineWidth = 2;
    
    // Dessiner des motifs décoratifs
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(60 * i, 50);
        ctx.bezierCurveTo(
            60 * i + 20, 20,
            60 * i + 40, 20,
            60 * i + 60, 50
        );
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(60 * i + 30, 50, 5, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    return ornament;
}

// Fonction pour initialiser le fond étoilé
function initStarryBackground() {
    const container = document.createElement('div');
    container.className = 'starry-background';
    document.body.prepend(container);
    
    // Ajouter des étoiles
    for (let i = 0; i < 100; i++) {
        container.appendChild(createStar());
    }
}

// Fonction pour remplacer les images manquantes
function replaceMissingImages() {
    // Remplacer le sceau cosmique dans le header
    const headerSeal = document.querySelector('.header-seal');
    if (headerSeal) {
        headerSeal.replaceWith(createCosmicSeal());
    }
    
    // Remplacer l'ornement cosmique
    const ornamentImg = document.querySelector('.ornament-img');
    if (ornamentImg) {
        ornamentImg.replaceWith(createCosmicOrnament());
    }
    
    // Ajouter des décorations aux book-cards
    document.querySelectorAll('.book-card').forEach(card => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        canvas.className = 'book-decoration';
        const ctx = canvas.getContext('2d');
        
        // Dessiner un simple motif décoratif
        ctx.strokeStyle = '#9D71E8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, Math.PI * 2);
        ctx.stroke();
        
        card.insertBefore(canvas, card.firstChild);
    });
}

// Ajouter des styles CSS dynamiques
function addDynamicStyles() {
    const styles = `
        .starry-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 2s infinite alternate;
        }
        
        .cosmic-seal {
            max-width: 100px;
            margin: 0 auto;
            display: block;
        }
        
        .cosmic-ornament {
            max-width: 100%;
            height: auto;
            margin: 1rem 0;
        }
        
        .book-decoration {
            position: absolute;
            top: 10px;
            right: 10px;
            opacity: 0.2;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Animation du symbole mystique dans le header
    const mysticSymbol = document.querySelector('.mystic-symbol');
    if (mysticSymbol) {
        setInterval(() => {
            mysticSymbol.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                mysticSymbol.style.transform = 'rotate(0deg)';
            }, 1000);
        }, 5000);
    }
    
    // Initialiser les éléments dynamiques
    addDynamicStyles();
    initStarryBackground();
    replaceMissingImages();
});

// Fonction de recherche dynamique
function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const bookCards = document.querySelectorAll('.book-card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Validation du formulaire de contact
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    // Simulation d'envoi du formulaire
    alert('Message envoyé avec succès !');
    document.getElementById('contactForm').reset();
}

// Easter egg : message caché
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            document.body.style.fontFamily = 'Papyrus, fantasy';
            alert('Vous avez découvert le manuscrit secret !');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});