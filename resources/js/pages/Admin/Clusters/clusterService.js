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
        const results = labeledClusters.map(item => ({
            employee_id: item.employee.id,
            cluster: item.cluster,
            label: item.label,
            score_k: item.scoreK,
            score_a: item.scoreA,
            score_b: item.scoreB,
        }));

        const response = await axios.post(route('admin.clusters.store'), {
            results: results
        });

        toast.success(`Berhasil menyimpan ${response.data.saved_count} hasil clustering ke database!`);
        return response.data;
    } catch (error) {
        toast.error('Gagal menyimpan hasil clustering ke database.');
        console.error('Save error:', error);
        throw error;
    } finally {
        setIsSaving(false);
    }
};
