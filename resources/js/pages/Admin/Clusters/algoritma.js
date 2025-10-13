import { kmeans } from 'ml-kmeans';

/**
 * Menghitung skor Knowledge, Attitude, Behavior dari data kuesioner
 * Menggunakan rata-rata (1-7) sesuai dokumen penelitian
 * @param {Array} questionnaires - Data kuesioner
 * @returns {Array} Array berisi skor KAB untuk setiap kuesioner
 */
export const calculateKABScores = (questionnaires) => {
    return questionnaires.map((q) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;

        // Rata-rata dari 7 pertanyaan (skala 1-7)
        const scoreK = totalK / 7;
        const scoreA = totalA / 7;
        const scoreB = totalB / 7;

        return [scoreK, scoreA, scoreB];
    });
};

/**
 * NORMALISASI TIDAK DILAKUKAN
 * Sesuai dokumen: "seluruh data memiliki skala yang sama sehingga proses normalisasi tidak dilakukan"
 * Fungsi ini hanya untuk kompatibilitas dengan ml-kmeans
 * @param {Array} arr - Array 2D data
 * @returns {Object} Object berisi data (tidak dinormalisasi) dan parameter dummy
 */
export const normalizeData = (arr) => {
    // Tidak ada normalisasi, kembalikan data asli
    return {
        normalized: arr, // Data asli tanpa normalisasi
        min: 1, // Dummy value
        max: 7  // Dummy value (skala kuesioner)
    };
};

/**
 * Melakukan K-Means clustering
 * @param {Array} data - Data yang TIDAK dinormalisasi (langsung dalam skala 1-7)
 * @param {number} k - Jumlah cluster (default: 3)
 * @param {Array} manualCentroids - Centroid manual (wajib), format: [[k1,a1,b1], [k2,a2,b2], [k3,a3,b3]]
 * @returns {Object} Hasil clustering dari ml-kmeans
 */
export const performKMeans = (data, k = 3, manualCentroids = null) => {
    const options = {
        maxIterations: 100,
        seed: 42,
    };

    // Centroid manual (TIDAK perlu normalisasi karena data juga tidak dinormalisasi)
    if (manualCentroids && manualCentroids.length === k) {
        options.initialization = manualCentroids;
        console.log('🎯 Menggunakan Centroid Manual (tanpa normalisasi):');
        manualCentroids.forEach((c, i) => {
            console.log(`   C${i + 1}: [K=${c[0].toFixed(2)}, A=${c[1].toFixed(2)}, B=${c[2].toFixed(2)}]`);
        });
    } else {
        options.initialization = 'kmeans++';
        console.log('🔄 Menggunakan inisialisasi K-means++');
    }

    return kmeans(data, k, options);
};

/**
 * Menghitung jarak Euclidean antara dua titik
 * SESUAI DOKUMEN: d = √[(x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²]
 * @param {Array} point1 - Titik pertama [K, A, B]
 * @param {Array} point2 - Titik kedua [K, A, B]
 * @returns {number} Jarak Euclidean
 */
const calculateEuclideanDistance = (point1, point2) => {
    const sum = point1.reduce((acc, val, idx) => {
        return acc + Math.pow(val - point2[idx], 2);
    }, 0);
    return Math.sqrt(sum);
};

/**
 * Menggabungkan data asli dengan hasil clustering
 * @param {Array} questionnaires - Data kuesioner asli
 * @param {Object} clusterResult - Hasil clustering
 * @param {Array} rawData - Data KAB (skala 1-7)
 * @returns {Array} Data yang sudah digabung dengan cluster
 */
export const combineWithClusterResults = (questionnaires, clusterResult, rawData) => {
    const centroids = clusterResult.centroids;

    console.log('\n📍 Centroids yang digunakan:');
    centroids.forEach((c, i) => {
        console.log(`   C${i + 1}: [K=${c[0].toFixed(2)}, A=${c[1].toFixed(2)}, B=${c[2].toFixed(2)}]`);
    });

    return questionnaires.map((q, i) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;

        // Rata-rata dari 7 pertanyaan (skala 1-7)
        const scoreK = totalK / 7;
        const scoreA = totalA / 7;
        const scoreB = totalB / 7;
        const avgScore = (scoreK + scoreA + scoreB) / 3;

        // Data point saat ini (dalam skala 1-7)
        const currentPoint = [scoreK, scoreA, scoreB];

        // Hitung jarak ke setiap centroid menggunakan Euclidean Distance
        const distances = centroids.map((centroid, cIdx) => {
            const dist = calculateEuclideanDistance(currentPoint, centroid);

            // Debug untuk data pertama (seperti di dokumen)
            if (i < 3) {
                console.log(`\n   d = |${i + 1} - ${cIdx + 1}|`);
                console.log(`      = √[(${scoreK.toFixed(2)} - ${centroid[0].toFixed(2)})² + (${scoreA.toFixed(2)} - ${centroid[1].toFixed(2)})² + (${scoreB.toFixed(2)} - ${centroid[2].toFixed(2)})²]`);
                const diff0 = scoreK - centroid[0];
                const diff1 = scoreA - centroid[1];
                const diff2 = scoreB - centroid[2];
                console.log(`      = √[${diff0.toFixed(4)}² + ${diff1.toFixed(4)}² + ${diff2.toFixed(4)}²]`);
                console.log(`      = √[${(diff0*diff0).toFixed(4)} + ${(diff1*diff1).toFixed(4)} + ${(diff2*diff2).toFixed(4)}]`);
                console.log(`      = √${(diff0*diff0 + diff1*diff1 + diff2*diff2).toFixed(4)} = ${dist.toFixed(2)}`);
            }

            return dist;
        });

        // Log hasil untuk data pertama (sesuai dokumen)
        if (i < 3) {
            console.log(`\n=== ${q.employee?.name || `Pegawai ${i + 1}`} ===`);
            console.log(`Skor: K=${scoreK.toFixed(2)}, A=${scoreA.toFixed(2)}, B=${scoreB.toFixed(2)}`);
            console.log(`Jarak ke C1 = ${distances[0].toFixed(2)}`);
            console.log(`Jarak ke C2 = ${distances[1].toFixed(2)}`);
            console.log(`Jarak ke C3 = ${distances[2].toFixed(2)}`);
            console.log(`→ Masuk Cluster: C${clusterResult.clusters[i] + 1}`);
        }

        return {
            employee: q.employee,
            scoreK,
            scoreA,
            scoreB,
            cluster: clusterResult.clusters[i],
            avgScore,
            distanceToC1: distances[0],
            distanceToC2: distances[1],
            distanceToC3: distances[2],
        };
    });
};

/**
 * Memberikan label pada cluster berdasarkan rata-rata skor
 * @param {Array} clusteredData - Data yang sudah di-cluster
 * @returns {Array} Data dengan label cluster
 */
export const labelClusters = (clusteredData) => {
    // Hitung rata-rata avgScore untuk setiap cluster
    const clusterAverages = {};
    const clusterCounts = {};

    clusteredData.forEach(item => {
        const cluster = item.cluster;
        if (!clusterAverages[cluster]) {
            clusterAverages[cluster] = 0;
            clusterCounts[cluster] = 0;
        }
        clusterAverages[cluster] += item.avgScore;
        clusterCounts[cluster]++;
    });

    // Hitung rata-rata setiap cluster
    const averageScores = {};
    Object.keys(clusterAverages).forEach(cluster => {
        averageScores[cluster] = clusterAverages[cluster] / clusterCounts[cluster];
    });

    // Urutkan cluster berdasarkan rata-rata skor
    const sortedClusters = Object.entries(averageScores)
        .sort(([, a], [, b]) => a - b)
        .map(([cluster]) => parseInt(cluster));

    // Assign label berdasarkan urutan: Low, Medium, High
    const clusterToLabel = {};
    if (sortedClusters.length === 3) {
        clusterToLabel[sortedClusters[0]] = 'Low';
        clusterToLabel[sortedClusters[1]] = 'Medium';
        clusterToLabel[sortedClusters[2]] = 'High';
    } else if (sortedClusters.length === 2) {
        clusterToLabel[sortedClusters[0]] = 'Low';
        clusterToLabel[sortedClusters[1]] = 'High';
    } else {
        sortedClusters.forEach(cluster => {
            clusterToLabel[cluster] = 'Medium';
        });
    }

    console.log('\n=== Analisis Cluster ===');
    console.log('Rata-rata per Cluster:', averageScores);
    console.log('Pemetaan Label:', clusterToLabel);

    return clusteredData.map(item => ({
        ...item,
        label: clusterToLabel[item.cluster],
    }));
};

/**
 * Fungsi utama untuk melakukan clustering lengkap
 * SESUAI DOKUMEN: Tanpa normalisasi, menggunakan centroid manual
 * @param {Array} questionnaires - Data kuesioner
 * @param {Array} manualCentroids - Centroid manual (WAJIB), format: [[k1,a1,b1], [k2,a2,b2], [k3,a3,b3]]
 *                                  Contoh dari dokumen: [[4.71, 4.71, 4.86], [4.71, 4.43, 4.71], [4.29, 4.14, 4.14]]
 * @returns {Object} Hasil clustering dengan data yang sudah dilabel
 */
export const performFullClustering = (questionnaires, manualCentroids = null) => {
    if (!questionnaires || questionnaires.length === 0) {
        throw new Error('No questionnaire data available for clustering.');
    }

    console.log('\n========================================');
    console.log('CLUSTERING K-MEANS (TANPA NORMALISASI)');
    console.log('========================================');
    console.log('Sesuai dokumen: "seluruh data memiliki skala yang sama');
    console.log('sehingga proses normalisasi tidak dilakukan"\n');

    // Hitung skor KAB (rata-rata 1-7, tanpa normalisasi)
    const data = calculateKABScores(questionnaires);

    console.log('📊 Data range: Skala 1-7 (likert scale)');
    console.log('📊 Normalisasi: TIDAK dilakukan');

    // Validasi centroid manual
    if (!manualCentroids || manualCentroids.length !== 3) {
        console.warn('⚠️  PERINGATAN: Centroid manual tidak ditemukan atau tidak valid!');
        console.warn('    Menggunakan K-means++ untuk inisialisasi centroid.');
        console.warn('    Untuk hasil sesuai dokumen, gunakan centroid manual:');
        console.warn('    [[4.71, 4.71, 4.86], [4.71, 4.43, 4.71], [4.29, 4.14, 4.14]]');
    }

    // Lakukan K-Means TANPA normalisasi (data langsung dalam skala 1-7)
    const clusterResult = performKMeans(data, 3, manualCentroids);

    console.log('\n📍 Centroids Final (skala 1-7):');
    clusterResult.centroids.forEach((c, i) => {
        console.log(`   C${i + 1}: [K=${c[0].toFixed(2)}, A=${c[1].toFixed(2)}, B=${c[2].toFixed(2)}]`);
    });

    // Gabungkan dengan hasil clustering
    console.log('\n--- Perhitungan Jarak Euclidean ---');
    const clusteredData = combineWithClusterResults(questionnaires, clusterResult, data);

    // Berikan label
    const labeledData = labelClusters(clusteredData);

    console.log('\n========================================');
    console.log('CLUSTERING SELESAI');
    console.log('========================================\n');

    return {
        clusters: clusterResult,
        labeledClusters: labeledData,
        rawData: data,
        normalizedData: data, // Sama dengan rawData karena tidak ada normalisasi
        centroids: clusterResult.centroids,
        normalizationParams: { min: 1, max: 7 } // Dummy params
    };
};
