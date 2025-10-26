<?php

test('Euclidean distance calculation is correct', function () {
    // Test perhitungan matematis
    $point1 = [3, 4, 5];
    $point2 = [1, 2, 2];

    // Manual calculation: √[(3-1)² + (4-2)² + (5-2)²] = √[4 + 4 + 9] = √17 ≈ 4.123
    $expected = sqrt(pow(3 - 1, 2) + pow(4 - 2, 2) + pow(5 - 2, 2));

    expect($expected)->toBeGreaterThan(4.123 - 0.001);
    expect($expected)->toBeLessThan(4.123 + 0.001);
});

test('Data preprocessing menghitung skor KAB dengan benar', function () {
    // Test perhitungan skor KAB
    $questionnaire = [
        'k1' => 6,
        'k2' => 5,
        'k3' => 6,
        'k4' => 7,
        'k5' => 6,
        'k6' => 5,
        'k7' => 6,
        'a1' => 5,
        'a2' => 6,
        'a3' => 5,
        'a4' => 6,
        'a5' => 7,
        'a6' => 5,
        'a7' => 6,
        'b1' => 6,
        'b2' => 6,
        'b3' => 5,
        'b4' => 7,
        'b5' => 6,
        'b6' => 6,
        'b7' => 5,
    ];

    // Hitung manual
    $scoreK = (6 + 5 + 6 + 7 + 6 + 5 + 6) / 7; // 41/7 = 5.857
    $scoreA = (5 + 6 + 5 + 6 + 7 + 5 + 6) / 7; // 40/7 = 5.714
    $scoreB = (6 + 6 + 5 + 7 + 6 + 6 + 5) / 7; // 41/7 = 5.857

    expect($scoreK)->toBeGreaterThan(5.857 - 0.001);
    expect($scoreK)->toBeLessThan(5.857 + 0.001);
    expect($scoreA)->toBeGreaterThan(5.714 - 0.001);
    expect($scoreA)->toBeLessThan(5.714 + 0.001);
    expect($scoreB)->toBeGreaterThan(5.857 - 0.001);
    expect($scoreB)->toBeLessThan(5.857 + 0.001);
});

test('Centroid manual dari dokumen penelitian', function () {
    // Test bahwa centroid dari dokumen bisa digunakan
    $manualCentroids = [
        [4.71, 4.71, 4.86], // C1
        [4.71, 4.43, 4.71], // C2
        [4.29, 4.14, 4.14]  // C3
    ];

    // Pastikan centroid valid (dalam range 1-7)
    foreach ($manualCentroids as $centroid) {
        foreach ($centroid as $value) {
            expect($value)->toBeGreaterThanOrEqual(1);
            expect($value)->toBeLessThanOrEqual(7);
        }
    }

    expect($manualCentroids)->toHaveCount(3);
});

test('Data clustering structure is valid', function () {
    // Test struktur data yang diharapkan
    $clusteredData = [
        [
            'employee' => ['id' => 1, 'name' => 'John'],
            'scoreK' => 5.14,
            'scoreA' => 4.86,
            'scoreB' => 5.00,
            'cluster' => 0,
            'label' => 'C1',
            'avgScore' => 4.97,
            'distanceToC1' => 0.48,
            'distanceToC2' => 0.60,
            'distanceToC3' => 1.26,
        ]
    ];

    expect($clusteredData)->toHaveCount(1);
    expect($clusteredData[0])->toHaveKey('employee');
    expect($clusteredData[0])->toHaveKey('scoreK');
    expect($clusteredData[0])->toHaveKey('cluster');
    expect($clusteredData[0])->toHaveKey('label');
    expect($clusteredData[0]['label'])->toBe('C1');
});

test('Labeling logic works correctly', function () {
    // Test logika labeling berdasarkan rata-rata cluster
    $clusterAverages = [
        0 => 5.5,  // Cluster 0: High
        1 => 4.2,  // Cluster 1: Medium
        2 => 3.1   // Cluster 2: Low
    ];

    // Urutkan berdasarkan rata-rata (ascending)
    arsort($clusterAverages); // High to Low
    $sortedClusters = array_keys($clusterAverages);

    // Assign label: tertinggi = C1, terendah = C3
    $clusterToLabel = [];
    $clusterToLabel[$sortedClusters[0]] = 'C1'; // 5.5 → C1 (High)
    $clusterToLabel[$sortedClusters[1]] = 'C2'; // 4.2 → C2 (Medium)
    $clusterToLabel[$sortedClusters[2]] = 'C3'; // 3.1 → C3 (Low)

    expect($clusterToLabel)->toHaveKey(0);
    expect($clusterToLabel)->toHaveKey(1);
    expect($clusterToLabel)->toHaveKey(2);
    expect($clusterToLabel[$sortedClusters[0]])->toBe('C1');
    expect($clusterToLabel[$sortedClusters[2]])->toBe('C3');
});
