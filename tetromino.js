// Tetromino sınıfı - Tetris parçalarını temsil eder

class Tetromino {
    constructor(type, shape, color, x = 4, y = 0) {
        this.type = type;
        this.shape = shape;
        this.color = color;
        this.x = x; // Board üzerindeki x pozisyonu
        this.y = y; // Board üzerindeki y pozisyonu
    }

    // Parçanın tüm bloklarının mutlak pozisyonlarını döndürür
    getBlocks() {
        const blocks = [];
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col]) {
                    blocks.push({
                        x: this.x + col,
                        y: this.y + row
                    });
                }
            }
        }
        return blocks;
    }

    // Parçayı hareket ettir
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // Parçayı 90 derece saat yönünde döndür
    rotate() {
        // O parçası döndürülmez
        if (this.type === 'O') {
            return;
        }

        const size = this.shape.length;
        const rotated = Array(size).fill().map(() => Array(size).fill(0));

        // 90 derece saat yönünde döndürme matrisi
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                rotated[col][size - 1 - row] = this.shape[row][col];
            }
        }

        this.shape = rotated;
    }

    // Döndürülmüş halinin kopyasını döndür (test için)
    getRotated() {
        const rotated = this.clone();
        rotated.rotate();
        return rotated;
    }

    // Parçanın kopyasını oluştur
    clone() {
        const clonedShape = this.shape.map(row => [...row]);
        return new Tetromino(this.type, clonedShape, this.color, this.x, this.y);
    }
}

// Tetris parça şekilleri ve renkleri
const TETROMINO_SHAPES = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '#00FFFF' // Cyan
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#FFFF00' // Yellow
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#800080' // Purple
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: '#00FF00' // Green
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: '#FF0000' // Red
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#0000FF' // Blue
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#FFA500' // Orange
    }
};