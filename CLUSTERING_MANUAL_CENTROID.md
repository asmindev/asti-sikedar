# 📍 Manual Centroid Input - Dokumentasi

## 🎯 Fitur Baru: Input Centroid Manual

Sistem clustering sekarang mendukung **2 mode inisialisasi centroid**:

### 1. **Mode Otomatis (K-means++)** - Default
- Menggunakan algoritma K-means++ untuk menentukan centroid awal secara optimal
- Centroid dipilih secara pintar untuk menghindari konvergensi lokal yang buruk
- Hasil konsisten dengan `seed: 42`

### 2. **Mode Manual** - Baru! ✨
- Anda dapat menentukan 3 centroid awal secara manual
- Input dalam bentuk persentase (0-100) untuk Knowledge, Attitude, Behavior
- Berguna untuk eksperimen atau jika Anda memiliki pengetahuan domain tertentu

---

## 🔧 Cara Menggunakan Manual Centroid

### Langkah 1: Aktifkan Mode Manual
1. Buka halaman **Analisis Cluster**
2. Di bagian **"Pengaturan Centroid"**, klik tombol **"Input Manual"**
3. Form input untuk 3 cluster akan muncul

### Langkah 2: Masukkan Nilai Centroid
Isi nilai persentase (0-100) untuk setiap dimensi KAB di 3 cluster:

#### **Cluster 1 (Low)** - Skor Rendah
- Knowledge: misalnya `50`
- Attitude: misalnya `50`
- Behavior: misalnya `50`

#### **Cluster 2 (Medium)** - Skor Sedang
- Knowledge: misalnya `75`
- Attitude: misalnya `75`
- Behavior: misalnya `75`

#### **Cluster 3 (High)** - Skor Tinggi
- Knowledge: misalnya `95`
- Attitude: misalnya `95`
- Behavior: misalnya `95`

### Langkah 3: Jalankan Clustering
1. Klik tombol **"Jalankan K-Means"**
2. Algoritma akan menggunakan centroid yang Anda tentukan sebagai titik awal
3. K-means akan iterasi untuk mengoptimalkan cluster

### Langkah 4: Kembali ke Mode Auto
- Klik tombol **"Gunakan Auto (K-means++)"** untuk kembali ke mode otomatis

---

## 📊 Contoh Skenario Penggunaan

### Skenario 1: Standar Konservatif
Jika Anda ingin standar yang lebih ketat:
```
Cluster 1 (Low):    K=40,  A=40,  B=40   (40% dari maksimal)
Cluster 2 (Medium): K=70,  A=70,  B=70   (70% dari maksimal)
Cluster 3 (High):   K=90,  A=90,  B=90   (90% dari maksimal)
```

### Skenario 2: Fokus pada Knowledge
Jika Knowledge lebih penting:
```
Cluster 1 (Low):    K=50,  A=60,  B=60
Cluster 2 (Medium): K=75,  A=80,  B=80
Cluster 3 (High):   K=95,  A=90,  B=90
```

### Skenario 3: Balanced
Distribusi merata:
```
Cluster 1 (Low):    K=60,  A=60,  B=60
Cluster 2 (Medium): K=80,  A=80,  B=80
Cluster 3 (High):   K=95,  A=95,  B=95
```

---

## ⚙️ Technical Details

### Format Data & Normalisasi (UPDATED v1.2)

**🎯 PERBAIKAN BESAR**: Sekarang sistem menggunakan **2 mode normalisasi berbeda**:

#### Mode 1: Manual Centroid → Fixed Range (0-100)
```javascript
// Ketika Anda input centroid manual:
Min = 0, Max = 100 (FIXED)

// Contoh dengan data aktual 80-100:
Data: [80, 85, 90, 95, 100]
Normalized: [0.80, 0.85, 0.90, 0.95, 1.00]

Centroid Manual: [50, 75, 95]
Normalized: [0.50, 0.75, 0.95]

✅ SEKARANG BISA GUNAKAN NILAI 0-100 BEBAS!
```

#### Mode 2: Auto K-means++ → Data Range (Optimal)
```javascript
// Ketika mode auto:
Min = data aktual min (misal 80)
Max = data aktual max (misal 100)

Data: [80, 85, 90, 95, 100]
Normalized: [0.00, 0.25, 0.50, 0.75, 1.00]

✅ Clustering optimal karena menggunakan range data aktual!
```

### Kenapa 2 Mode?

**Mode Manual (Fixed 0-100)**:
- ✅ Intuitif: 50% benar-benar berarti setengah dari maksimal
- ✅ Konsisten: Tidak peduli data, centroid tetap berarti sama
- ✅ Fleksibel: Bisa set di mana saja (0-100)
- ⚠️ Trade-off: Jika data semua tinggi (80-100), cluster mungkin kurang optimal

**Mode Auto (Data Range)**:
- ✅ Optimal: Clustering terbaik untuk distribusi data
- ✅ Sensitive: Memanfaatkan variasi data sepenuhnya
- ⚠️ Trade-off: Range berubah sesuai data

### Algoritma Flow
```
1. User input centroid manual (dalam %)
2. Convert ke normalized values (0-1)
3. Pass ke ml-kmeans dengan option: initialization = [centroid array]
4. K-means iterasi dari centroid tersebut
5. Hasil clustering dengan label berdasarkan avg score
```

### Fungsi yang Dimodifikasi
- `performKMeans()`: Menerima parameter `manualCentroids`
- `performFullClustering()`: Menerima dan forward `manualCentroids`
- `Analysis.jsx`: UI untuk input centroid dan toggle mode

---

## 🎓 Tips & Best Practices

### ✅ DO:
- Pastikan centroid terpisah jelas (jangan terlalu dekat)
- Low < Medium < High untuk hasil yang intuitif
- Test dengan auto mode dulu untuk referensi
- Dokumentasikan centroid yang digunakan jika untuk produksi

### ❌ DON'T:
- Jangan gunakan centroid yang identik
- Jangan gunakan nilai ekstrem (0 atau 100) kecuali perlu
- Jangan asumsikan urutan cluster = urutan label (sistem auto-label berdasarkan avg)

---

## 🐛 Troubleshooting

### Masalah: "Harap isi semua nilai centroid"
**Solusi**: Pastikan semua 9 field terisi (3 cluster × 3 dimensi KAB)

### Masalah: Hasil clustering tidak sesuai ekspektasi
**Solusi (UPDATED v1.2)**:
1. **GUNAKAN NILAI BEBAS 0-100!**
   - Sistem sekarang menggunakan fixed range, jadi 50% = 50%
   - Tidak perlu menyesuaikan dengan range data lagi

2. **Rekomendasi centroid standard**:
   ```
   Low:    50-60 (performa rendah)
   Medium: 70-80 (performa sedang)
   High:   90-95 (performa tinggi)
   ```

3. **Jika masih tidak sesuai**:
   - Pisahkan centroid lebih jauh (misal: 40, 70, 95)
   - Atau lebih dekat (misal: 70, 80, 90)
   - Bandingkan dengan hasil auto mode

**Update**: Tidak ada lagi masalah "di luar range"!### Masalah: Label cluster tidak berurutan
**Info**: Ini normal! Label ditentukan berdasarkan rata-rata skor, bukan nomor cluster.

---

## 📝 Changelog

### v1.2.0 - Fixed Range Normalization
- 🎯 **MAJOR FIX**: Mode manual sekarang gunakan fixed range (0-100)
- ✅ Centroid manual bebas 0-100, tidak terbatas range data
- 🔄 Mode auto tetap gunakan data range untuk optimasi
- 📊 Logging lebih informatif untuk debugging
- 📖 Update dokumentasi dengan penjelasan 2 mode

### v1.1.0 - Manual Centroid Feature
- ✨ Tambah support manual centroid input
- 🎨 UI form untuk input 3 cluster dengan 9 parameter
- 🔄 Toggle button untuk switch antara auto/manual mode
- 📊 Visual feedback dengan color-coded clusters
- 🐛 Validasi input untuk ensure semua field terisi

---

## 🔗 Related Files

- `algoritma.js` - Core clustering logic
- `Analysis.jsx` - UI component untuk input
- `clusterService.js` - Service untuk save results
- `ClusterController.php` - Backend handler

---

**Happy Clustering! 🎉**
