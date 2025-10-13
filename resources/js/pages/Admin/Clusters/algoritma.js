import { kmeans } from 'ml-kmeans';

/**
 * Menghitung skor Knowledge, Attitude, Behavior dari data kuesioner
 * PERBAIKAN: Menggunakan rata-rata (1-5) seperti di foto, bukan persentase (0-100)
 * @param {Array} questionnaires - Data kuesioner
 * @returns {Array} Array berisi skor KAB untuk setiap kuesioner
 */
export const calculateKABScores = (questionnaires) => {
    return questionnaires.map((q) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;

        // PERBAIKAN: Gunakan rata-rata (1-5), bukan persentase
        const scoreK = totalK / 7; // Rata-rata dari 7 pertanyaan
        const scoreA = totalA / 7;
        const scoreB = totalB / 7;

        return [scoreK, scoreA, scoreB];
    });
};

/**
 * Normalisasi data menggunakan min-max scaling
 * @param {Array} arr - Array 2D data yang akan dinormalisasi
 * @param {Boolean} useFixedRange - Jika true, gunakan range 1-5 (default false)
 * @returns {Object} Object berisi data normalized dan parameter min/max
 */
export const normalizeData = (arr, useFixedRange = false) => {
    let min, max;

    if (useFixedRange) {
        // Gunakan fixed range 1-5 untuk konsistensi centroid manual (skala kuesioner)
        min = 1;
        max = 5;
    } else {
        // Gunakan range data aktual
        const flat = arr.flat();
        min = Math.min(...flat);
        max = Math.max(...flat);
    }

    if (max === min) {
        return {
            normalized: arr.map(row => row.map(() => 0)),
            min: min,
            max: max
        };
    }

    const normalized = arr.map(row => row.map(v => (v - min) / (max - min)));

    return {
        normalized: normalized,
        min: min,
        max: max
    };
};

/**
 * Melakukan K-Means clustering
 * @param {Array} normalizedData - Data yang sudah dinormalisasi
 * @param {number} k - Jumlah cluster (default: 3)
 * @param {Array} manualCentroids - Centroid manual (opsional), format: [[k1,a1,b1], [k2,a2,b2], [k3,a3,b3]]
 * @param {Object} normParams - Parameter normalisasi {min, max} untuk menormalisasi centroid manual
 * @returns {Object} Hasil clustering dari ml-kmeans
 */
export const performKMeans = (normalizedData, k = 3, manualCentroids = null, normParams = null) => {
    const options = {
        maxIterations: 100,
        seed: 42,
    };

    // Jika ada centroid manual, normalisasi dengan parameter yang sama dengan data
    if (manualCentroids && manualCentroids.length === k && normParams) {
        const { min, max } = normParams;

        // Normalisasi centroid manual dengan min-max scaling yang sama
        const normalizedCentroids = manualCentroids.map(centroid =>
            centroid.map(value => (value - min) / (max - min))
        );

        options.initialization = normalizedCentroids;
        console.log('🎯 Centroid manual (original):', manualCentroids);
        console.log('📊 Normalisasi params - Min:', min.toFixed(2), 'Max:', max.toFixed(2));
        console.log('🎯 Centroid manual (normalized):', normalizedCentroids);
    } else {
        options.initialization = 'kmeans++';
        console.log('🔄 Menggunakan inisialisasi K-means++');
    }

    return kmeans(normalizedData, k, options);
};

/**
 * Menghitung jarak Euclidean antara dua titik
 * SESUAI DENGAN FOTO: d = √[(x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²]
 * @param {Array} point1 - Titik pertama [x, y, z]
 * @param {Array} point2 - Titik kedua [x, y, z]
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
 * PERBAIKAN: Menggunakan nilai rata-rata (1-5) untuk perhitungan jarak, sesuai foto
 * @param {Array} questionnaires - Data kuesioner asli
 * @param {Object} clusterResult - Hasil clustering
 * @param {Array} rawData - Data KAB yang belum dinormalisasi
 * @returns {Array} Data yang sudah digabung dengan cluster
 */
export const combineWithClusterResults = (questionnaires, clusterResult, rawData) => {
    // Centroids sudah dalam bentuk denormalized (skala 1-5)
    const centroids = clusterResult.centroids;

    return questionnaires.map((q, i) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;

        // PERBAIKAN: Gunakan rata-rata (1-5), bukan persentase
        const scoreK = totalK / 7;
        const scoreA = totalA / 7;
        const scoreB = totalB / 7;
        const avgScore = (scoreK + scoreA + scoreB) / 3;

        // Data point saat ini (dalam skala 1-5)
        const currentPoint = [scoreK, scoreA, scoreB];

        // Hitung jarak ke setiap centroid
        // Sesuai dengan foto: d = |point - centroid|
        const distances = centroids.map(centroid => {
            return calculateEuclideanDistance(currentPoint, centroid);
        });

        // Debug log untuk beberapa data pertama
        if (i < 3) {
            console.log(`\n=== Employee ${i + 1}: ${q.employee?.name} ===`);
            console.log(`Total K: ${totalK}, Score K: ${scoreK.toFixed(2)}`);
            console.log(`Total A: ${totalA}, Score A: ${scoreA.toFixed(2)}`);
            console.log(`Total B: ${totalB}, Score B: ${scoreB.toFixed(2)}`);
            console.log(`Current Point: [${scoreK.toFixed(2)}, ${scoreA.toFixed(2)}, ${scoreB.toFixed(2)}]`);
            console.log(`Distances to centroids:`, distances.map(d => d.toFixed(2)));
            console.log(`Assigned to Cluster: ${clusterResult.clusters[i]}`);
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
        // Jika hanya 1 cluster atau lebih dari 3, assign Medium
        sortedClusters.forEach(cluster => {
            clusterToLabel[cluster] = 'Medium';
        });
    }

    console.log('\n=== Cluster Analysis ===');
    console.log('Cluster Averages:', averageScores);
    console.log('Cluster Mapping:', clusterToLabel);

    return clusteredData.map(item => ({
        ...item,
        label: clusterToLabel[item.cluster],
    }));
};

/**
 * Fungsi utama untuk melakukan clustering lengkap
 * PERBAIKAN: Menggunakan skala 1-5 (rata-rata) sesuai foto, bukan persentase 0-100
 * @param {Array} questionnaires - Data kuesioner
 * @param {Array} manualCentroids - Centroid manual (opsional), format: [[k1,a1,b1], [k2,a2,b2], [k3,a3,b3]]
 * @returns {Object} Hasil clustering dengan data yang sudah dilabel
 */
export const performFullClustering = (questionnaires, manualCentroids = null) => {
    if (!questionnaires || questionnaires.length === 0) {
        throw new Error('No questionnaire data available for clustering.');
    }

    console.log('\n========================================');
    console.log('MEMULAI PROSES CLUSTERING (SKALA 1-5)');
    console.log('========================================\n');

    // Hitung skor KAB (rata-rata 1-5)
    const data = calculateKABScores(questionnaires);

    // Jika menggunakan centroid manual, gunakan fixed range 1-5 untuk konsistensi
    // Jika auto, gunakan range data aktual untuk optimasi
    const useFixedRange = manualCentroids !== null;

    // Normalisasi data dan simpan parameter normalisasi
    const normalizationResult = normalizeData(data, useFixedRange);
    const normalizedData = normalizationResult.normalized;
    const normParams = { min: normalizationResult.min, max: normalizationResult.max };

    console.log('📊 Normalisasi mode:', useFixedRange ? 'Fixed Range (1-5)' : 'Data Range');
    console.log('📊 Data range - Min:', normParams.min.toFixed(2), 'Max:', normParams.max.toFixed(2));

    // Lakukan K-Means (dengan atau tanpa centroid manual)
    const clusterResult = performKMeans(normalizedData, 3, manualCentroids, normParams);

    // Denormalisasi centroid untuk perhitungan jarak (kembali ke skala 1-5)
    const { min, max } = normParams;
    const denormalizedCentroids = clusterResult.centroids.map(centroid =>
        centroid.map(value => value * (max - min) + min)
    );

    console.log('\n📍 Centroids (denormalized, skala 1-5):');
    denormalizedCentroids.forEach((c, i) => {
        console.log(`   C${i + 1}: [K=${c[0].toFixed(2)}, A=${c[1].toFixed(2)}, B=${c[2].toFixed(2)}]`);
    });

    // Replace centroids dengan versi denormalized
    const clusterResultWithDenormalizedCentroids = {
        ...clusterResult,
        centroids: denormalizedCentroids
    };

    // Gabungkan dengan hasil clustering
    const clusteredData = combineWithClusterResults(
        questionnaires,
        clusterResultWithDenormalizedCentroids,
        data
    );

    // Berikan label
    const labeledData = labelClusters(clusteredData);

    console.log('\n========================================');
    console.log('CLUSTERING SELESAI');
    console.log('========================================\n');

    return {
        clusters: clusterResult,
        labeledClusters: labeledData,
        rawData: data,
        normalizedData: normalizedData,
        centroids: denormalizedCentroids,
        normalizationParams: normParams
    };
};
