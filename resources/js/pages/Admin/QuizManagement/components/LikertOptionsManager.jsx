import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from '@inertiajs/react';
import { Save, Edit3, Settings, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function LikertOptionsManager({ options }) {
    const [editingId, setEditingId] = useState(null);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <div>
                        <CardTitle>Opsi Skala Likert</CardTitle>
                        <CardDescription>
                            Konfigurasi opsi respons untuk pertanyaan kuis
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {options.map((option) => (
                        <LikertOptionCard
                            key={option.id}
                            option={option}
                            isEditing={editingId === option.id}
                            onEdit={() => setEditingId(option.id)}
                            onCancel={() => setEditingId(null)}
                            onSave={() => setEditingId(null)}
                        />
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Panduan Skala Likert
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Opsi diurutkan dari persetujuan tertinggi (5) ke terendah (1)</li>
                        <li>• Label harus berupa singkatan pendek (SS, S, CS, TS, STS)</li>
                        <li>• Deskripsi harus jelas dan tidak ambigu</li>
                        <li>• Perubahan memengaruhi semua respons kuis di masa depan</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

function LikertOptionCard({ option, isEditing, onEdit, onCancel, onSave }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        label: option.label,
        description: option.description
    });

    const handleSave = () => {
        put(route('admin.quiz-management.likert-options.update', option.id), {
            onSuccess: () => {
                onSave();
                toast.success('Likert option updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update likert option');
            }
        });
    };

    const handleCancel = () => {
        reset();
        onCancel();
    };

    const getValueBadgeColor = (value) => {
        if (value >= 4) return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
        if (value === 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400';
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
    };

    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
            <Badge className={`font-mono text-sm min-w-[2rem] justify-center ${getValueBadgeColor(option.value)}`}>
                {option.value}
            </Badge>

            {isEditing ? (
                <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor={`label-${option.id}`} className="text-sm">
                                Label
                            </Label>
                            <Input
                                id={`label-${option.id}`}
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="SS"
                                className="mt-1"
                                maxLength={10}
                            />
                            {errors.label && (
                                <p className="text-sm text-destructive mt-1">{errors.label}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor={`description-${option.id}`} className="text-sm">
                                Deskripsi
                            </Label>
                            <Input
                                id={`description-${option.id}`}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Sangat Setuju"
                                className="mt-1"
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={processing || !data.label.trim() || !data.description.trim()}
                        >
                            <Save className="h-4 w-4 mr-1" />
                            Simpan
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                                {option.label}
                            </Badge>
                            <span className="text-sm">
                                {option.description}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onEdit}
                    >
                        <Edit3 className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    );
}
