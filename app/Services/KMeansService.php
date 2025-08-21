<?php

namespace App\Services;

class KMeansService
{
    private int $maxIterations = 100;
    private float $tolerance = 0.0001;

    /**
     * Perform K-Means clustering on given data samples.
     *
     * @param array $samples Array of data points, each point is an array of features
     * @param int $k Number of clusters
     * @return array Array of cluster assignments for each sample
     */
    public function cluster(array $samples, int $k): array
    {
        if (empty($samples) || $k <= 0) {
            return [];
        }

        if (count($samples) <= $k) {
            // If we have fewer samples than clusters, assign each to its own cluster
            return range(0, count($samples) - 1);
        }

        $numFeatures = count($samples[0]);

        // Initialize centroids randomly
        $centroids = $this->initializeCentroids($samples, $k, $numFeatures);

        $clusterAssignments = [];
        $previousAssignments = [];

        for ($iteration = 0; $iteration < $this->maxIterations; $iteration++) {
            // Assign each sample to the nearest centroid
            $clusterAssignments = [];
            foreach ($samples as $sample) {
                $clusterAssignments[] = $this->findNearestCentroid($sample, $centroids);
            }

            // Check for convergence
            if ($clusterAssignments === $previousAssignments) {
                break;
            }

            // Update centroids
            $newCentroids = $this->updateCentroids($samples, $clusterAssignments, $k, $numFeatures);

            // Check if centroids changed significantly
            if ($this->centroidsConverged($centroids, $newCentroids)) {
                break;
            }

            $centroids = $newCentroids;
            $previousAssignments = $clusterAssignments;
        }

        return $clusterAssignments;
    }

    /**
     * Initialize centroids using K-means++ algorithm.
     */
    private function initializeCentroids(array $samples, int $k, int $numFeatures): array
    {
        $centroids = [];

        // Choose first centroid randomly
        $centroids[] = $samples[array_rand($samples)];

        // Choose remaining centroids using K-means++
        for ($i = 1; $i < $k; $i++) {
            $distances = [];

            foreach ($samples as $sample) {
                $minDistance = PHP_FLOAT_MAX;

                foreach ($centroids as $centroid) {
                    $distance = $this->euclideanDistance($sample, $centroid);
                    $minDistance = min($minDistance, $distance);
                }

                $distances[] = $minDistance * $minDistance; // Squared distance
            }

            // Choose next centroid with probability proportional to squared distance
            $totalDistance = array_sum($distances);
            $random = mt_rand() / mt_getrandmax() * $totalDistance;

            $cumulative = 0;
            foreach ($distances as $index => $distance) {
                $cumulative += $distance;
                if ($cumulative >= $random) {
                    $centroids[] = $samples[$index];
                    break;
                }
            }
        }

        return $centroids;
    }

    /**
     * Find the nearest centroid for a given sample.
     */
    private function findNearestCentroid(array $sample, array $centroids): int
    {
        $minDistance = PHP_FLOAT_MAX;
        $nearestCentroid = 0;

        foreach ($centroids as $index => $centroid) {
            $distance = $this->euclideanDistance($sample, $centroid);
            if ($distance < $minDistance) {
                $minDistance = $distance;
                $nearestCentroid = $index;
            }
        }

        return $nearestCentroid;
    }

    /**
     * Calculate Euclidean distance between two points.
     */
    private function euclideanDistance(array $point1, array $point2): float
    {
        $sum = 0;
        for ($i = 0; $i < count($point1); $i++) {
            $sum += pow($point1[$i] - $point2[$i], 2);
        }
        return sqrt($sum);
    }

    /**
     * Update centroids based on current cluster assignments.
     */
    private function updateCentroids(array $samples, array $assignments, int $k, int $numFeatures): array
    {
        $centroids = [];

        for ($cluster = 0; $cluster < $k; $cluster++) {
            $clusterSamples = [];

            foreach ($assignments as $index => $assignment) {
                if ($assignment === $cluster) {
                    $clusterSamples[] = $samples[$index];
                }
            }

            if (!empty($clusterSamples)) {
                $centroid = [];
                for ($feature = 0; $feature < $numFeatures; $feature++) {
                    $sum = array_sum(array_column($clusterSamples, $feature));
                    $centroid[] = $sum / count($clusterSamples);
                }
                $centroids[] = $centroid;
            } else {
                // Empty cluster, reinitialize randomly
                $centroids[] = $samples[array_rand($samples)];
            }
        }

        return $centroids;
    }

    /**
     * Check if centroids have converged.
     */
    private function centroidsConverged(array $oldCentroids, array $newCentroids): bool
    {
        for ($i = 0; $i < count($oldCentroids); $i++) {
            $distance = $this->euclideanDistance($oldCentroids[$i], $newCentroids[$i]);
            if ($distance > $this->tolerance) {
                return false;
            }
        }
        return true;
    }

    /**
     * Calculate centroids for given clusters.
     */
    public function calculateCentroids(array $samples, array $clusterAssignments, int $k): array
    {
        $centroids = [];
        $featureCount = count($samples[0] ?? []);

        for ($cluster = 0; $cluster < $k; $cluster++) {
            $clusterSamples = [];

            foreach ($clusterAssignments as $index => $assignment) {
                if ($assignment === $cluster) {
                    $clusterSamples[] = $samples[$index];
                }
            }

            if (!empty($clusterSamples)) {
                $centroid = [];
                for ($feature = 0; $feature < $featureCount; $feature++) {
                    $sum = array_sum(array_column($clusterSamples, $feature));
                    $centroid[] = $sum / count($clusterSamples);
                }
                $centroids[] = $centroid;
            } else {
                // Empty cluster, use random centroid
                $centroids[] = array_fill(0, $featureCount, 0);
            }
        }

        return $centroids;
    }

    /**
     * Calculate within-cluster sum of squares (WCSS).
     */
    public function calculateWCSS(array $samples, array $clusterAssignments, array $centroids): float
    {
        $wcss = 0.0;

        foreach ($samples as $index => $sample) {
            $cluster = $clusterAssignments[$index];
            $centroid = $centroids[$cluster];

            // Calculate squared distance to centroid
            $distance = 0.0;
            for ($i = 0; $i < count($sample); $i++) {
                $distance += pow($sample[$i] - $centroid[$i], 2);
            }
            $wcss += $distance;
        }

        return $wcss;
    }
}
