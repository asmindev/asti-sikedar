<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Knowledge questions
        $knowledgeQuestions = [
            "Memilih kata sandi yang kuat.",
            "Memahami risiko membuka lampiran dari pengirim tidak dikenal.",
            "Mengetahui bahaya mengakses situs ilegal atau bajakan.",
            "Menyadari risiko akses data kerja lewat Wi-Fi publik.",
            "Mengetahui risiko membagikan informasi kantor di media sosial.",
            "Memahami pentingnya klasifikasi dokumen rahasia.",
            "Mengetahui prosedur pelaporan insiden keamanan."
        ];

        // Attitude questions
        $attitudeQuestions = [
            "Tidak berbagi kata sandi.",
            "Waspada terhadap email yang mencurigakan.",
            "Meyakini bahwa penggunaan internet harus sesuai kebijakan.",
            "Tidak nyaman menggunakan perangkat pribadi untuk urusan kantor.",
            "Menjaga privasi digital.",
            "Meyakini bahwa dokumen penting harus disimpan dengan aman.",
            "Meyakini pentingnya segera melaporkan insiden."
        ];

        // Behavior questions
        $behaviorQuestions = [
            "Tidak menggunakan kata sandi yang sama untuk akun berbeda.",
            "Tidak membuka link dari email spam.",
            "Hanya mengakses situs resmi dan aman saat bekerja.",
            "Menggunakan VPN saat akses dokumen melalui HP.",
            "Tidak mengunggah dokumen kantor ke media sosial.",
            "Mengunci workstation saat meninggalkan meja.",
            "Melaporkan email phishing atau aktivitas mencurigakan."
        ];

        // Insert knowledge questions
        foreach ($knowledgeQuestions as $index => $question) {
            QuizQuestion::create([
                'aspect' => QuizQuestion::ASPECT_KNOWLEDGE,
                'question' => $question,
                'order' => $index + 1,
                'is_active' => true
            ]);
        }

        // Insert attitude questions
        foreach ($attitudeQuestions as $index => $question) {
            QuizQuestion::create([
                'aspect' => QuizQuestion::ASPECT_ATTITUDE,
                'question' => $question,
                'order' => $index + 1,
                'is_active' => true
            ]);
        }

        // Insert behavior questions
        foreach ($behaviorQuestions as $index => $question) {
            QuizQuestion::create([
                'aspect' => QuizQuestion::ASPECT_BEHAVIOR,
                'question' => $question,
                'order' => $index + 1,
                'is_active' => true
            ]);
        }
    }
}
