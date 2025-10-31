// InputHandler sınıfı - Klavye girişlerini yönetir

class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.lastMoveTime = 0;
        this.moveDelay = 100; // ms
        
        this.setupEventListeners();
    }

    // Event listener'ları kur
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    // Tuş basma olayını işle
    handleKeyDown(event) {
        const key = event.code;
        
        // Oyun durmuşsa input'ları işleme
        if (this.game.isGameOver()) {
            if (key === 'Space' || key === 'Enter') {
                this.game.restart();
            }
            return;
        }
        
        // Tekrarlanan tuş basımlarını önle
        if (this.keys[key]) {
            return;
        }
        
        this.keys[key] = true;
        
        const currentTime = Date.now();
        
        switch (key) {
            case 'ArrowLeft':
                if (currentTime - this.lastMoveTime > this.moveDelay) {
                    this.game.movePieceLeft();
                    this.lastMoveTime = currentTime;
                }
                break;
                
            case 'ArrowRight':
                if (currentTime - this.lastMoveTime > this.moveDelay) {
                    this.game.movePieceRight();
                    this.lastMoveTime = currentTime;
                }
                break;
                
            case 'ArrowDown':
                this.game.movePieceDown();
                break;
                
            case 'ArrowUp':
                this.game.rotatePiece();
                break;
                
            case 'Space':
                this.game.hardDrop();
                break;
        }
        
        event.preventDefault();
    }

    // Tuş bırakma olayını işle
    handleKeyUp(event) {
        const key = event.code;
        this.keys[key] = false;
    }

    // Input handler'ı temizle
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }
}