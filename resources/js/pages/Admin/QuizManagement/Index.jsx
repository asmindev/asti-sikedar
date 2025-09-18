import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AspectSection from './components/AspectSection';
import LikertOptionsManager from './components/LikertOptionsManager';
import { Brain, Settings, BarChart3, AlertTriangle } from 'lucide-react';

export default function Index({ auth, questions, likertOptions, stats }) {
    const aspects = {
        knowledge: questions.filter(q => q.aspect === 'knowledge'),
        attitude: questions.filter(q => q.aspect === 'attitude'),
        behavior: questions.filter(q => q.aspect === 'behavior')
    };

    const aspectConfig = {
        knowledge: {
            title: 'Knowledge (Pengetahuan)',
            description: 'Questions measuring understanding and knowledge',
            icon: Brain,
            color: 'blue'
        },
        attitude: {
            title: 'Attitude (Sikap)',
            description: 'Questions measuring attitudes and beliefs',
            icon: Brain,
            color: 'green'
        },
        behavior: {
            title: 'Behavior (Perilaku)',
            description: 'Questions measuring behavior and actions',
            icon: Brain,
            color: 'purple'
        }
    };

    const hasConstraintViolations = Object.values(aspects).some(aspectQuestions =>
        aspectQuestions.length !== 7
    );

    return (
        <AdminLayout breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Quiz Management' }
        ]}>
            <Head title="Quiz Management" />

            <div className="p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Total Questions
                                        </p>
                                        <p className="text-2xl font-bold">{questions.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Knowledge
                                        </p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {aspects.knowledge.length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Attitude
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {aspects.attitude.length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Behavior
                                        </p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            {aspects.behavior.length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Constraint Validation Alert */}
                    {hasConstraintViolations && (
                        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800 dark:text-amber-200">
                                <strong>Constraint Violation:</strong> Each aspect must have exactly 7 questions.
                                Please review and adjust the questions to meet this requirement.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Tabs defaultValue="questions" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="questions" className="flex items-center gap-2">
                                <Brain className="h-4 w-4" />
                                Questions Management
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Quiz Settings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="questions" className="space-y-8">
                            {/* Instructions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Questions Overview</CardTitle>
                                    <CardDescription>
                                        Manage quiz questions across three aspects. Each aspect must contain exactly 7 questions.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                                                Knowledge Aspect
                                            </h4>
                                            <p className="text-blue-700 dark:text-blue-300">
                                                Measures understanding and factual knowledge
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                                            <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                                                Attitude Aspect
                                            </h4>
                                            <p className="text-green-700 dark:text-green-300">
                                                Measures opinions, beliefs, and feelings
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                                            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                                                Behavior Aspect
                                            </h4>
                                            <p className="text-purple-700 dark:text-purple-300">
                                                Measures actions and behavioral intentions
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Aspect Sections */}
                            <Tabs defaultValue="knowledge" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="knowledge" className="flex items-center gap-2">
                                        <Brain className="h-4 w-4 text-blue-600" />
                                        Knowledge ({aspects.knowledge.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="attitude" className="flex items-center gap-2">
                                        <Brain className="h-4 w-4 text-green-600" />
                                        Attitude ({aspects.attitude.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="behavior" className="flex items-center gap-2">
                                        <Brain className="h-4 w-4 text-purple-600" />
                                        Behavior ({aspects.behavior.length})
                                    </TabsTrigger>
                                </TabsList>

                                {Object.entries(aspects).map(([aspectKey, aspectQuestions]) => (
                                    <TabsContent key={aspectKey} value={aspectKey} className="mt-6">
                                        <AspectSection
                                            aspect={aspectKey}
                                            title={aspectConfig[aspectKey].title}
                                            questions={aspectQuestions}
                                        />
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-6">
                            <LikertOptionsManager options={likertOptions} />

                            {/* Quiz Statistics */}
                            {stats && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quiz Statistics</CardTitle>
                                        <CardDescription>
                                            Usage statistics and performance metrics
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                <p className="text-sm font-medium text-muted-foreground">Total Responses</p>
                                                <p className="text-xl font-bold">{stats.totalResponses || 0}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                <p className="text-sm font-medium text-muted-foreground">Avg. Completion Time</p>
                                                <p className="text-xl font-bold">{stats.avgCompletionTime || 'N/A'}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                                <p className="text-xl font-bold">
                                                    {questions.length > 0
                                                        ? new Date(Math.max(...questions.map(q => new Date(q.updated_at)))).toLocaleDateString()
                                                        : 'Never'
                                                    }
                                                </p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                <p className="text-sm font-medium text-muted-foreground">Active Questions</p>
                                                <p className="text-xl font-bold">
                                                    {questions.filter(q => q.is_active).length}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
        </AdminLayout>
    );
}
