import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
    C1: '#22c55e', // green - High awareness
    C2: '#eab308', // yellow - Medium awareness
    C3: '#ef4444', // red - Low awareness
};

export default function BreakdownChart({ data, type, title }) {
    // Transform data based on type
    const transformData = () => {
        if (type === 'gender') {
            // Transform: { C1: { Laki-laki: 10, Perempuan: 5 }, ... }
            // To: [{ name: 'Laki-laki', C1: 10, C2: 8, C3: 5 }, ...]
            const categories = ['Laki-laki', 'Perempuan'];
            return categories.map(category => {
                const item = { name: category };
                Object.keys(data).forEach(cluster => {
                    item[cluster] = data[cluster][category] || 0;
                });
                return item;
            });
        } else if (type === 'age') {
            // Transform: { '18-25': { C1: 5, C2: 3, C3: 2 }, ... }
            // To: [{ name: '18-25', C1: 5, C2: 3, C3: 2 }, ...]
            return Object.keys(data).map(ageGroup => ({
                name: ageGroup,
                ...data[ageGroup]
            }));
        } else if (type === 'education') {
            // Transform: { 'SD/Sederajat': { C1: 2, C2: 3, C3: 1 }, ... }
            // To: [{ name: 'SD/Sederajat', C1: 2, C2: 3, C3: 1 }, ...]
            // Filter out education levels with no data
            return Object.keys(data)
                .filter(level => {
                    const total = data[level].C1 + data[level].C2 + data[level].C3;
                    return total > 0;
                })
                .map(level => ({
                    name: level,
                    ...data[level]
                }));
        }
        return [];
    };

    const chartData = transformData();

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload.reduce((sum, entry) => sum + entry.value, 0);
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-sm mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-gray-600">{entry.name}:</span>
                            </div>
                            <span className="font-medium">{entry.value}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="flex items-center justify-between text-sm font-semibold">
                            <span>Total:</span>
                            <span>{total}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Get label for education level (shorten if too long)
    const getLabel = (label) => {
        if (type === 'education' && label.length > 20) {
            return label.substring(0, 17) + '...';
        }
        return label;
    };

    return (
        <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
                {title}
            </div>

            {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    Tidak ada data untuk ditampilkan
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={type === 'education' ? 400 : 300}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: type === 'education' ? 80 : 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="name"
                            angle={type === 'education' ? -45 : 0}
                            textAnchor={type === 'education' ? 'end' : 'middle'}
                            height={type === 'education' ? 100 : 30}
                            tickFormatter={getLabel}
                            className="text-xs"
                        />
                        <YAxis className="text-xs" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => {
                                if (value === 'C1') return 'High (C1)';
                                if (value === 'C2') return 'Medium (C2)';
                                if (value === 'C3') return 'Low (C3)';
                                return value;
                            }}
                        />
                        <Bar dataKey="C1" fill={COLORS.C1} name="C1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="C2" fill={COLORS.C2} name="C2" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="C3" fill={COLORS.C3} name="C3" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                {['C1', 'C2', 'C3'].map(cluster => {
                    const total = chartData.reduce((sum, item) => sum + (item[cluster] || 0), 0);
                    const label = cluster === 'C1' ? 'High' : cluster === 'C2' ? 'Medium' : 'Low';
                    return (
                        <div key={cluster} className="text-center">
                            <div className="text-2xl font-bold" style={{ color: COLORS[cluster] }}>
                                {total}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {label} ({cluster})
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
