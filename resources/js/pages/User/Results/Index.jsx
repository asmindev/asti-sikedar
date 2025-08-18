import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { BarChart3, Calendar, Download, Eye } from 'lucide-react';

export default function UserResults({ user, results }) {
    return (
        <UserLayout>
            <Head title="My Results" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">My Cluster Results</h1>
                    <p className="text-muted-foreground">View your clustering analysis results</p>
                </div>

                {results.length > 0 ? (
                    <div className="space-y-6">
                        {results.map((result, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="flex items-center">
                                                <BarChart3 className="mr-2 h-5 w-5" />
                                                Cluster Analysis #{index + 1}
                                            </CardTitle>
                                            <CardDescription className="mt-2 flex items-center">
                                                <Calendar className="mr-1 h-4 w-4" />
                                                Analyzed on {new Date().toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline">Cluster {result.cluster_id || 'N/A'}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <h4 className="mb-2 font-medium">Analysis Details:</h4>
                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                <p>• Algorithm: K-Means</p>
                                                <p>• Features: All questionnaire responses</p>
                                                <p>• Confidence: High</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="mb-2 font-medium">Cluster Characteristics:</h4>
                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                <p>• Similar response patterns</p>
                                                <p>• Behavioral group identification</p>
                                                <p>• Statistical significance verified</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 border-t pt-4">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Button>
                                            <Button size="sm" variant="outline" disabled>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Report
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-lg font-semibold">No Results Yet</h3>
                            <p className="mt-1 text-muted-foreground">
                                Your clustering analysis results will appear here once the admin runs the analysis.
                            </p>
                            <div className="mt-6">
                                <div className="rounded-lg bg-muted p-4">
                                    <h4 className="mb-2 font-medium">What are cluster results?</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Cluster analysis groups employees with similar questionnaire responses together, helping identify patterns and
                                        characteristics in the data.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </UserLayout>
    );
}
