# 📊 Penjelasan Detail Algoritma K-Means dalam Sistem Clustering

## 1. **Konsep Dasar K-Means**

### 1.1 Definisi

- K-Means adalah algoritma clustering yang membagi data ke dalam K kelompok berdasarkan kesamaan karakteristik
- Dalam sistem ini, K = 3 (3 cluster: Tinggi, Sedang, Rendah)
- Tujuan: Mengelompokkan pegawai berdasarkan skor Knowledge, Attitude, dan Behavior

### 1.2 Prinsip Kerja

- Setiap data point akan masuk ke cluster dengan centroid terdekat
- Menggunakan **Euclidean Distance** untuk mengukur jarak
- Iterasi dilakukan hingga centroid stabil

---

## 2. **Input Data dan Preprocessing**

### 2.1 Data Mentah (Questionnaire)

```javascript
// Setiap pegawai memiliki 21 jawaban kuesioner:
- K1, K2, K3, K4, K5, K6, K7 (Knowledge - 7 pertanyaan)
- A1, A2, A3, A4, A5, A6, A7 (Attitude - 7 pertanyaan)
- B1, B2, B3, B4, B5, B6, B7 (Behavior - 7 pertanyaan)
```

### 2.2 Skala Likert

- Setiap jawaban menggunakan skala **1-7**
- 1 = Sangat Tidak Setuju, 7 = Sangat Setuju

### 2.3 Perhitungan Skor KAB

```javascript
// Formula di calculateKABScores()
scoreK = (k1 + k2 + k3 + k4 + k5 + k6 + k7) / 7
scoreA = (a1 + a2 + a3 + a4 + a5 + a6 + a7) / 7
scoreB = (b1 + b2 + b3 + b4 + b5 + b6 + b7) / 7

// Hasil: Rata-rata dalam rentang 1-7
```

### 2.4 **Normalisasi: TIDAK DILAKUKAN** ⚠️

```javascript
// Fungsi normalizeData() TIDAK melakukan normalisasi
export const normalizeData = (arr) => {
    return {
        normalized: arr,  // Data asli tidak diubah
        min: 1,
        max: 7
    };
};
```

**Alasan:** Semua data sudah menggunakan skala yang sama (1-7)

---

## 3. **Inisialisasi Centroid**

### 3.1 Mode Manual Centroid (Direkomendasikan)

```javascript
const manualCentroids = [
    [4.71, 4.71, 4.86],  // C1 (Cluster 1)
    [4.71, 4.43, 4.71],  // C2 (Cluster 2)
    [4.29, 4.14, 4.14]   // C3 (Cluster 3)
];
```

### 3.2 Mode K-means++ (Otomatis)

```javascript
// Jika manualCentroids tidak diberikan
options.initialization = 'kmeans++';
```

---

## 4. **Parameter Algoritma**

### 4.1 Parameter Utama

```javascript
const options = {
    maxIterations: 100,   // Maksimal iterasi
    seed: 42,             // Random seed untuk reproducibility
    initialization: ...   // Mode inisialisasi centroid
};
```

### 4.2 Detail Parameter

- **maxIterations: 100** - Mencegah infinite loop
- **seed: 42** - Untuk hasil reproducible
- **k = 3** - Jumlah cluster yang diinginkan

---

## 5. **Perhitungan Jarak Euclidean**

### 5.1 Formula Matematika

```
d = √[(x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²]
```

### 5.2 Implementasi Kode

```javascript
const calculateEuclideanDistance = (point1, point2) => {
    const sum = point1.reduce((acc, val, idx) => {
        return acc + Math.pow(val - point2[idx], 2);
    }, 0);
    return Math.sqrt(sum);
};
```

### 5.3 Contoh Perhitungan

```
Data pegawai: [5.14, 4.86, 5.00]
Centroid C1:  [4.71, 4.71, 4.86]

d = √[(5.14 - 4.71)² + (4.86 - 4.71)² + (5.00 - 4.86)²]
d = √[0.1849 + 0.0225 + 0.0196] = √0.227 = 0.48
```

---

## 6. **Proses Iterasi K-Means**

### 6.1 Langkah-langkah Iterasi

**Iterasi 1:**

1. Mulai dengan centroid awal
2. Hitung jarak setiap data point ke semua centroid
3. Assign setiap data point ke cluster terdekat
4. Hitung centroid baru = rata-rata semua data point dalam cluster
5. Jika centroid berubah → lanjut ke iterasi 2

**Iterasi 2-100:**

- Ulangi langkah 2-5
- Berhenti jika centroid stabil atau mencapai maxIterations

### 6.2 Update Centroid

```javascript
// Centroid baru = rata-rata semua data point dalam cluster
New_C1_K = (sum of all K values in C1) / (count of data in C1)
New_C1_A = (sum of all A values in C1) / (count of data in C1)
New_C1_B = (sum of all B values in C1) / (count of data in C1)
```

---

## 7. **Assignment Data ke Cluster**

### 7.1 Proses Assignment

```javascript
// Untuk setiap data point
const distances = centroids.map(centroid =>
    calculateEuclideanDistance(currentPoint, centroid)
);

// Pilih cluster dengan jarak minimum
cluster = argMin(distances);
```

### 7.2 Contoh Output

```
=== Pegawai 1 ===
Skor: K=5.14, A=4.86, B=5.00
Jarak ke C1 = 0.48
Jarak ke C2 = 0.60
Jarak ke C3 = 1.26
→ Masuk Cluster: C1 (jarak terkecil)
```

```
Data pegawai: [5.14, 4.86, 5.00]
Centroid C1:  [4.71, 4.71, 4.86]

d = √[(5.14 - 4.71)² + (4.86 - 4.71)² + (5.00 - 4.86)²]
d = √[0.1849 + 0.0225 + 0.0196] = √0.227 = 0.48
```

---

## 6. **Proses Iterasi K-Means**

### 6.1 Langkah-langkah Iterasi

**Iterasi 1:**
1. Mulai dengan centroid awal
2. Hitung jarak setiap data point ke semua centroid
3. Assign setiap data point ke cluster terdekat
4. Hitung centroid baru = rata-rata semua data point dalam cluster
5. Jika centroid berubah → lanjut ke iterasi 2

**Iterasi 2-100:**
- Ulangi langkah 2-5
- Berhenti jika centroid stabil atau mencapai maxIterations

### 6.2 Update Centroid

```javascript
// Centroid baru = rata-rata semua data point dalam cluster
New_C1_K = (sum of all K values in C1) / (count of data in C1)
New_C1_A = (sum of all A values in C1) / (count of data in C1)
New_C1_B = (sum of all B values in C1) / (count of data in C1)
```

---

## 7. **Assignment Data ke Cluster**

### 7.1 Proses Assignment

```javascript
// Untuk setiap data point
const distances = centroids.map(centroid =>
    calculateEuclideanDistance(currentPoint, centroid)
);

// Pilih cluster dengan jarak minimum
cluster = argMin(distances);
```

### 7.2 Contoh Output

```
=== Pegawai 1 ===
Skor: K=5.14, A=4.86, B=5.00
Jarak ke C1 = 0.48
Jarak ke C2 = 0.60
Jarak ke C3 = 1.26
→ Masuk Cluster: C1 (jarak terkecil)
```

---

## 8. **Labeling Cluster**

### 8.1 Perhitungan Rata-rata Cluster

```javascript
// Untuk setiap cluster, hitung avgScore
avgScore = (scoreK + scoreA + scoreB) / 3

// Kemudian rata-rata semua avgScore dalam cluster
clusterAverage[0] = rata-rata avgScore semua data di cluster 0
clusterAverage[1] = rata-rata avgScore semua data di cluster 1
clusterAverage[2] = rata-rata avgScore semua data di cluster 2
```

### 8.2 Mapping Label

```javascript
// Urutkan cluster berdasarkan rata-rata (ascending)
sortedClusters = [cluster_terendah, cluster_sedang, cluster_tertinggi]

// Assign label
cluster_terendah  → C3 (Low)
cluster_sedang    → C2 (Medium)
cluster_tertinggi → C1 (High)
```

---

## 9. **Output Hasil Clustering**

### 9.1 Data per Pegawai

```javascript
{
    employee: { id, name, ... },        // Data pegawai
    scoreK: 5.14,                       // Skor Knowledge
    scoreA: 4.86,                       // Skor Attitude
    scoreB: 5.00,                       // Skor Behavior
    cluster: 0,                         // Nomor cluster (0, 1, atau 2)
    label: 'C1',                        // Label (C1, C2, atau C3)
    avgScore: 4.97,                     // Rata-rata KAB
    distanceToC1: 0.48,                 // Jarak ke centroid C1
    distanceToC2: 0.60,                 // Jarak ke centroid C2
    distanceToC3: 1.26                  // Jarak ke centroid C3
}
```

### 9.2 Metadata Clustering

```javascript
{
    clusters: clusterResult,            // Hasil dari ml-kmeans
    labeledClusters: labeledData,       // Data dengan label
    rawData: data,                      // Data KAB asli
    normalizedData: data,               // Sama dengan rawData
    centroids: [...],                   // Centroid final
    normalizationParams: { min: 1, max: 7 }
}
```

---

## 10. **Perilaku Khusus & Edge Cases**

### 10.1 Data Kosong

```javascript
if (!questionnaires || questionnaires.length === 0) {
    throw new Error('No questionnaire data available for clustering.');
}
```

### 10.2 Centroid Manual Tidak Valid

```javascript
if (!manualCentroids || manualCentroids.length !== 3) {
    console.warn('Menggunakan K-means++ untuk inisialisasi');
}
```

### 10.3 Cluster dengan 2 Kelompok

```javascript
if (sortedClusters.length === 2) {
    clusterToLabel[sortedClusters[0]] = 'C3'; // Terendah
    clusterToLabel[sortedClusters[1]] = 'C1'; // Tertinggi
}
```

---

## 11. **Penyimpanan ke Database**

### 11.1 Mapping Jarak

```javascript
// Urutkan cluster berdasarkan label (C3, C2, C1)
// Kemudian map jarak sesuai urutan
distanceToLow: distances[cluster_yang_labeled_C3]
distanceToMedium: distances[cluster_yang_labeled_C2]
distanceToHigh: distances[cluster_yang_labeled_C1]
```

### 11.2 Data yang Disimpan

```javascript
{
    employee_id: 1,
    cluster: 0,
    label: 'C1',
    score_k: 5.14,
    score_a: 4.86,
    score_b: 5.00,
    distance_to_low: 1.26,
    distance_to_medium: 0.60,
    distance_to_high: 0.48
}
```

---

## 12. **Kelebihan Implementasi**

1. ✅ **Tidak perlu normalisasi** - Semua data sudah skala sama (1-7)
2. ✅ **Reproducible** - Seed 42 untuk hasil konsisten
3. ✅ **Flexible** - Bisa manual centroid atau otomatis
4. ✅ **Transparent** - Banyak logging untuk debugging
5. ✅ **Robust** - Handle edge cases dengan baik
6. ✅ **Sesuai dokumen** - Implementasi mengikuti penelitian

---

## 13. **Limitasi & Catatan**

1. ⚠️ **Fixed K=3** - Hanya bisa 3 cluster
2. ⚠️ **Euclidean distance** - Asumsi dimensi sama penting
3. ⚠️ **Sensitif terhadap outlier** - Data ekstrem bisa pengaruhi centroid
4. ⚠️ **Local optimum** - Hasil tergantung centroid awal
5. ⚠️ **Simetris clustering** - Cluster berbentuk bulat (spherical)

---

**Kesimpulan:** Algoritma ini adalah implementasi K-Means klasik yang disesuaikan dengan kebutuhan clustering pegawai berdasarkan KAB scores, tanpa normalisasi, dengan opsi manual centroid untuk reproducibility penelitian.

---

*Dibuat pada: October 15, 2025*
*Untuk Sistem Clustering ASTI - SikEdar*
