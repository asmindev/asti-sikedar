import { Card } from '@/components/ui/card';

export default function DataOverview({ questionnaires }) {
    if (!questionnaires || questionnaires.length === 0) {
        return (
            <Card className="mb-6 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
                <p className="text-gray-600">Belum ada data kuesioner yang tersedia untuk dianalisis.</p>
            </Card>
        );
    }

    return (
        <Card className="mb-6 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Data Overview</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{questionnaires.length}</div>
                    <div className="text-sm text-gray-600">Total Questionnaires</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {questionnaires.filter(q => q.employee).length}
                    </div>
                    <div className="text-sm text-gray-600">Active Employees</div>
                </div>
            </div>
        </Card>
    );
}
