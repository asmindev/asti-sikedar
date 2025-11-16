import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
    C3: '#EF4444',     // Red (Rendah)
    C2: '#F59E0B',  // Yellow (Sedang)
    C1: '#10B981'     // Green (Tinggi)
};

export default function ClusterDistributionChart({ clusterDistribution }) {
    const data = [
        {
            name: 'C3 (Rendah)',
            value: clusterDistribution.low.count,
            percentage: clusterDistribution.low.percentage,
            color: COLORS.C3,
            label: 'C3',
            fullName: 'Cluster C3 (Rendah)'
        },
        {
            name: 'C2 (Sedang)',
            value: clusterDistribution.medium.count,
            percentage: clusterDistribution.medium.percentage,
            color: COLORS.C2,
            label: 'C2',
            fullName: 'Cluster C2 (Sedang)'
        },
        {
            name: 'C1 (Tinggi)',
            value: clusterDistribution.high.count,
            percentage: clusterDistribution.high.percentage,
            color: COLORS.C1,
            label: 'C1',
            fullName: 'Cluster C1 (Tinggi)'
        }
    ];

    const filteredData = data.filter(item => item.value > 0);

    const config = {
        C3: { label: 'Cluster C3 (Rendah)', color: COLORS.C3 },
        C2: { label: 'Cluster C2 (Sedang)', color: COLORS.C2 },
        C1: { label: 'Cluster C1 (Tinggi)', color: COLORS.C1 },
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <Card className="shadow-lg p-0">
                    <CardContent className="p-3">
                        <p className="font-semibold text-gray-900 dark:text-white">{data.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Jumlah: <span className="font-medium">{data.value} pegawai</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Persentase: <span className="font-medium">{data.percentage}%</span>
                        </p>
                    </CardContent>
                </Card>
            );
        }
        return null;
    };

    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="font-bold text-sm"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (filteredData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Distribusi Klaster Pegawai</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">Belum ada data klaster yang tersedia</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                        Tidak ada data klaster untuk ditampilkan
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Distribusi Klaster Pegawai</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                    Pengelompokan pegawai berdasarkan tingkat keamanan informasi
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} className="h-96 w-full">
                    <PieChart>
                        <Pie
                            data={filteredData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {filteredData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <ChartTooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry) => (
                                <span className="text-gray-700 dark:text-gray-300">{entry.payload.fullName}</span>
                            )}
                        />
                    </PieChart>
                </ChartContainer>

                {/* Summary Statistics */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card key={item.label} className="text-center p-0">
                            <CardContent className="p-2 sm:p-3">
                                <div
                                    className="text-xl sm:text-2xl font-bold"
                                    style={{ color: item.color }}
                                >
                                    {item.value}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.fullName}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}%</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
