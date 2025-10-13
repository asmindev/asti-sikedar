import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = {
    Low: '#EF4444',     // Red
    Medium: '#F59E0B',  // Yellow
    High: '#10B981'     // Green
};

export default function ClusterDistributionChart({ clusterDistribution, chartType = 'pie' }) {
    const data = [
        {
            name: 'Klaster Rendah',
            value: clusterDistribution.low.count,
            percentage: clusterDistribution.low.percentage,
            color: COLORS.Low,
            label: 'Low'
        },
        {
            name: 'Klaster Sedang',
            value: clusterDistribution.medium.count,
            percentage: clusterDistribution.medium.percentage,
            color: COLORS.Medium,
            label: 'Medium'
        },
        {
            name: 'Klaster Tinggi',
            value: clusterDistribution.high.count,
            percentage: clusterDistribution.high.percentage,
            color: COLORS.High,
            label: 'High'
        }
    ];

    const filteredData = data.filter(item => item.value > 0);

    const config = {
        Low: { label: 'Klaster Rendah', color: COLORS.Low },
        Medium: { label: 'Klaster Sedang', color: COLORS.Medium },
        High: { label: 'Klaster Tinggi', color: COLORS.High },
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <Card className="shadow-lg p-0">
                    <CardContent className="p-3">
                        <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
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
                <ChartContainer config={config} className="h-80 w-full">
                    {chartType === 'pie' ? (
                        <PieChart>
                            <Pie
                                data={filteredData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<CustomTooltip />} />
                            <ChartLegend
                                content={<ChartLegendContent />}
                                formatter={(value, entry) => (
                                    <span style={{ color: entry.color }}>
                                        {entry.payload.name} ({entry.payload.value})
                                    </span>
                                )}
                            />
                        </PieChart>
                    ) : (
                        <BarChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: 'currentColor' }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                className="text-gray-600 dark:text-gray-300"
                            />
                            <YAxis tick={{ fill: 'currentColor' }} className="text-gray-600 dark:text-gray-300" />
                            <ChartTooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill="#8884d8">
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    )}
                </ChartContainer>

                {/* Summary Statistics */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card key={item.label} className="text-center p-0">
                            <CardContent className="p-3">
                                <div
                                    className="text-2xl font-bold"
                                    style={{ color: item.color }}
                                >
                                    {item.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">{item.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}%</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
