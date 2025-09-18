import { kmeans } from 'ml-kmeans';

/**
 * Menghitung skor Knowledge, Attitude, Behavior dari data kuesioner
 * @param {Array} questionnaires - Data kuesioner
 * @returns {Array} Array berisi skor KAB untuk setiap kuesioner
 */
export const calculateKABScores = (questionnaires) => {
    return questionnaires.map((q) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;
        const scoreK = (totalK / 35) * 100;
        const scoreA = (totalA / 35) * 100;
        const scoreB = (totalB / 35) * 100;
        return [scoreK, scoreA, scoreB];
    });
};

/**
 * Normalisasi data menggunakan min-max scaling
 * @param {Array} arr - Array 2D data yang akan dinormalisasi
 * @returns {Array} Array 2D data yang sudah dinormalisasi
 */
export const normalizeData = (arr) => {
    const flat = arr.flat();
    const min = Math.min(...flat);
    const max = Math.max(...flat);
    if (max === min) return arr.map(row => row.map(() => 0));
    return arr.map(row => row.map(v => (v - min) / (max - min)));
};

/**
 * Melakukan K-Means clustering
 * @param {Array} normalizedData - Data yang sudah dinormalisasi
 * @param {number} k - Jumlah cluster (default: 3)
 * @returns {Object} Hasil clustering dari ml-kmeans
 */
export const performKMeans = (normalizedData, k = 3) => {
    return kmeans(normalizedData, k, {
        initialization: 'kmeans++',
        maxIterations: 100,
        seed: 42,
    });
};

/**
 * Menggabungkan data asli dengan hasil clustering
 * @param {Array} questionnaires - Data kuesioner asli
 * @param {Object} clusterResult - Hasil clustering
 * @returns {Array} Data yang sudah digabung dengan cluster
 */
export const combineWithClusterResults = (questionnaires, clusterResult) => {
    return questionnaires.map((q, i) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
        const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;
        const scoreK = (totalK / 35) * 100;
        const scoreA = (totalA / 35) * 100;
        const scoreB = (totalB / 35) * 100;
        const avgScore = (scoreK + scoreA + scoreB) / 3;
        return {
            employee: q.employee,
            scoreK,
            scoreA,
            scoreB,
            cluster: clusterResult.clusters[i],
            avgScore,
        };
    });
};

/**
 * Memberikan label pada cluster berdasarkan nilai cluster
 * @param {Array} clusteredData - Data yang sudah di-cluster
 * @returns {Array} Data dengan label cluster
 */
export const labelClusters = (clusteredData) => {
    const clusterToLabel = {
        0: 'Low',
        1: 'Medium',
        2: 'High',
    };

    return clusteredData.map(item => ({
        ...item,
        label: clusterToLabel[item.cluster],
    }));
};

/**
 * Fungsi utama untuk melakukan clustering lengkap
 * @param {Array} questionnaires - Data kuesioner
 * @returns {Object} Hasil clustering dengan data yang sudah dilabel
 */
export const performFullClustering = (questionnaires) => {
    if (!questionnaires || questionnaires.length === 0) {
        throw new Error('No questionnaire data available for clustering.');
    }

    // Hitung skor KAB
    const data = calculateKABScores(questionnaires);

    // Normalisasi data
    const normalizedData = normalizeData(data);

    // Lakukan K-Means
    const clusterResult = performKMeans(normalizedData);

    // Gabungkan dengan hasil clustering
    const clusteredData = combineWithClusterResults(questionnaires, clusterResult);

    // Berikan label
    const labeledData = labelClusters(clusteredData);

    return {
        clusters: clusterResult,
        labeledClusters: labeledData,
        rawData: data,
        normalizedData: normalizedData
    };
};
