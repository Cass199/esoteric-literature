// Création de flocons de neige
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    const snowflakeChars = ['❄', '❅', '❆', '✧', '✦'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}em`;
        snowContainer.appendChild(snowflake);
    }
}

// Création d'étincelles magiques
function createSparkles() {
    const sparklesContainer = document.querySelector('.magic-sparkles');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }
    
    setInterval(createSparkle, 50);
}

// Gestionnaire de glisser-déposer pour le créateur de sorts
function initSpellCreator() {
    const ingredients = document.querySelectorAll('.ingredient');
    const cauldron = document.querySelector('.spell-cauldron');
    const cauldronContent = document.querySelector('.cauldron-content');
    const mixButton = document.querySelector('.mix-button');
    const magicResult = document.querySelector('.magic-result');
    
    let spellIngredients = [];
    
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', ingredient.dataset.element);
            ingredient.classList.add('dragging');
        });
        
        ingredient.addEventListener('dragend', () => {
            ingredient.classList.remove('dragging');
        });
    });
    
    cauldron.addEventListener('dragover', e => {
        e.preventDefault();
        cauldron.classList.add('cauldron-active');
    });
    
    cauldron.addEventListener('dragleave', () => {
        cauldron.classList.remove('cauldron-active');
    });
    
    cauldron.addEventListener('drop', e => {
        e.preventDefault();
        const element = e.dataTransfer.getData('text/plain');
        if (!spellIngredients.includes(element)) {
            spellIngredients.push(element);
            updateCauldron();
            createDropEffect(e.clientX, e.clientY);
        }
    });
    
    function updateCauldron() {
        if (spellIngredients.length === 0) {
            cauldronContent.textContent = 'Glissez les éléments ici';
            mixButton.disabled = true;
        } else {
            cauldronContent.textContent = spellIngredients.map(element => {
                switch(element) {
                    case 'candle': return '🕯️';
                    case 'star': return '⭐';
                    case 'bell': return '🔔';
                    case 'crystal': return '💎';
                    default: return '';
                }
            }).join(' ');
            mixButton.disabled = spellIngredients.length < 2;
        }
    }

    function createDropEffect(x, y) {
        const sparkles = ['✨', '⚡', '💫', '⭐'];
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-particle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
            sparkle.style.setProperty('--y', (Math.random() * 100 - 50) + 'px');
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    function createMagicEffect() {
        if (spellIngredients.length < 2) return; // Sécurité supplémentaire

        const effects = {
            candle: { emoji: '🕯️', message: 'une lueur chaleureuse' },
            star: { emoji: '⭐', message: 'une lumière céleste' },
            bell: { emoji: '🔔', message: 'un son cristallin' },
            crystal: { emoji: '💎', message: 'une énergie pure' }
        };

        // Désactiver le bouton pendant l'animation
        mixButton.disabled = true;

        // Effet de mélange dans le chaudron
        cauldronContent.classList.add('mixing');
        
        // Création de particules magiques
        const particles = ['✨', '💫', '⭐', '🌟', '⚡'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'magic-particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
                particle.style.setProperty('--y', (Math.random() * -200 - 50) + 'px');
                cauldron.appendChild(particle);
                
                // Supprimer la particule après l'animation
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }

        // Afficher le résultat après l'animation
        setTimeout(() => {
            const result = spellIngredients.map(ingredient => effects[ingredient].message).join(' et ');
            const resultEmojis = spellIngredients.map(ingredient => effects[ingredient].emoji).join('');
            
            // Créer l'effet d'apparition du résultat
            magicResult.innerHTML = `
                <div class="magic-result-content">
                    <div class="result-emojis">${resultEmojis}</div>
                    <p>Votre sort crée ${result} !</p>
                </div>
            `;
            
            // Réinitialiser le chaudron
            cauldronContent.classList.remove('mixing');
            spellIngredients = [];
            updateCauldron();
        }, 2000);
    }

    // Ajouter l'écouteur d'événement sur le bouton
    mixButton.addEventListener('click', createMagicEffect);
}

// Animation des cartes de rituels
function initRitualCards() {
    const cards = document.querySelectorAll('.ritual-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const circle = card.querySelector('.ritual-circle');
            circle.style.animation = 'none';
            circle.offsetHeight; // Force reflow
            circle.style.animation = 'rotate 20s linear infinite';
        });
    });
}

// Initialisation de toutes les animations
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    createSparkles();
    initSpellCreator();
    initRitualCards();
});

// Effet de curseur magique spécial Noël
document.addEventListener('mousemove', e => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail winter';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
});