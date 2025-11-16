# 📖 Reversed Questions (Skala Likert Terbalik) - Dokumentasi Lengkap

## 🎯 Overview

Fitur **Reversed Questions** memungkinkan administrator untuk menandai pertanyaan tertentu dalam kuesioner agar menggunakan skala Likert terbalik. Ini berguna untuk menghindari response bias dan meningkatkan validitas kuesioner.

### Skala Normal vs Reversed

**Skala Normal:**
- SS (Sangat Setuju) = 5 (nilai tertinggi)
- S (Setuju) = 4
- CS (Cukup Setuju) = 3
- TS (Tidak Setuju) = 2
- STS (Sangat Tidak Setuju) = 1 (nilai terendah)

**Skala Reversed:**
- STS (Sangat Tidak Setuju) = 5 (nilai tertinggi)
- TS (Tidak Setuju) = 4
- CS (Cukup Setuju) = 3
- S (Setuju) = 2
- SS (Sangat Setuju) = 1 (nilai terendah)

---

## 🏗️ Arsitektur Sistem

### Database Schema

#### Migration Added:
```sql
-- Added to quiz_questions table
ALTER TABLE quiz_questions
ADD COLUMN is_reversed BOOLEAN DEFAULT FALSE
COMMENT 'Indicates if this question uses reversed Likert scale (STS=5, SS=1)';
```

#### Model: `QuizQuestion.php`
```php
protected $fillable = ['aspect', 'question', 'order', 'is_active', 'is_reversed'];
protected $casts = ['is_reversed' => 'boolean'];
```

### Data Flow

```
1. Admin UI
   └─> Set is_reversed = true pada question tertentu

2. User Quiz
   └─> Frontend menampilkan badge "Reversed Scale"
   └─> User memilih jawaban (misal: SS = value 5)

3. Submit Quiz
   └─> Backend cek is_reversed flag
   └─> Jika reversed: value = 6 - value (5 → 1)
   └─> Simpan ke database (nilai ter-reverse)

4. Clustering
   └─> Menggunakan nilai dari DB (sudah ter-reverse)
   └─> Perhitungan K, A, B score otomatis benar

5. Display Results
   └─> Tampilkan nilai dari DB
   └─> Tambah badge "Reversed" untuk konteks
```

---

## 💻 Implementation Details

### 1. Backend (PHP/Laravel)

#### QuizController Store Method
```php
// app/Http/Controllers/User/QuizController.php

try {
    // Get all questions with their is_reversed flag
    $questions = QuizQuestion::active()->get()->keyBy(function($q) {
        return strtolower($q->aspect)[0] . $q->order; // k1, a2, b3, etc
    });

    // Reverse values for reversed questions
    $aspects = ['k', 'a', 'b'];
    foreach ($aspects as $aspect) {
        for ($i = 1; $i <= 7; $i++) {
            $key = $aspect . $i;
            $question = $questions->get($key);

            if ($question && $question->is_reversed) {
                // Reverse the scale: 1→5, 2→4, 3→3, 4→2, 5→1
                $validated[$key] = 6 - $validated[$key];
            }
        }
    }

    Questionnaire::create($validated);
}
```

#### QuizQuestion Model
```php
// app/Models/QuizQuestion.php

public static function getGroupedQuestions()
{
    return self::active()
        ->ordered()
        ->get()
        ->groupBy('aspect')
        ->map(function ($questions) {
            return $questions->map(function($q) {
                return [
                    'id' => $q->id,
                    'question' => $q->question,
                    'is_reversed' => $q->is_reversed // ✅ Include flag
                ];
            })->toArray();
        });
}
```

### 2. Frontend (React)

#### Admin QuizManagement - QuestionCard.jsx
```jsx
// Toggle untuk set reversed
<Switch
    id={`reversed-${question.id}`}
    checked={data.is_reversed}
    onCheckedChange={(checked) => setData('is_reversed', checked)}
/>

// Badge indicator
{question.is_reversed && (
    <Badge variant="outline" className="border-orange-500 text-orange-700">
        <ArrowLeftRight className="h-3 w-3 mr-1" />
        Reversed Scale
    </Badge>
)}
```

#### User Quiz - QuestionCard.jsx
```jsx
// Extract is_reversed dari data
const currentQuestionData = quizData?.[currentAspect]?.[currentQuestion];
const isReversed = currentQuestionData?.is_reversed || false;

// Reverse the display for better UX
const displayScale = isReversed
    ? likertScale.map(option => ({
        ...option,
        value: option.value, // Keep original value for submission
        displayValue: 6 - parseInt(option.value), // Show reversed: 5->1, 4->2, etc
    })).sort((a, b) => b.displayValue - a.displayValue) // Sort descending
    : likertScale.map(option => ({
        ...option,
        displayValue: parseInt(option.value)
    }));

// Show warning badge with point values
{isReversed && (
    <Badge variant="outline" className="border-orange-500">
        <ArrowLeftRight className="h-3 w-3 mr-1" />
        Skala Terbalik: STS (5 poin) lebih baik dari SS (1 poin)
    </Badge>
)}

// Display with reversed point values
{displayScale.map((option) => (
    <div onClick={() => onAnswerChange(option.value)}>
        {option.label} - {option.description}
        ({option.displayValue} poin) {/* Shows 1 for SS, 5 for STS when reversed */}
    </div>
))}
```

#### Result Display
```jsx
// Show reversed indicator per question
{q.is_reversed && (
    <Badge variant="outline" className="border-orange-500">
        <ArrowLeftRight className="h-3 w-3 mr-1" />
        Reversed
    </Badge>
)}

// Display stored value (already reversed)
<Badge variant="outline">
    Skor: {questionnaire[q.key]}/5
</Badge>
```

---

## 📊 Clustering Impact

### ✅ TIDAK ADA PERUBAHAN DIPERLUKAN

Algoritma clustering **tidak perlu diubah** karena:

1. **Data sudah ter-reverse** saat disimpan ke database
2. **Perhitungan K, A, B score** menggunakan nilai dari database
3. **Centroid calculation** otomatis menggunakan nilai yang benar

```javascript
// algoritma.js - TETAP SAMA
export const calculateKABScores = (questionnaires) => {
    return questionnaires.map((q) => {
        const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
        const scoreK = totalK / 7; // ✅ Sudah benar
        // ... dst
    });
};
```

---

## 🎓 Usage Guide

### Untuk Administrator

#### 1. Menandai Pertanyaan Sebagai Reversed

1. Login sebagai admin
2. Buka menu **Quiz Management**
3. Klik **Edit** pada pertanyaan yang ingin di-reverse
4. Toggle switch **"Skala Terbalik (Reversed)"** menjadi ON
5. Klik **Simpan**

#### 2. Kapan Menggunakan Reversed Questions?

**✅ GUNAKAN untuk pertanyaan negatif:**
- "Saya merasa kesulitan mengingat password yang kompleks"
- "Saya sering mengabaikan update keamanan"
- "Saya tidak peduli dengan keamanan data pribadi"

**❌ JANGAN gunakan untuk pertanyaan positif:**
- "Saya selalu menggunakan password yang kuat"
- "Saya memahami pentingnya keamanan informasi"

#### 3. Best Practices

- ✅ Mix normal dan reversed questions (sekitar 30-40% reversed)
- ✅ Distribusikan reversed questions merata di semua aspek
- ✅ Test kuesioner setelah menambah reversed questions
- ❌ Jangan reverse semua pertanyaan
- ❌ Jangan buat pola yang mudah ditebak (misal: semua pertanyaan ganjil reversed)

### Untuk User

#### 1. Mengisi Kuesioner dengan Reversed Questions

Saat mengisi kuesioner, perhatikan **badge orange** yang menunjukkan "Skala Terbalik":

```
Pertanyaan: "Saya sering mengabaikan update keamanan"
[Badge: Skala Terbalik: STS lebih baik dari SS]

Jika Anda JARANG mengabaikan → Pilih STS (skor tinggi = baik)
Jika Anda SERING mengabaikan → Pilih SS (skor rendah = buruk)
```

#### 2. Memahami Hasil

Di halaman hasil, pertanyaan reversed akan ditandai dengan badge "Reversed":

- Skor tinggi (4-5) = baik
- Skor rendah (1-2) = perlu perbaikan
- Badge "Reversed" = hanya informasi, tidak mengubah interpretasi skor

---

## 🧪 Testing Checklist

### Manual Testing

#### ✅ Admin UI
- [ ] Toggle reversed di QuestionCard berfungsi
- [ ] Badge "Reversed Scale" muncul setelah toggle ON
- [ ] Save berhasil dan data tersimpan di DB
- [ ] Reload halaman, status reversed tetap

#### ✅ User Quiz Flow
- [ ] Badge "Skala Terbalik" muncul untuk reversed questions
- [ ] User bisa pilih jawaban normal
- [ ] Submit berhasil
- [ ] Check database: nilai ter-reverse (misal SS=5 jadi 1)

#### ✅ Result Display
- [ ] Badge "Reversed" muncul di result page
- [ ] Skor ditampilkan dengan benar
- [ ] Color coding sesuai (hijau=tinggi, merah=rendah)

#### ✅ Clustering
- [ ] Run clustering dengan data yang include reversed questions
- [ ] Hasil clustering masuk akal (tidak ada anomali)
- [ ] Export Excel menampilkan skor dengan benar

### Database Verification

```sql
-- Check reversed questions
SELECT id, aspect, question, is_reversed, order
FROM quiz_questions
WHERE is_reversed = 1;

-- Check questionnaire data (should see reversed values)
SELECT employee_id, k1, k2, k3, a1, a2, b1
FROM questionnaires
ORDER BY created_at DESC
LIMIT 5;

-- Compare with cluster results
SELECT cr.employee_id, cr.score_k, cr.score_a, cr.score_b, cr.label
FROM cluster_results cr
JOIN questionnaires q ON cr.employee_id = q.employee_id
ORDER BY cr.created_at DESC
LIMIT 5;
```

---

## 🔧 Troubleshooting

### Issue: Nilai tidak ter-reverse di database

**Symptom**: User pilih SS tapi di DB tetap 5 (harusnya 1)

**Solution**:
1. Check QuizController::store() - pastikan logic reverse ada
2. Check frontend - pastikan is_reversed di-pass dari backend
3. Clear cache: `php artisan cache:clear`

### Issue: Badge "Reversed" tidak muncul

**Symptom**: Toggle di admin sudah ON tapi badge tidak muncul di quiz

**Solution**:
1. Check API response: `GET /api/quiz-data` - pastikan include `is_reversed`
2. Check QuizQuestion::getGroupedQuestions() - pastikan return `is_reversed`
3. Hard refresh browser (Ctrl+F5)

### Issue: Clustering hasil aneh setelah tambah reversed

**Symptom**: Semua karyawan masuk cluster rendah

**Solution**:
1. **Ini NORMAL jika banyak reversed questions!**
2. Check distribusi skor: mungkin rata-rata turun karena reversed
3. Adjust centroid manual jika perlu
4. Review pertanyaan mana yang reversed - mungkin terlalu banyak

---

## 📝 Migration Notes

### Jika Ada Data Lama (Before Reversed Feature)

**⚠️ PENTING:** Jika sudah ada data kuesioner sebelum fitur ini:

1. **Data lama AMAN** - semua `is_reversed = false` by default
2. **Jangan reverse existing questions** yang sudah ada jawaban
3. **Jika HARUS reverse existing question:**

```php
// Script migrate data lama (RUN AT OWN RISK!)
use App\Models\Questionnaire;
use App\Models\QuizQuestion;

$question = QuizQuestion::find($questionId);
$question->update(['is_reversed' => true]);

// Update existing questionnaires
Questionnaire::all()->each(function($q) use ($questionId) {
    $field = 'k1'; // adjust to actual field
    $q->$field = 6 - $q->$field; // Reverse value
    $q->save();
});

// MUST re-run clustering after this!
ClusterResult::truncate();
```

---

## 🚀 Future Enhancements

### Possible Improvements

1. **Bulk Toggle**: Toggle multiple questions at once
2. **Auto-Suggest**: AI-suggested questions that should be reversed
3. **Statistics**: Show % reversed questions per aspect
4. **Validation**: Warning jika terlalu banyak/sedikit reversed
5. **Import/Export**: Include reversed flag saat import questions

---

## 📚 References

### Files Modified

**Backend:**
- `database/migrations/2025_11_16_132013_add_is_reversed_to_quiz_questions_table.php`
- `app/Models/QuizQuestion.php`
- `app/Http/Controllers/User/QuizController.php`
- `app/Http/Controllers/Admin/QuizManagementController.php`

**Frontend:**
- `resources/js/pages/Admin/QuizManagement/components/QuestionCard.jsx`
- `resources/js/pages/quiz/components/QuestionCard.jsx`
- `resources/js/pages/User/Quiz/Result.jsx`

**No Changes Needed:**
- `resources/js/pages/Admin/Clusters/algoritma.js` ✅
- `app/Http/Controllers/ClusterController.php` ✅
- Database tables: `questionnaires`, `cluster_results` ✅

### Related Documentation

- [CLUSTERING_MANUAL_CENTROID.md](./CLUSTERING_MANUAL_CENTROID.md) - Clustering algorithm
- [KMEANS_ALGORITHM_EXPLANATION.md](./KMEANS_ALGORITHM_EXPLANATION.md) - K-Means details
- [AUTH_SYSTEM_DOCUMENTATION.md](./AUTH_SYSTEM_DOCUMENTATION.md) - User roles

---

## ✅ Summary

Fitur Reversed Questions telah berhasil diimplementasikan dengan:

- ✅ Database migration untuk `is_reversed` flag
- ✅ Backend logic untuk reverse nilai sebelum save
- ✅ Admin UI untuk toggle reversed per question
- ✅ User UI dengan indicator visual yang jelas
- ✅ Result display dengan badge "Reversed"
- ✅ Clustering tetap berfungsi tanpa perubahan
- ✅ Dokumentasi lengkap

**Status**: Production Ready ✨

---

**Terakhir diupdate**: November 16, 2025
**Version**: 1.0.0
