import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, FileText, Upload } from 'lucide-react';

export default function QuestionnaireUpload() {
    const { data, setData, post, processing, errors, progress } = useForm({
        csv_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.questionnaires.store'));
    };
    //  add breadcrumb
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Upload Questionnaires' }];
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Questionnaires" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Upload Questionnaires</h1>
                    <p className="text-muted-foreground">Import questionnaire data from CSV files</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Upload className="mr-2 h-5 w-5" />
                                CSV File Upload
                            </CardTitle>
                            <CardDescription>Upload a CSV file containing questionnaire data</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="csv_file">CSV File</Label>
                                    <Input
                                        id="csv_file"
                                        type="file"
                                        accept=".csv,.txt"
                                        onChange={(e) => setData('csv_file', e.target.files[0])}
                                        className="mt-2"
                                    />
                                    {errors.csv_file && <p className="mt-1 text-sm text-red-600">{errors.csv_file}</p>}
                                </div>

                                {progress && (
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${progress.percentage}%` }}
                                        ></div>
                                    </div>
                                )}

                                <Button type="submit" disabled={processing || !data.csv_file}>
                                    {processing ? 'Uploading...' : 'Upload CSV'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                CSV Format Guidelines
                            </CardTitle>
                            <CardDescription>Follow these guidelines for successful import</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>Ensure your CSV file follows the correct format:</AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <h4 className="font-medium">Required Columns:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Employee ID</li>
                                    <li>• Question responses</li>
                                    <li>• Timestamp</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">File Requirements:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Maximum file size: 2MB</li>
                                    <li>• Supported formats: .csv, .txt</li>
                                    <li>• UTF-8 encoding preferred</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
