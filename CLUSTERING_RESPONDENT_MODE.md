# 👥 Respondent-Based Centroid Selection

## 🎯 Fitur Baru: Pilih Responden Sebagai Centroid (v1.3)

Sekarang Anda bisa **memilih data aktual responden** sebagai centroid awal untuk clustering!

### 🌟 Keunggulan Mode Respondent

✅ **Data-Driven**: Menggunakan data nyata dari responden Anda
✅ **Intuitif**: Pilih berdasarkan nama & skor, bukan angka abstrak
✅ **Reprodusibel**: Hasil konsisten karena menggunakan data konkrit
✅ **Domain Knowledge**: Memanfaatkan pengetahuan Anda tentang karyawan

---

## 🔧 Cara Menggunakan

### Langkah 1: Pilih Mode Respondent
1. Buka halaman **Analisis Cluster**
2. Di bagian **"Pengaturan Centroid"**
3. Klik tombol **"Pilih Responden"**

### Langkah 2: Pilih 3 Responden
Pilih 3 responden yang akan dijadikan centroid untuk masing-masing cluster:

#### **Centroid 1 (Low Performance)**
- Pilih responden dengan **skor rendah**
- Contoh: Avg 82% - 85%
- Ini akan menjadi pusat cluster performa rendah

#### **Centroid 2 (Medium Performance)**
- Pilih responden dengan **skor sedang**
- Contoh: Avg 88% - 92%
- Ini akan menjadi pusat cluster performa sedang

#### **Centroid 3 (High Performance)**
- Pilih responden dengan **skor tinggi**
- Contoh: Avg 95% - 100%
- Ini akan menjadi pusat cluster performa tinggi

### Langkah 3: Lihat Preview
Setelah memilih responden, sistem akan menampilkan:
- Nama responden
- Skor K, A, B masing-masing
- Rata-rata skor total

### Langkah 4: Jalankan Clustering
1. Klik **"Jalankan K-Means"**
2. Sistem menggunakan skor KAB dari responden terpilih sebagai centroid awal
3. K-means iterasi dari titik-titik tersebut

---

## 📊 Contoh Penggunaan

### Skenario: Perusahaan dengan 40 Karyawan

**Data Responden** (diurutkan dari tertinggi):
```
1. RICKI RIONART - Avg: 100.00%  (K:100, A:100, B:100)
2. M ZUHRI        - Avg: 88.57%   (K:85.7, A:88.6, B:91.4)
3. YON YUVIARSO   - Avg: 83.81%   (K:85.7, A:82.9, B:82.9)
4. HERYA SAKTI    - Avg: 83.81%   (K:80.0, A:82.9, B:88.6)
...
40. KARYAWAN XYZ  - Avg: 80.00%   (K:80.0, A:80.0, B:80.0)
```

**Pilihan Centroid**:
- **Low**: Pilih KARYAWAN XYZ (Avg: 80%)
- **Medium**: Pilih HERYA SAKTI (Avg: 83.81%)
- **High**: Pilih RICKI RIONART (Avg: 100%)

**Hasil**: K-means akan mengelompokkan karyawan lain berdasarkan kedekatan ke 3 centroid ini.

---

## 💡 Tips & Best Practices

### ✅ DO:
- **Pilih yang representatif**: Centroid harus mewakili cluster yang diinginkan
- **Pisahkan jarak**: Pilih responden dengan skor yang cukup jauh (misal: 80%, 88%, 98%)
- **Gunakan domain knowledge**: Jika Anda tahu siapa karyawan terbaik/terburuk, gunakan itu
- **Cek preview**: Pastikan skor K, A, B sesuai ekspektasi sebelum run

### ❌ DON'T:
- **Jangan pilih yang terlalu dekat**: Misal jangan 85%, 86%, 87% (terlalu mirip)
- **Jangan pilih outlier ekstrem**: Kecuali memang itu yang diinginkan
- **Jangan acak**: Pilih dengan pertimbangan, bukan random

---

## 🔍 Perbedaan 3 Mode

### Mode Auto (K-means++)
- 🤖 Otomatis pilih centroid optimal
- ⚡ Cepat dan efisien
- 📊 Menggunakan algoritma K-means++
- ✅ **Gunakan jika**: Tidak ada preferensi khusus

### Mode Respondent (NEW!)
- 👥 Pilih responden nyata sebagai centroid
- 🎯 Data-driven dan intuitif
- 🔍 Reprodusibel dan traceable
- ✅ **Gunakan jika**: Anda tahu karyawan mana yang representatif

### Mode Manual
- ✍️ Input angka langsung (0-100)
- 🧪 Eksperimental dan fleksibel
- 🎨 Full control atas centroid
- ✅ **Gunakan jika**: Anda punya teori/hypothesis tertentu

---

## ⚙️ Technical Details

### Algoritma Flow
```
1. User pilih 3 responden dari dropdown
2. Sistem ambil scoreK, scoreA, scoreB dari responden terpilih
3. Centroid = [[R1.K, R1.A, R1.B], [R2.K, R2.A, R2.B], [R3.K, R3.A, R3.B]]
4. Normalisasi dengan fixed range 0-100 (sama seperti mode manual)
5. K-means iterasi dari centroid tersebut
6. Clustering dan pelabelan otomatis berdasarkan avg score
```

### Data Structure
```javascript
// Responden dengan skor
{
  id: 1,
  employee: { name: "RICKI RIONART" },
  scoreK: 100.00,
  scoreA: 100.00,
  scoreB: 100.00,
  avgScore: 100.00
}

// Centroid yang dikirim ke algoritma
centroids = [
  [80.00, 80.00, 80.00],   // Low
  [88.57, 88.57, 88.57],   // Medium
  [100.00, 100.00, 100.00] // High
]
```

---

## 🐛 Troubleshooting

### Masalah: "Harap pilih 3 responden sebagai centroid"
**Solusi**: Pastikan sudah memilih responden untuk ketiga slot (Low, Medium, High)

### Masalah: Hasil clustering tidak sesuai
**Solusi**:
1. Cek apakah responden yang dipilih cukup terpisah skornya
2. Coba pilih responden dengan range yang lebih lebar
3. Bandingkan dengan mode Auto untuk referensi

### Masalah: Tidak bisa menemukan responden tertentu
**Info**: Daftar diurutkan dari skor tertinggi ke terendah. Gunakan scroll untuk mencari.

---

## 📝 Changelog

### v1.3.0 - Respondent-Based Centroid Selection
- 🎯 **NEW**: Mode "Pilih Responden" untuk centroid selection
- 👥 Dropdown list responden dengan sorting by avg score
- 📊 Live preview skor K, A, B untuk responden terpilih
- 🎨 UI dengan 3 kolom color-coded (Red/Yellow/Green)
- 🔄 Seamless integration dengan mode Auto & Manual
- 📖 Dokumentasi lengkap dengan contoh use case

---

## 🔗 Related Files

- `Analysis.jsx` - UI untuk mode selection dan dropdown
- `algoritma.js` - Clustering logic (unchanged, backward compatible)
- `ClusterController.php` - Backend (no changes needed)

---

**Happy Data-Driven Clustering! 👥🎯**
