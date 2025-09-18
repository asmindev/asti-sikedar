import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';

export default function StatsOverview({ stats, clusterDistribution }) {
    const totalClustered = clusterDistribution.low.count + clusterDistribution.medium.count + clusterDistribution.high.count;
    const completionRate = stats.totalEmployees > 0 ? ((stats.totalQuestionnaires / stats.totalEmployees) * 100).toFixed(1) : 0;

    const statsCards = [
        {
            title: 'Total Pegawai',
            value: stats.totalEmployees,
            description: 'Pegawai terdaftar',
            icon: Users,
            color: 'text-blue-600'
        },
        {
            title: 'Kuesioner Terkumpul',
            value: stats.totalQuestionnaires,
            description: `${completionRate}% dari total pegawai`,
            icon: FileText,
            color: 'text-green-600'
        },
        {
            title: 'Hasil Klaster',
            value: totalClustered,
            description: 'Pegawai sudah dianalisis',
            icon: BarChart3,
            color: 'text-purple-600'
        },
        {
            title: 'Tingkat Partisipasi',
            value: `${completionRate}%`,
            description: 'Completion rate kuesioner',
            icon: TrendingUp,
            color: 'text-orange-600'
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {stat.title}
                            </CardTitle>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
