import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from '@inertiajs/react';
import { Save, Edit3, GripVertical, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function QuestionCard({ question, aspectTitle, canEdit = true }) {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        question: question.question
    });

    const handleSave = () => {
        console.log('Saving question:', data);
        put(route('admin.quiz-management.update', question.id), {
            onSuccess: () => {
                setIsEditing(false);
                toast.success('Question updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update question');
            }
        });
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <Card className="group relative">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GripVertical className="h-3 w-3 cursor-grab text-muted-foreground" />
                        <Badge variant="outline" className="font-mono text-xs px-1.5 py-0.5">
                            Q{question.order}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {aspectTitle}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-1.5">
                            <Switch
                                checked={question.is_active}
                                disabled={true}
                                size="sm"
                            />
                            <Label className="text-xs text-muted-foreground">
                                Aktif
                            </Label>
                        </div>
                        {canEdit && !isEditing && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit3 className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {isEditing ? (
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor={`question-${question.id}`} className="text-xs font-medium">
                                Teks Pertanyaan
                            </Label>
                            <Textarea
                                id={`question-${question.id}`}
                                value={data.question}
                                onChange={(e) => setData('question', e.target.value)}
                                placeholder="Masukkan teks pertanyaan..."
                                className="mt-1 min-h-[80px] text-sm"
                                autoFocus
                            />
                            {errors.question && (
                                <Alert variant="destructive" className="mt-2 py-2">
                                    <AlertCircle className="h-3 w-3" />
                                    <AlertDescription className="text-xs">{errors.question}</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancel}
                                disabled={processing}
                                className="h-7 px-2 text-xs"
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={processing || !data.question.trim()}
                                className="h-7 px-2 text-xs"
                            >
                                <Save className="h-3 w-3 mr-1" />
                                Simpan
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="text-sm leading-relaxed">
                            {question.question}
                        </p>
                        {!question.is_active && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                Tidak Aktif
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
