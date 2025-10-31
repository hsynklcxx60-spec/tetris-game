// Renderer sınıfı - Oyun görsellerini çizer

class Renderer {
    constructor(gameCanvas, nextPieceCanvas) {
        this.gameCanvas = gameCanvas;
        this.nextPieceCanvas = nextPieceCanvas;
        this.gameCtx = gameCanvas.getContext('2d');
        this.nextPieceCtx = nextPieceCanvas.getContext('2d');
        
        // Blok boyutu
        this.blockSize = 30;
        
        // Grid çizgi rengi
        this.gridColor = '#333333';
        this.borderColor = '#666666';
    }

    // Ana oyun alanını çiz
    renderGame(gameBoard, activePiece) {
        this.clearCanvas(this.gameCtx, this.gameCanvas.width, this.gameCanvas.height);
        
        // Grid çizgilerini çiz
        this.drawGrid();
        
        // Yerleşmiş parçaları çiz
        this.drawBoard(gameBoard);
        
        // Aktif parçayı çiz
        if (activePiece) {
            this.drawPiece(activePiece, this.gameCtx);
        }
    }

    // Sonraki parçayı çiz
    renderNextPiece(nextPiece) {
        this.clearCanvas(this.nextPieceCtx, this.nextPieceCanvas.width, this.nextPieceCanvas.height);
        
        if (nextPiece) {
            // Parçayı merkeze yerleştir
            const centerX = Math.floor(this.nextPieceCanvas.width / 2 / this.blockSize);
            const centerY = Math.floor(this.nextPieceCanvas.height / 2 / this.blockSize);
            
            const tempPiece = nextPiece.clone();
            tempPiece.x = centerX - Math.floor(tempPiece.shape[0].length / 2);
            tempPiece.y = centerY - Math.floor(tempPiece.shape.length / 2);
            
            this.drawPiece(tempPiece, this.nextPieceCtx);
        }
    }

    // Canvas'ı temizle
    clearCanvas(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    }

    // Grid çizgilerini çiz
    drawGrid() {
        const ctx = this.gameCtx;
        const width = this.gameCanvas.width;
        const height = this.gameCanvas.height;
        
        ctx.strokeStyle = this.gridColor;
        ctx.lineWidth = 1;
        
        // Dikey çizgiler
        for (let x = 0; x <= width; x += this.blockSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Yatay çizgiler
        for (let y = 0; y <= height; y += this.blockSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    // Board'daki yerleşmiş parçaları çiz
    drawBoard(gameBoard) {
        const grid = gameBoard.getGrid();
        
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] !== 0) {
                    this.drawBlock(x, y, grid[y][x], this.gameCtx);
                }
            }
        }
    }

    // Tek bir parçayı çiz
    drawPiece(piece, ctx) {
        const blocks = piece.getBlocks();
        
        for (const block of blocks) {
            if (block.y >= 0) { // Sadece görünür blokları çiz
                this.drawBlock(block.x, block.y, piece.color, ctx);
            }
        }
    }

    // Tek bir blok çiz
    drawBlock(x, y, color, ctx) {
        const pixelX = x * this.blockSize;
        const pixelY = y * this.blockSize;
        
        // Blok dolgusu
        ctx.fillStyle = color;
        ctx.fillRect(pixelX, pixelY, this.blockSize, this.blockSize);
        
        // Blok kenarlığı
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(pixelX, pixelY, this.blockSize, this.blockSize);
    }
}