import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function QuestionnaireIndex({ questionnaires, totalEmployees, completedQuestionnaires }) {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, name: '' });

    const handleDeleteClick = (id, employeeName) => {
        setDeleteDialog({ open: true, id, name: employeeName });
    };

    const handleDeleteConfirm = () => {
        if (deleteDialog.id) {
            router.delete(route('admin.questionnaires.destroy', deleteDialog.id));
            setDeleteDialog({ open: false, id: null, name: '' });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, id: null, name: '' });
    };

    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Questionnaires' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Questionnaires" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Questionnaires</h1>
                        <p className="text-muted-foreground">Manage employee questionnaire responses</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmployees}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedQuestionnaires}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalEmployees > 0 ? Math.round((completedQuestionnaires / totalEmployees) * 100) : 0}%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Questionnaires Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Questionnaire Responses</CardTitle>
                        <CardDescription>List of all questionnaire responses from employees</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {questionnaires.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>NIP</TableHead>
                                        <TableHead>K-Score</TableHead>
                                        <TableHead>A-Score</TableHead>
                                        <TableHead>B-Score</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questionnaires.data.map((questionnaire) => {
                                        const kScore =
                                            (questionnaire.k1 +
                                                questionnaire.k2 +
                                                questionnaire.k3 +
                                                questionnaire.k4 +
                                                questionnaire.k5 +
                                                questionnaire.k6 +
                                                questionnaire.k7) /
                                            7;
                                        const aScore =
                                            (questionnaire.a1 +
                                                questionnaire.a2 +
                                                questionnaire.a3 +
                                                questionnaire.a4 +
                                                questionnaire.a5 +
                                                questionnaire.a6 +
                                                questionnaire.a7) /
                                            7;
                                        const bScore =
                                            (questionnaire.b1 +
                                                questionnaire.b2 +
                                                questionnaire.b3 +
                                                questionnaire.b4 +
                                                questionnaire.b5 +
                                                questionnaire.b6 +
                                                questionnaire.b7) /
                                            7;

                                        return (
                                            <TableRow key={questionnaire.id}>
                                                <TableCell className="font-medium">{questionnaire.employee.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{questionnaire.employee.nip}</Badge>
                                                </TableCell>
                                                <TableCell>{kScore.toFixed(2)}</TableCell>
                                                <TableCell>{aScore.toFixed(2)}</TableCell>
                                                <TableCell>{bScore.toFixed(2)}</TableCell>
                                                <TableCell>{new Date(questionnaire.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={route('admin.questionnaires.show', questionnaire.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={route('admin.questionnaires.edit', questionnaire.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(questionnaire.id, questionnaire.employee.name)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">No questionnaires found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Questionnaire</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete the questionnaire for <strong>{deleteDialog.name}</strong>? This action cannot be
                                undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
