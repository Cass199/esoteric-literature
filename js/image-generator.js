// Utilitaires pour le dessin
const drawingSizes = {
    symbol: { width: 200, height: 200 },
    book: { width: 300, height: 400 },
    texture: { width: 512, height: 512 },
    ornament: { width: 400, height: 100 }
};

// Couleurs et styles
const colors = {
    gold: '#FFD700',
    purple: '#9D71E8',
    darkPurple: '#4B0082',
    silver: '#C0C0C0',
    red: '#8B0000',
    blue: '#000080'
};

// Fonction pour créer un canvas avec un contexte
function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return { canvas, ctx: canvas.getContext('2d') };
}

// Générateur de symboles mystiques
function generateSymbol(type) {
    const { canvas, ctx } = createCanvas(drawingSizes.symbol.width, drawingSizes.symbol.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.strokeStyle = colors.purple;
    ctx.lineWidth = 2;

    switch(type) {
        case 'cosmic-seal':
            // Cercle externe
            ctx.beginPath();
            ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
            ctx.stroke();

            // Étoile à sept branches
            ctx.beginPath();
            for (let i = 0; i < 7; i++) {
                const angle = (i * 2 * Math.PI) / 7;
                const x = centerX + 60 * Math.cos(angle);
                const y = centerY + 60 * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = colors.gold;
            ctx.stroke();

            // Symboles mystiques
            ctx.font = '20px serif';
            ctx.fillStyle = colors.purple;
            const symbols = ['☽', '☉', '☿', '♄', '⚝', '♦', '☮'];
            symbols.forEach((symbol, i) => {
                const angle = (i * 2 * Math.PI) / 7;
                ctx.fillText(symbol, 
                    centerX + 90 * Math.cos(angle) - 10,
                    centerY + 90 * Math.sin(angle) + 10
                );
            });
            break;

        case 'tree-of-life':
            // Dessiner les sephiroth
            const positions = [
                {x: centerX, y: 30}, // Kether
                {x: centerX - 50, y: 80}, // Chokmah
                {x: centerX + 50, y: 80}, // Binah
                {x: centerX - 70, y: 140}, // Chesed
                {x: centerX + 70, y: 140}, // Geburah
                {x: centerX, y: 160}, // Tiphereth
                {x: centerX - 50, y: 200}, // Netzach
                {x: centerX + 50, y: 200}, // Hod
                {x: centerX, y: 240}, // Yesod
                {x: centerX, y: 280} // Malkuth
            ];

            // Connexions
            ctx.beginPath();
            positions.forEach((pos, i) => {
                positions.slice(i + 1).forEach(pos2 => {
                    ctx.moveTo(pos.x, pos.y);
                    ctx.lineTo(pos2.x, pos2.y);
                });
            });
            ctx.strokeStyle = colors.silver;
            ctx.stroke();

            // Cercles
            positions.forEach(pos => {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
                ctx.fillStyle = colors.gold;
                ctx.fill();
                ctx.strokeStyle = colors.purple;
                ctx.stroke();
            });
            break;

        case 'pentagram':
            const radius = 80;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = colors.red;
            ctx.stroke();

            // Cercle autour
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
            ctx.strokeStyle = colors.gold;
            ctx.stroke();
            break;
    }

    return canvas;
}

// Générateur de textures
function generateTexture(type) {
    const { canvas, ctx } = createCanvas(drawingSizes.texture.width, drawingSizes.texture.height);
    
    switch(type) {
        case 'manuscript-bg':
            // Texture de parchemin
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#d4c391');
            gradient.addColorStop(0.5, '#e6d5a7');
            gradient.addColorStop(1, '#d4c391');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ajouter du grain
            for (let i = 0; i < 5000; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
                ctx.fillRect(x, y, 1, 1);
            }
            break;

        case 'constellation-pattern':
            ctx.fillStyle = 'rgba(0,0,0,0.9)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Étoiles
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                ctx.fill();
            }

            // Constellations
            for (let i = 0; i < 5; i++) {
                const points = [];
                for (let j = 0; j < 5; j++) {
                    points.push({
                        x: (100 + Math.random() * 300),
                        y: (100 + Math.random() * 300)
                    });
                }
                
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                points.forEach(point => ctx.lineTo(point.x, point.y));
                ctx.strokeStyle = 'rgba(157,113,232,0.3)';
                ctx.stroke();
            }
            break;
    }

    return canvas;
}

// Générateur de livres
function generateBook(title) {
    const { canvas, ctx } = createCanvas(drawingSizes.book.width, drawingSizes.book.height);
    
    // Fond du livre
    ctx.fillStyle = '#4a3c2d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reliure et ombres
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#2a1f1a');
    gradient.addColorStop(0.1, '#4a3c2d');
    gradient.addColorStop(0.9, '#4a3c2d');
    gradient.addColorStop(1, '#2a1f1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Décorations dorées
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Titre
    ctx.font = '20px UnifrakturMaguntia';
    ctx.fillStyle = colors.gold;
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2);

    // Symboles mystiques
    ctx.font = '16px serif';
    const symbols = ['☽', '☉', '☿', '♄'];
    symbols.forEach((symbol, i) => {
        ctx.fillText(symbol, 
            50 + (i * 60),
            canvas.height - 50
        );
    });

    return canvas;
}

// Générateur d'image générique de secours
function generateGenericImage(title) {
    const { canvas, ctx } = createCanvas(200, 200);
    
    // Fond dégradé
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#1a0f0a');
    gradient.addColorStop(1, '#2a1f1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);

    // Cadre
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 180, 180);

    // Symbole central
    ctx.font = '40px serif';
    ctx.fillStyle = colors.purple;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✧', 100, 100);

    // Titre
    ctx.font = '16px UnifrakturMaguntia';
    ctx.fillStyle = colors.gold;
    ctx.fillText(title, 100, 160);

    return canvas;
}

// Générateur de portraits d'auteurs
function generateAuthorPortrait(authorName) {
    const { canvas, ctx } = createCanvas(200, 200);
    
    // Fond avec motif vintage
    const gradient = ctx.createRadialGradient(
        100, 100, 0,
        100, 100, 100
    );
    gradient.addColorStop(0, '#2a1f1a');
    gradient.addColorStop(1, '#1a0f0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);

    // Cadre décoratif
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.stroke();

    // Motifs ésotériques autour du portrait
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const x = 100 + 80 * Math.cos(angle);
        const y = 100 + 80 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors.purple;
        ctx.fill();
    }

    // Silhouette stylisée
    ctx.fillStyle = colors.darkPurple;
    ctx.beginPath();
    ctx.arc(100, 90, 30, 0, Math.PI * 2); // Tête
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(70, 100);
    ctx.quadraticCurveTo(100, 180, 130, 100); // Corps
    ctx.fill();

    // Nom de l'auteur
    ctx.font = '16px UnifrakturMaguntia';
    ctx.fillStyle = colors.gold;
    ctx.textAlign = 'center';
    ctx.fillText(authorName, 100, 180);

    return canvas;
}

// Fonction principale pour remplacer les images manquantes
function replaceAllMissingImages() {
    // Remplacer les symboles d'en-tête
    const headerSymbols = {
        'cosmic-seal': document.querySelector('.header-seal[src*="cosmic-seal.png"]'),
        'tree-of-life': document.querySelector('.header-seal[src*="tree-of-life.png"]'),
        'pentagram': document.querySelector('.header-seal[src*="pentagram.png"]'),
        'crystal': document.querySelector('.header-seal[src*="crystal.png"]'),
        'key': document.querySelector('.header-seal[src*="key.png"]'),
        'ouroboros': document.querySelector('.header-seal[src*="ouroboros.png"]'),
        'quill': document.querySelector('.header-seal[src*="quill.png"]')
    };

    Object.entries(headerSymbols).forEach(([type, element]) => {
        if (element) {
            const canvas = generateSymbol(type);
            element.src = canvas.toDataURL();
        }
    });

    // Remplacer les livres
    const bookElements = document.querySelectorAll('.book-image, .manuscript-image');
    bookElements.forEach(element => {
        const title = element.alt;
        const canvas = generateBook(title);
        element.src = canvas.toDataURL();
    });

    // Remplacer les portraits d'auteurs
    const authorElements = document.querySelectorAll('.author-portrait');
    authorElements.forEach(element => {
        const authorName = element.alt;
        const canvas = generateAuthorPortrait(authorName);
        element.src = canvas.toDataURL();
    });

    // Appliquer les textures
    document.querySelectorAll('[style*="manuscript-bg.png"]').forEach(element => {
        const canvas = generateTexture('manuscript-bg');
        element.style.backgroundImage = `url(${canvas.toDataURL()})`;
    });

    document.querySelectorAll('[style*="constellation-pattern.png"]').forEach(element => {
        const canvas = generateTexture('constellation-pattern');
        element.style.backgroundImage = `url(${canvas.toDataURL()})`;
    });
}

// Fonction pour déboguer le remplacement des images
function debugImageReplacement(element, newSrc) {
    console.log('Remplacement d\'image:', {
        'élément trouvé': !!element,
        'ancien src': element?.src,
        'nouveau src': newSrc?.slice(0, 50) + '...',
        'type d\'élément': element?.tagName,
        'classe': element?.className
    });
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('Début du remplacement des images...');
    
    // Force le remplacement immédiat
    setTimeout(() => {
        replaceAllMissingImages();
        
        // Vérifie si des images sont toujours manquantes
        const missingImages = document.querySelectorAll('img[src=""], img:not([src])');
        if (missingImages.length > 0) {
            console.log('Images encore manquantes:', missingImages.length);
            // Deuxième tentative de remplacement
            replaceAllMissingImages();
        }
    }, 100);

    // Vérifie les images après un court délai
    setTimeout(() => {
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (!img.src || img.src === window.location.href) {
                console.log('Image à corriger:', img);
                const canvas = generateGenericImage(img.alt || 'Image mystique');
                img.src = canvas.toDataURL();
            }
        });
    }, 500);
});