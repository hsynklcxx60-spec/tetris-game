// GameBoard sınıfı - Oyun tahtasını yönetir

class GameBoard {
    constructor(width = 10, height = 20) {
        this.width = width;
        this.height = height;
        this.grid = this.createEmptyGrid();
        this.activePiece = null;
        this.nextPiece = null;
    }

    // Boş grid oluştur
    createEmptyGrid() {
        return Array(this.height).fill().map(() => Array(this.width).fill(0));
    }

    // Grid'i temizle
    clearGrid() {
        this.grid = this.createEmptyGrid();
    }

    // Belirli bir hücreyi al
    getCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return -1; // Sınır dışı
        }
        return this.grid[y][x];
    }

    // Belirli bir hücreyi ayarla
    setCell(x, y, value) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.grid[y][x] = value;
        }
    }

    // Pozisyonun geçerli olup olmadığını kontrol et
    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    // Pozisyonun boş olup olmadığını kontrol et
    isEmpty(x, y) {
        return this.isValidPosition(x, y) && this.getCell(x, y) === 0;
    }

    // Parçanın belirli pozisyonda çarpışma olup olmadığını kontrol et
    checkCollision(piece, offsetX = 0, offsetY = 0) {
        const blocks = piece.getBlocks();
        
        for (const block of blocks) {
            const newX = block.x + offsetX;
            const newY = block.y + offsetY;
            
            // Sınır kontrolü
            if (newX < 0 || newX >= this.width || newY >= this.height) {
                return true; // Çarpışma var
            }
            
            // Üst sınır kontrolü (parça henüz görünmeyebilir)
            if (newY < 0) {
                continue;
            }
            
            // Mevcut parçalarla çarpışma kontrolü
            if (this.grid[newY][newX] !== 0) {
                return true; // Çarpışma var
            }
        }
        
        return false; // Çarpışma yok
    }

    // Parçanın hareket edip edemeyeceğini kontrol et
    canMovePiece(piece, dx, dy) {
        return !this.checkCollision(piece, dx, dy);
    }

    // Parçanın döndürülüp döndürülemeyeceğini kontrol et
    canRotatePiece(piece) {
        const rotatedPiece = piece.getRotated();
        return !this.checkCollision(rotatedPiece, 0, 0);
    }

    // Parçayı board'a yerleştir (kilitle)
    placePiece(piece) {
        const blocks = piece.getBlocks();
        
        for (const block of blocks) {
            if (block.y >= 0) { // Sadece görünür alandaki blokları yerleştir
                this.setCell(block.x, block.y, piece.color);
            }
        }
    }

    // Aktif parçayı ayarla
    setActivePiece(piece) {
        this.activePiece = piece;
    }

    // Sonraki parçayı ayarla
    setNextPiece(piece) {
        this.nextPiece = piece;
    }

    // Oyunun bitip bitmediğini kontrol et
    isGameOver() {
        // Üst satırlarda blok varsa oyun bitti
        for (let x = 0; x < this.width; x++) {
            if (this.grid[0][x] !== 0) {
                return true;
            }
        }
        return false;
    }

    // Tamamlanmış satırları temizle
    clearLines() {
        const completedLines = [];
        
        // Tamamlanmış satırları bul
        for (let y = 0; y < this.height; y++) {
            let isComplete = true;
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] === 0) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) {
                completedLines.push(y);
            }
        }
        
        // Tamamlanmış satırları kaldır ve üstteki satırları aşağı kaydır
        for (let i = completedLines.length - 1; i >= 0; i--) {
            const lineIndex = completedLines[i];
            
            // Satırı kaldır
            this.grid.splice(lineIndex, 1);
            
            // Üste boş satır ekle
            this.grid.unshift(Array(this.width).fill(0));
        }
        
        return completedLines.length;
    }

    // Belirli bir satırın tamamlanıp tamamlanmadığını kontrol et
    isLineComplete(y) {
        for (let x = 0; x < this.width; x++) {
            if (this.grid[y][x] === 0) {
                return false;
            }
        }
        return true;
    }

    // Grid'in mevcut durumunu döndür
    getGrid() {
        return this.grid.map(row => [...row]);
    }
}