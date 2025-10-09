import axios from 'axios';
import { toast } from 'sonner';

/**
 * Menyimpan hasil clustering ke database
 * @param {Array} labeledClusters - Data clustering yang sudah dilabel
 * @param {Function} setIsSaving - State setter untuk loading
 * @returns {Promise} Promise hasil save operation
 */
export const saveClusterResults = async (labeledClusters, setIsSaving) => {
    if (!labeledClusters || labeledClusters.length === 0) {
        toast.error('Tidak ada hasil clustering untuk disimpan.');
        return;
    }

    setIsSaving(true);

    try {
        // Buat mapping dari cluster number ke label
        const clusterToLabel = {};
        labeledClusters.forEach(item => {
            if (!clusterToLabel[item.cluster]) {
                clusterToLabel[item.cluster] = item.label;
            }
        });

        // Buat array mapping [cluster, label] dan urutkan berdasarkan label (Low, Medium, High)
        const labelOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
        const sortedClusters = Object.entries(clusterToLabel)
            .sort(([, labelA], [, labelB]) => labelOrder[labelA] - labelOrder[labelB])
            .map(([cluster]) => parseInt(cluster));

        const results = labeledClusters.map(item => {
            // Array jarak [distanceToC0, distanceToC1, distanceToC2]
            const distances = [item.distanceToC1, item.distanceToC2, item.distanceToC3];

            // Mapping jarak ke label yang sesuai
            const distanceToLow = distances[sortedClusters[0]];
            const distanceToMedium = distances[sortedClusters[1]];
            const distanceToHigh = distances[sortedClusters[2]];

            return {
                employee_id: item.employee.id,
                cluster: item.cluster,
                label: item.label,
                score_k: item.scoreK,
                score_a: item.scoreA,
                score_b: item.scoreB,
                distance_to_low: distanceToLow,
                distance_to_medium: distanceToMedium,
                distance_to_high: distanceToHigh,
            };
        });

        // Debug: log hasil yang akan disimpan
        console.log('Saving cluster results:', results.slice(0, 2));

        const response = await axios.post(route('admin.clusters.store'), {
            results: results
        });

        toast.success(`Berhasil menyimpan ${response.data.saved_count} hasil clustering ke database!`);

        // Reload halaman setelah save berhasil
        setTimeout(() => {
            window.location.reload();
        }, 1500);

        return response.data;
    } catch (error) {
        toast.error('Gagal menyimpan hasil clustering ke database.');
        console.error('Save error:', error);
        throw error;
    } finally {
        setIsSaving(false);
    }
};
