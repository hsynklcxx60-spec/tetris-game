# Tetris Oyununu Ağda Paylaşma Rehberi

## Yöntem 1: Python ile (Önerilen)

Eğer Python yüklüyse:
```bash
python -m http.server 8000
```

## Yöntem 2: Node.js ile

Eğer Node.js yüklüyse:
```bash
npx http-server -p 8000
```

## Yöntem 3: Visual Studio Code Live Server

1. VS Code'da Live Server extension'ını yükleyin
2. index.html'e sağ tıklayın
3. "Open with Live Server" seçin

## Yöntem 4: Online Hosting (Ücretsiz)

### GitHub Pages:
1. GitHub'da yeni repo oluşturun
2. Tüm dosyaları upload edin
3. Settings > Pages > Source: Deploy from branch
4. main branch seçin
5. Birkaç dakika sonra oyun https://kullaniciadi.github.io/repo-adi adresinde erişilebilir olur

### Netlify Drop:
1. https://app.netlify.com/drop adresine gidin
2. Tüm dosyaları sürükleyip bırakın
3. Otomatik olarak bir URL verilir

### Vercel:
1. https://vercel.com adresine gidin
2. Dosyaları upload edin
3. Otomatik deployment

## Yöntem 5: Yerel Ağ Paylaşımı

Windows'ta dosya paylaşımı:
1. Oyun klasörüne sağ tıklayın
2. Properties > Sharing > Advanced Sharing
3. "Share this folder" işaretleyin
4. Diğer bilgisayarlar \\\\IP-ADRESI\\klasor-adi ile erişebilir

## IP Adresinizi Öğrenme

Windows'ta:
```cmd
ipconfig
```

Yerel ağdaki IP adresinizi bulun (genellikle 192.168.x.x)

## Güvenlik Notu

- Sadece güvendiğiniz ağlarda paylaşın
- Firewall ayarlarını kontrol edin
- Gerektiğinde port'ları açın (8000, 8080 vb.)