// TetrisGame sınıfı - Ana oyun kontrolcüsü

class TetrisGame {
    constructor(gameCanvas, nextPieceCanvas) {
        this.gameCanvas = gameCanvas;
        this.nextPieceCanvas = nextPieceCanvas;
        
        // Oyun bileşenleri
        this.gameBoard = new GameBoard(10, 20);
        this.tetrominoFactory = new TetrominoFactory();
        this.scoreManager = new ScoreManager();
        this.renderer = new Renderer(gameCanvas, nextPieceCanvas);
        this.inputHandler = new InputHandler(this);
        
        // Oyun durumu
        this.gameRunning = false;
        this.gameOverState = false;
        this.dropTimer = null;
        this.dropInterval = 500; // ms
        
        // UI elementleri
        this.scoreElement = document.getElementById('score');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-button');
        
        this.setupRestartButton();
    }

    // Restart butonunu ayarla
    setupRestartButton() {
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => this.restart());
        }
    }

    // Oyunu başlat
    start() {
        this.gameRunning = true;
        this.gameOverState = false;
        
        // İlk parçaları oluştur
        this.gameBoard.setActivePiece(this.tetrominoFactory.createRandomPiece());
        this.gameBoard.setNextPiece(this.tetrominoFactory.createRandomPiece());
        
        // UI'yi güncelle
        this.updateUI();
        this.hideGameOverScreen();
        
        // Oyun döngüsünü başlat
        this.startGameLoop();
        
        console.log('Tetris oyunu başladı!');
    }

    // Oyunu yeniden başlat
    restart() {
        this.stop();
        this.gameBoard.clearGrid();
        this.scoreManager.reset();
        this.start();
    }

    // Oyunu durdur
    stop() {
        this.gameRunning = false;
        if (this.dropTimer) {
            clearInterval(this.dropTimer);
            this.dropTimer = null;
        }
    }

    // Oyun döngüsünü başlat
    startGameLoop() {
        this.dropTimer = setInterval(() => {
            if (this.gameRunning && !this.gameOverState) {
                this.update();
            }
        }, this.dropInterval);
    }

    // Oyun durumunu güncelle
    update() {
        // Parçayı aşağı hareket ettir
        if (!this.movePieceDown()) {
            // Parça yerleşti, yeni parça oluştur
            this.lockCurrentPiece();
        }
        
        // Ekranı güncelle
        this.render();
    }

    // Mevcut parçayı kilitle
    lockCurrentPiece() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece) {
            // Parçayı board'a yerleştir
            this.gameBoard.placePiece(activePiece);
            
            // Satırları temizle
            const clearedLines = this.gameBoard.clearLines();
            if (clearedLines > 0) {
                this.scoreManager.addLineScore(clearedLines);
                this.updateUI();
            }
            
            // Yeni parça oluştur
            this.spawnNextPiece();
        }
    }

    // Sonraki parçayı spawn et
    spawnNextPiece() {
        const nextPiece = this.gameBoard.nextPiece;
        
        // Yeni parçanın spawn edilip edilemeyeceğini kontrol et
        if (nextPiece && this.gameBoard.checkCollision(nextPiece, 0, 0)) {
            this.gameOver();
            return;
        }
        
        // Parçaları güncelle
        this.gameBoard.setActivePiece(nextPiece);
        this.gameBoard.setNextPiece(this.tetrominoFactory.createRandomPiece());
    }

    // Oyun bitti
    gameOver() {
        this.gameOverState = true;
        this.gameRunning = false;
        this.showGameOverScreen();
        console.log('Oyun bitti! Final skoru:', this.scoreManager.getScore());
    }

    // Oyunun bitip bitmediğini kontrol et
    isGameOver() {
        return this.gameOverState;
    }

    // UI'yi güncelle
    updateUI() {
        if (this.scoreElement) {
            this.scoreElement.textContent = this.scoreManager.getScore();
        }
    }

    // Game over ekranını göster
    showGameOverScreen() {
        if (this.gameOverScreen && this.finalScoreElement) {
            this.finalScoreElement.textContent = this.scoreManager.getScore();
            this.gameOverScreen.classList.remove('hidden');
        }
    }

    // Game over ekranını gizle
    hideGameOverScreen() {
        if (this.gameOverScreen) {
            this.gameOverScreen.classList.add('hidden');
        }
    }

    // Parçayı sola hareket ettir
    movePieceLeft() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece && this.gameBoard.canMovePiece(activePiece, -1, 0)) {
            activePiece.move(-1, 0);
            this.render();
            return true;
        }
        return false;
    }

    // Parçayı sağa hareket ettir
    movePieceRight() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece && this.gameBoard.canMovePiece(activePiece, 1, 0)) {
            activePiece.move(1, 0);
            this.render();
            return true;
        }
        return false;
    }

    // Parçayı aşağı hareket ettir
    movePieceDown() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece && this.gameBoard.canMovePiece(activePiece, 0, 1)) {
            activePiece.move(0, 1);
            this.render();
            return true;
        }
        return false;
    }

    // Parçayı döndür
    rotatePiece() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece && this.gameBoard.canRotatePiece(activePiece)) {
            activePiece.rotate();
            this.render();
            return true;
        }
        return false;
    }

    // Hard drop (parçayı en alta düşür)
    hardDrop() {
        const activePiece = this.gameBoard.activePiece;
        if (activePiece) {
            while (this.gameBoard.canMovePiece(activePiece, 0, 1)) {
                activePiece.move(0, 1);
            }
            this.render();
            this.lockCurrentPiece();
        }
    }

    // Ekranı çiz
    render() {
        this.renderer.renderGame(this.gameBoard, this.gameBoard.activePiece);
        this.renderer.renderNextPiece(this.gameBoard.nextPiece);
    }
}