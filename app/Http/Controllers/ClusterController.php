<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Questionnaire;
use App\Models\ClusterResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ClusterController extends Controller
{
    public function index()
    {
        $questionnaires = Questionnaire::with('employee')->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'employee' => $q->employee,
                'k1' => $q->k1,
                'k2' => $q->k2,
                'k3' => $q->k3,
                'k4' => $q->k4,
                'k5' => $q->k5,
                'k6' => $q->k6,
                'k7' => $q->k7,
                'a1' => $q->a1,
                'a2' => $q->a2,
                'a3' => $q->a3,
                'a4' => $q->a4,
                'a5' => $q->a5,
                'a6' => $q->a6,
                'a7' => $q->a7,
                'b1' => $q->b1,
                'b2' => $q->b2,
                'b3' => $q->b3,
                'b4' => $q->b4,
                'b5' => $q->b5,
                'b6' => $q->b6,
                'b7' => $q->b7,
            ];
        });

        // Get analysis statistics
        $totalSavedResults = ClusterResult::count();
        $lastAnalysisDate = ClusterResult::latest('updated_at')->first()?->updated_at;

        // Get cluster distribution
        $clusterDistribution = ClusterResult::selectRaw('label, COUNT(*) as count')
            ->groupBy('label')
            ->get()
            ->keyBy('label');

        // Get saved cluster results with employee details
        $savedResults = ClusterResult::with('employee')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($result) {
                return [
                    'id' => $result->id,
                    'employee' => $result->employee,
                    'cluster' => $result->cluster,
                    'label' => $result->label,
                    'score_k' => $result->score_k,
                    'score_a' => $result->score_a,
                    'score_b' => $result->score_b,
                    'distance_to_low' => $result->distance_to_low,
                    'distance_to_medium' => $result->distance_to_medium,
                    'distance_to_high' => $result->distance_to_high,
                    'updated_at' => $result->updated_at,
                ];
            });

        return Inertia::render('Admin/Clusters/Analysis', [
            'questionnaires' => $questionnaires,
            'savedResults' => $savedResults,
            'analysisStats' => [
                'totalSavedResults' => $totalSavedResults,
                'lastAnalysisDate' => $lastAnalysisDate,
                'clusterDistribution' => [
                    'low' => $clusterDistribution->get('C3')?->count ?? 0,
                    'medium' => $clusterDistribution->get('C2')?->count ?? 0,
                    'high' => $clusterDistribution->get('C1')?->count ?? 0,
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'results' => 'required|array',
            'results.*.employee_id' => 'required|integer|exists:employees,id',
            'results.*.cluster' => 'required|integer',
            'results.*.label' => 'required|string|in:C1,C2,C3',
            'results.*.score_k' => 'required|numeric|min:1|max:7',
            'results.*.score_a' => 'required|numeric|min:1|max:7',
            'results.*.score_b' => 'required|numeric|min:1|max:7',
            'results.*.distance_to_low' => 'nullable|numeric|min:0',
            'results.*.distance_to_medium' => 'nullable|numeric|min:0',
            'results.*.distance_to_high' => 'nullable|numeric|min:0',
        ]);

        try {
            // Log sample data untuk debugging
            Log::info('Cluster Results Sample:', [
                'first_result' => $request->results[0] ?? null,
            ]);

            DB::transaction(function () use ($request) {
                // Delete existing cluster results for these employees
                $employeeIds = collect($request->results)->pluck('employee_id');
                ClusterResult::whereIn('employee_id', $employeeIds)->delete();

                // Insert new cluster results
                foreach ($request->results as $result) {
                    ClusterResult::create([
                        'employee_id' => $result['employee_id'],
                        'cluster' => $result['cluster'],
                        'label' => $result['label'],
                        'score_k' => $result['score_k'],
                        'score_a' => $result['score_a'],
                        'score_b' => $result['score_b'],
                        'distance_to_low' => $result['distance_to_low'] ?? null,
                        'distance_to_medium' => $result['distance_to_medium'] ?? null,
                        'distance_to_high' => $result['distance_to_high'] ?? null,
                    ]);
                }
            });

            return response()->json([
                'message' => 'Cluster results saved successfully',
                'saved_count' => count($request->results)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to save cluster results',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function exportExcel()
    {
        try {
            // Get all cluster results with employee details
            $results = ClusterResult::with('employee')
                ->orderBy('label', 'asc') // C1, C2, C3
                ->orderBy('score_k', 'desc')
                ->get();

            if ($results->isEmpty()) {
                return redirect()->back()->with('error', 'Tidak ada data cluster untuk diekspor.');
            }

            // Create new Spreadsheet
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            // Set document properties
            $spreadsheet->getProperties()
                ->setCreator('ASTI SIKEDAR')
                ->setTitle('Hasil Analisis Clustering K-Means')
                ->setSubject('Clustering Results')
                ->setDescription('Hasil analisis clustering kesadaran keamanan siber karyawan');

            // Set header style
            $headerStyle = [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF'],
                    'size' => 12,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '4F46E5'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ];

            // Set title
            $sheet->setCellValue('A1', 'HASIL ANALISIS CLUSTERING K-MEANS');
            $sheet->mergeCells('A1:K1');
            $sheet->getStyle('A1')->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 16,
                    'color' => ['rgb' => '1E40AF'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ]);
            $sheet->getRowDimension('1')->setRowHeight(30);

            // Set subtitle with date
            $sheet->setCellValue('A2', 'Tanggal Export: ' . now()->format('d/m/Y H:i:s'));
            $sheet->mergeCells('A2:K2');
            $sheet->getStyle('A2')->applyFromArray([
                'font' => ['italic' => true, 'size' => 10],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            ]);

            // Set headers
            $headers = [
                'A4' => 'No',
                'B4' => 'Nama Karyawan',
                'C4' => 'Usia',
                'D4' => 'Jenis Kelamin',
                'E4' => 'Tingkat Pendidikan',
                'F4' => 'Posisi',
                'G4' => 'Kluster',
                'H4' => 'Kategori',
                'I4' => 'Skor Knowledge (1-7)',
                'J4' => 'Skor Attitude (1-7)',
                'K4' => 'Skor Behavior (1-7)',
            ];

            foreach ($headers as $cell => $value) {
                $sheet->setCellValue($cell, $value);
            }
            $sheet->getStyle('A4:K4')->applyFromArray($headerStyle);
            $sheet->getRowDimension('4')->setRowHeight(25);

            // Set column widths
            $sheet->getColumnDimension('A')->setWidth(6);
            $sheet->getColumnDimension('B')->setWidth(25);
            $sheet->getColumnDimension('C')->setWidth(8);
            $sheet->getColumnDimension('D')->setWidth(15);
            $sheet->getColumnDimension('E')->setWidth(22);
            $sheet->getColumnDimension('F')->setWidth(25);
            $sheet->getColumnDimension('G')->setWidth(10);
            $sheet->getColumnDimension('H')->setWidth(12);
            $sheet->getColumnDimension('I')->setWidth(20);
            $sheet->getColumnDimension('J')->setWidth(20);
            $sheet->getColumnDimension('K')->setWidth(20);

            // Fill data
            $row = 5;
            $no = 1;
            foreach ($results as $result) {
                $sheet->setCellValue('A' . $row, $no++);
                $sheet->setCellValue('B' . $row, $result->employee->name ?? 'N/A');
                $sheet->setCellValue('C' . $row, $result->employee->age ?? '-');
                $sheet->setCellValue('D' . $row, $result->employee->gender ?? 'N/A');
                $sheet->setCellValue('E' . $row, $result->employee->education_level ?? '-');
                $sheet->setCellValue('F' . $row, $result->employee->position ?? 'N/A');
                $sheet->setCellValue('G' . $row, $result->cluster);
                $sheet->setCellValue('H' . $row, $result->label);
                $sheet->setCellValue('I' . $row, number_format((float)$result->score_k, 2));
                $sheet->setCellValue('J' . $row, number_format((float)$result->score_a, 2));
                $sheet->setCellValue('K' . $row, number_format((float)$result->score_b, 2));

                // Apply row style based on label
                $labelColor = match ($result->label) {
                    'C1' => 'D1FAE5', // Green (Tinggi)
                    'C2' => 'FEF3C7', // Yellow (Sedang)
                    'C3' => 'FEE2E2', // Red (Rendah)
                    default => 'FFFFFF',
                };

                $sheet->getStyle('A' . $row . ':K' . $row)->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => $labelColor],
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => 'CCCCCC'],
                        ],
                    ],
                    'alignment' => [
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // Center align for certain columns
                $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle('C' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle('G' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle('H' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle('I' . $row . ':K' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);

                $row++;
            }

            // Add summary statistics
            $row += 2;
            $sheet->setCellValue('A' . $row, 'RINGKASAN STATISTIK');
            $sheet->mergeCells('A' . $row . ':K' . $row);
            $sheet->getStyle('A' . $row)->applyFromArray([
                'font' => ['bold' => true, 'size' => 12],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E0E7FF'],
                ],
            ]);

            $row++;
            $c1Count = $results->where('label', 'C1')->count();
            $c2Count = $results->where('label', 'C2')->count();
            $c3Count = $results->where('label', 'C3')->count();

            $sheet->setCellValue('A' . $row, 'Total Karyawan:');
            $sheet->setCellValue('B' . $row, $results->count());
            $sheet->setCellValue('D' . $row, 'Cluster C1 (Tinggi):');
            $sheet->setCellValue('E' . $row, $c1Count);
            $row++;
            $sheet->setCellValue('D' . $row, 'Cluster C2 (Sedang):');
            $sheet->setCellValue('E' . $row, $c2Count);
            $row++;
            $sheet->setCellValue('D' . $row, 'Cluster C3 (Rendah):');
            $sheet->setCellValue('E' . $row, $c3Count);

            // Create response with Excel file
            $fileName = 'Hasil_Clustering_' . now()->format('Y-m-d_His') . '.xlsx';

            $response = new StreamedResponse(function () use ($spreadsheet) {
                $writer = new Xlsx($spreadsheet);
                $writer->save('php://output');
            });

            $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            $response->headers->set('Content-Disposition', 'attachment;filename="' . $fileName . '"');
            $response->headers->set('Cache-Control', 'max-age=0');

            return $response;
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengekspor data: ' . $e->getMessage());
        }
    }
}
