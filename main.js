// Ana başlatma dosyası
// Oyun başlatıldığında çalışacak kod

document.addEventListener('DOMContentLoaded', function() {
    console.log('Tetris oyunu yükleniyor...');
    
    // Canvas elementlerini kontrol et
    const gameCanvas = document.getElementById('game-canvas');
    const nextPieceCanvas = document.getElementById('next-piece-canvas');
    
    if (!gameCanvas || !nextPieceCanvas) {
        console.error('Canvas elementleri bulunamadı!');
        return;
    }
    
    // Canvas context'lerini kontrol et
    const gameCtx = gameCanvas.getContext('2d');
    const nextPieceCtx = nextPieceCanvas.getContext('2d');
    
    if (!gameCtx || !nextPieceCtx) {
        console.error('Canvas context alınamadı!');
        return;
    }
    
    console.log('Canvas elementleri hazır. Oyun başlatılıyor...');
    
    try {
        // Oyunu başlat
        const game = new TetrisGame(gameCanvas, nextPieceCanvas);
        game.start();
        
        console.log('Tetris oyunu başarıyla başlatıldı!');
        
        // Global erişim için (debugging)
        window.tetrisGame = game;
        
    } catch (error) {
        console.error('Oyun başlatılırken hata oluştu:', error);
    }
});