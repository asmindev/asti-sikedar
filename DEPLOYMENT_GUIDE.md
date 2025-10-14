# 🚀 Deployment Guide - Update Label Cluster (C1/C2/C3)

## 📋 Ringkasan Perubahan

Perubahan label cluster dari `Low/Medium/High` menjadi `C1/C2/C3`:

| Label Lama | Label Baru | Performa | Warna |
|------------|------------|----------|-------|
| High       | **C1**     | Tinggi   | 🟢 Hijau |
| Medium     | **C2**     | Sedang   | 🟡 Kuning |
| Low        | **C3**     | Rendah   | 🔴 Merah |

---

## ⚠️ **PENTING - Baca Sebelum Deploy!**

### Pre-requisites:
1. ✅ Backup database production terlebih dahulu
2. ✅ Pastikan tidak ada user yang sedang melakukan clustering
3. ✅ Siapkan rollback plan
4. ✅ Test di staging environment dulu (jika ada)

---

## 🔧 Langkah Deployment Production

### **Step 1: Backup Database** 🔴 **WAJIB!**

```bash
# SSH ke server production
ssh user@production-server

# Backup database
mysqldump -u username -p database_name > backup_before_label_update_$(date +%Y%m%d_%H%M%S).sql

# Atau gunakan Laravel backup (jika sudah setup)
php artisan backup:run --only-db
```

**Verifikasi backup:**
```bash
# Cek ukuran file backup (harus > 0 bytes)
ls -lh backup_*.sql
```

---

### **Step 2: Update Code dari Repository**

```bash
# Masuk ke directory project
cd /path/to/your/laravel/project

# Pull latest code
git pull origin main

# Atau jika menggunakan branch lain
git checkout production
git pull origin production
```

---

### **Step 3: Install Dependencies (jika ada perubahan)**

```bash
# Update composer dependencies
composer install --no-dev --optimize-autoloader

# Update npm dependencies dan build assets
npm install
npm run build
```

---

### **Step 4: Maintenance Mode** 🚨

```bash
# Aktifkan maintenance mode
php artisan down --message="Updating cluster labels. We'll be back in 5 minutes."

# Atau dengan custom view
php artisan down --render="errors::503"
```

---

### **Step 5: Clear Cache**

```bash
# Clear semua cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

### **Step 6: Jalankan Migration** 🎯

```bash
# Preview migration yang akan dijalankan
php artisan migrate:status

# Jalankan migration
php artisan migrate --force

# Expected output:
#   INFO  Running migrations.
#   2025_10_14_182150_update_cluster_results_labels_to_c1_c2_c3 ... DONE
```

**⚠️ Jika gagal:**
```bash
# Rollback migration
php artisan migrate:rollback --step=1

# Restore dari backup
mysql -u username -p database_name < backup_before_label_update_*.sql

# Debug error
php artisan migrate --pretend  # Preview SQL queries
```

---

### **Step 7: Verify Data**

```bash
# Cek apakah data sudah berubah
php artisan tinker
```

```php
// Di tinker console:
\App\Models\ClusterResult::select('label', DB::raw('COUNT(*) as count'))
    ->groupBy('label')
    ->get();

// Expected output:
// [
//   { "label": "C1", "count": X },
//   { "label": "C2", "count": Y },
//   { "label": "C3", "count": Z }
// ]

// Tidak boleh ada 'Low', 'Medium', atau 'High'
```

---

### **Step 8: Cache Optimization**

```bash
# Optimize untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Jika menggunakan OPcache
php artisan optimize
```

---

### **Step 9: Disable Maintenance Mode** ✅

```bash
# Nonaktifkan maintenance mode
php artisan up
```

---

### **Step 10: Smoke Test** 🧪

Buka browser dan test:

1. ✅ **Admin Dashboard**
   - URL: `/admin/dashboard`
   - Cek apakah chart cluster menampilkan C1/C2/C3
   - Cek apakah warna masih benar (hijau/kuning/merah)

2. ✅ **Admin Cluster Analysis**
   - URL: `/admin/clusters`
   - Jalankan clustering baru
   - Cek apakah label baru (C1/C2/C3) tersimpan dengan benar
   - Export Excel dan cek header kolom

3. ✅ **User Dashboard**
   - Login sebagai user
   - Cek apakah cluster result card menampilkan C1/C2/C3
   - Cek deskripsi dan warna

4. ✅ **Saved Results Table**
   - Cek data lama yang sudah dikonversi
   - Pastikan tidak ada error

---

## 🔄 Rollback Plan (Jika Ada Masalah)

### **Option 1: Rollback Migration**
```bash
# Aktifkan maintenance mode
php artisan down

# Rollback migration
php artisan migrate:rollback --step=1

# Clear cache
php artisan cache:clear
php artisan config:clear

# Nonaktifkan maintenance mode
php artisan up
```

### **Option 2: Restore dari Backup** (Jika rollback gagal)
```bash
# Aktifkan maintenance mode
php artisan down

# Restore database
mysql -u username -p database_name < backup_before_label_update_*.sql

# Rollback code
git reset --hard HEAD~1  # Atau ke commit sebelumnya

# Clear cache
php artisan cache:clear
php artisan config:clear

# Nonaktifkan maintenance mode
php artisan up
```

---

## 📊 Monitoring Post-Deployment

### **Cek Logs**
```bash
# Monitor Laravel logs
tail -f storage/logs/laravel.log

# Monitor error logs (jika ada)
tail -f /var/log/nginx/error.log  # Nginx
tail -f /var/log/apache2/error.log  # Apache
```

### **Database Monitoring**
```sql
-- Cek distribusi label
SELECT label, COUNT(*) as count
FROM cluster_results
GROUP BY label;

-- Expected:
-- C1 | X
-- C2 | Y
-- C3 | Z

-- Cek apakah masih ada label lama (harus 0)
SELECT COUNT(*) FROM cluster_results
WHERE label IN ('Low', 'Medium', 'High');
-- Expected: 0
```

---

## 🐛 Troubleshooting

### **Problem 1: Migration Error**
```
Error: SQLSTATE[01000]: Warning: 1265 Data truncated for column 'label'
```

**Solusi:**
- Migration sudah menghandle ini dengan ALTER TABLE 2x
- Pastikan MySQL version >= 5.7

### **Problem 2: Data Tidak Berubah**
```bash
# Cek apakah migration benar-benar jalan
php artisan migrate:status

# Cek data di database langsung
mysql -u username -p
use database_name;
SELECT DISTINCT label FROM cluster_results;
```

### **Problem 3: Frontend Masih Menampilkan Label Lama**
```bash
# Clear browser cache di client
# Atau force rebuild assets
npm run build
php artisan view:clear
```

### **Problem 4: Validation Error**
```
Error: The selected label is invalid.
```

**Solusi:**
- Pastikan file `ClusterController.php` sudah diupdate
- Validasi: `in:C1,C2,C3` (bukan `Low,Medium,High`)

---

## ✅ Checklist Deployment

- [ ] Backup database production
- [ ] Test di staging environment (optional)
- [ ] Pull latest code ke production
- [ ] Install dependencies
- [ ] Enable maintenance mode
- [ ] Clear all caches
- [ ] Run migration
- [ ] Verify data di database
- [ ] Cache optimization
- [ ] Disable maintenance mode
- [ ] Smoke test semua fitur
- [ ] Monitor logs selama 1-2 jam
- [ ] Dokumentasikan hasil deployment

---

## 📞 Support

Jika ada masalah saat deployment:
1. Segera aktifkan maintenance mode
2. Cek logs error
3. Rollback jika perlu
4. Restore dari backup jika critical
5. Debug di development environment

---

## 📝 Notes

- **Downtime Estimasi:** 2-5 menit
- **Best Time:** Off-peak hours (malam/weekend)
- **Risk Level:** Medium (ada perubahan database schema)
- **Rollback Time:** < 2 menit

---

**Last Updated:** October 15, 2025
**Version:** 1.0
**Author:** Development Team
