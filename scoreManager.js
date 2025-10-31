// ScoreManager sınıfı - Puanlama sistemini yönetir

class ScoreManager {
    constructor() {
        this.score = 0;
        this.linesCleared = 0;
        this.level = 1;
        
        // Puanlama kuralları
        this.lineScores = {
            1: 100,  // Single
            2: 200,  // Double  
            3: 500,  // Triple
            4: 800   // Tetris
        };
    }

    // Skoru sıfırla
    reset() {
        this.score = 0;
        this.linesCleared = 0;
        this.level = 1;
    }

    // Satır temizleme puanı ekle
    addLineScore(linesCount) {
        if (linesCount > 0 && linesCount <= 4) {
            const points = this.lineScores[linesCount] * this.level;
            this.score += points;
            this.linesCleared += linesCount;
            
            // Level artırma (her 10 satırda bir)
            this.level = Math.floor(this.linesCleared / 10) + 1;
            
            return points;
        }
        return 0;
    }

    // Mevcut skoru al
    getScore() {
        return this.score;
    }

    // Temizlenen satır sayısını al
    getLinesCleared() {
        return this.linesCleared;
    }

    // Mevcut seviyeyi al
    getLevel() {
        return this.level;
    }

    // Skor bilgilerini obje olarak döndür
    getScoreInfo() {
        return {
            score: this.score,
            linesCleared: this.linesCleared,
            level: this.level
        };
    }
}