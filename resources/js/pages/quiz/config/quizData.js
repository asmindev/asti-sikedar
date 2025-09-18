export const quizData = {
    knowledge: [
        "Memilih kata sandi yang kuat.",
        "Memahami risiko membuka lampiran dari pengirim tidak dikenal.",
        "Mengetahui bahaya mengakses situs ilegal atau bajakan.",
        "Menyadari risiko akses data kerja lewat Wi-Fi publik.",
        "Mengetahui risiko membagikan informasi kantor di media sosial.",
        "Memahami pentingnya klasifikasi dokumen rahasia.",
        "Mengetahui prosedur pelaporan insiden keamanan."
    ],
    attitude: [
        "Tidak berbagi kata sandi.",
        "Waspada terhadap email yang mencurigakan.",
        "Meyakini bahwa penggunaan internet harus sesuai kebijakan.",
        "Tidak nyaman menggunakan perangkat pribadi untuk urusan kantor.",
        "Menjaga privasi digital.",
        "Meyakini bahwa dokumen penting harus disimpan dengan aman.",
        "Meyakini pentingnya segera melaporkan insiden."
    ],
    behavior: [
        "Tidak menggunakan kata sandi yang sama untuk akun berbeda.",
        "Tidak membuka link dari email spam.",
        "Hanya mengakses situs resmi dan aman saat bekerja.",
        "Menggunakan VPN saat akses dokumen melalui HP.",
        "Tidak mengunggah dokumen kantor ke media sosial.",
        "Mengunci workstation saat meninggalkan meja.",
        "Melaporkan email phishing atau aktivitas mencurigakan."
    ]
};

export const likertScale = [
    { value: '5', label: 'SS', description: 'Sangat Setuju' },
    { value: '4', label: 'S', description: 'Setuju' },
    { value: '3', label: 'CS', description: 'Cukup Setuju' },
    { value: '2', label: 'TS', description: 'Tidak Setuju' },
    { value: '1', label: 'STS', description: 'Sangat Tidak Setuju' }
];

export const aspectTitles = {
    knowledge: 'Aspek Knowledge (Pengetahuan)',
    attitude: 'Aspek Attitude (Sikap)',
    behavior: 'Aspek Behavior (Perilaku)'
};

export const TOTAL_QUESTIONS = 21;
export const QUESTIONS_PER_ASPECT = 7;
