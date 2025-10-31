// TetrominoFactory sınıfı - Yeni Tetris parçaları oluşturur

class TetrominoFactory {
    constructor() {
        this.pieceTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    }

    // Rastgele bir Tetromino oluştur
    createRandomPiece() {
        const randomType = this.pieceTypes[Math.floor(Math.random() * this.pieceTypes.length)];
        return this.createPiece(randomType);
    }

    // Belirli bir tip Tetromino oluştur
    createPiece(type) {
        if (!TETROMINO_SHAPES[type]) {
            throw new Error(`Geçersiz parça tipi: ${type}`);
        }

        const pieceData = TETROMINO_SHAPES[type];
        const shape = pieceData.shape.map(row => [...row]); // Deep copy
        
        return new Tetromino(type, shape, pieceData.color);
    }

    // Tüm parça tiplerini döndür
    getAllPieceTypes() {
        return [...this.pieceTypes];
    }
}