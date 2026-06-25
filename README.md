# Gorden Yulie Batu - Website & Sistem Manajemen Interior

Website resmi dan platform manajemen katalog interaktif untuk **Gorden Yulie Batu**, penyedia gorden dan interior premium tepercaya di Kota Batu & Malang Raya, Jawa Timur. Sistem ini dibangun dengan kombinasi frontend modern berbasis **React 19 + Tailwind CSS v4** dan backend fleksibel yang siap diintegrasikan langsung ke dalam arsitektur **Laravel (PHP)**.

---

## 🌟 Fitur Utama Aplikasi

1. **Beranda Dinamis**: Tampilan interaktif dengan animasi halus, menonjolkan nilai keunggulan produk dan nilai estetika tinggi untuk dekorasi hunian modern.
2. **Katalog Interaktif & Kalkulator Estimasi Harga**: Pengguna dapat memfilter produk berdasarkan kategori (Gorden, Vitrase, Roller Blind, Wallpaper, Kitchen Set) dan melakukan kalkulasi estimasi harga gorden secara langsung berdasarkan ukuran lebar & tinggi jendela.
3. **Portofolio Pengerjaan**: Galeri proyek yang terorganisir dengan rapi (Villa, Residensial, Hotel) yang telah selesai dikerjakan oleh tim Gorden Yulie.
4. **Testimoni Pelanggan**: Bagian khusus ulasan pelanggan setia dari berbagai pemilik properti di area Batu dan Malang, terintegrasi penuh ke database.
5. **Formulir Hubungi Kami**: Memudahkan pelanggan untuk konsultasi gratis, melakukan pengukuran ke rumah, atau langsung terhubung ke WhatsApp Admin.
6. **Admin Dashboard Terintegrasi**: Panel admin khusus untuk melakukan manajemen data produk, portofolio proyek, serta testimoni pelanggan secara real-time.
7. **Routing & State Resilience**: Navigasi SPA yang tangguh menggunakan sistem sinkronisasi Hash State, menjaga halaman tetap aktif di tempat yang sama ketika pengguna melakukan penyegaran (*refresh*) browser.

---

## 🛠️ Arsitektur Teknologi

### Frontend (Modern SPA)
- **React 19** & **TypeScript**
- **Tailwind CSS v4** (Desain responsif & kustomisasi warna elegan)
- **Motion** (Mesin animasi transisi halaman & interaksi mikro)
- **Lucide React** (Kumpulan ikon minimalis)

### Backend & Database (Dual-Core Support)
Proyek ini didesain secara modular untuk mendukung dua jenis lingkungan:
1. **Lingkungan SPA Playground (Express Node.js)**: 
   Menggunakan Express + file penyimpanan lokal `/storage/db.json` untuk pengujian, modifikasi cepat, dan pratinjau instan tanpa perlu mengonfigurasi PHP/Web Server.
2. **Lingkungan Produksi (Laravel PHP)**:
   Menggunakan arsitektur Laravel Controller, Eloquent ORM, PHP Migrations, dan Database Seeder untuk persistensi SQL di server produksi.

---

## 📦 Petunjuk Penggunaan Lingkungan SPA Playground (Express Node.js)

Gunakan metode ini jika Anda ingin menjalankan atau mengembangkan frontend React secara instan menggunakan server Node.js.

### 1. Instalasi Dependensi
Pastikan Node.js (v18+) telah terpasang di komputer Anda, lalu jalankan perintah berikut di direktori root proyek:
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Dev Mode)
Jalankan perintah berikut untuk memulai server lokal berbasis `tsx` dan `vite` di port `3000`:
```bash
npm run dev
```
Setelah server berjalan, Anda dapat mengakses aplikasi di browser melalui:  
👉 **`http://localhost:3000`**

### 3. Build & Produksi SPA
Untuk melakukan kompilasi backend Express serta aset statis React untuk siap dijalankan di server Node.js produksi:
```bash
npm run build
npm start
```

---

## 🐘 Petunjuk Integrasi & Migrasi ke Laravel (PHP)

Proyek ini telah dilengkapi dengan struktur backend Laravel lengkap. Ikuti petunjuk berikut untuk mengintegrasikan frontend React + Vite + Tailwind v4 ke dalam sistem Laravel Anda.

### 1. Persiapan Struktur Laravel
Pastikan struktur folder berikut berada pada posisi yang tepat di root direktori Laravel Anda:
- **Aset & Komponen**: `resources/js/` (berisi komponen React, `App.tsx`, `main.tsx`, dan modul styling)
- **Konfigurasi Vite**: `vite.config.ts` (menggunakan `@tailwindcss/vite` & `laravel-vite-plugin`)
- **Database Migrations**: `database/migrations/` (berisi skema tabel untuk produk, proyek, dan testimoni)
- **Laravel Models**: `app/Models/` (berisi model `Product.php`, `Project.php`, dan `Testimonial.php`)
- **Laravel Controllers**: `app/Http/Controllers/` (berisi pengolahan API)
- **Laravel Routes**: `routes/web.php` (berisi definisi rute API dan fallback rute SPA)

### 2. Jalankan Migrasi & Seeder Database
Konfigurasikan file `.env` Laravel Anda agar terhubung dengan database SQL pilihan Anda (MySQL, PostgreSQL, atau SQLite). Kemudian, jalankan perintah migrasi dan pengisian data bawaan (*seeding*):

```bash
# Menjalankan migrasi seluruh tabel (User, Products, Projects, Testimonials)
php artisan migrate

# Mengisi data awal/seeder bawaan agar tampilan katalog & testimoni tidak kosong
php artisan db:seed
```

### 3. Struktur Tabel Database SQL
Sistem migrasi Laravel akan membuat tabel-tabel berikut:

#### Tabel `products` (Katalog Produk)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `VARCHAR` (Primary Key) | ID kustom unik (contoh: 'g1', 'v1') |
| `name` | `VARCHAR` | Nama produk gorden/interior |
| `category` | `VARCHAR` | Kategori (`gorden`, `vitrase`, `roller_blind`, `wallpaper`, `kitchen_set`) |
| `description` | `TEXT` | Deskripsi lengkap kelebihan produk |
| `image` | `VARCHAR` | URL atau path gambar produk |
| `price_per_meter` | `INTEGER` | Harga produk per meter atau unit |
| `features` | `JSON` | Daftar keunggulan produk |
| `specs` | `JSON` | Spesifikasi detail bahan dan ukuran |

#### Tabel `projects` (Portofolio Proyek)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `VARCHAR` (Primary Key) | ID unik portofolio |
| `title` | `VARCHAR` | Nama proyek pengerjaan |
| `category` | `VARCHAR` | Kategori lokasi (`villa`, `residensial`, `hotel`) |
| `location` | `VARCHAR` | Alamat lokasi (contoh: "Batu, Jawa Timur") |
| `image` | `VARCHAR` | Path atau URL dokumentasi hasil pasang |
| `year` | `VARCHAR` | Tahun pengerjaan |
| `description` | `TEXT` | Deskripsi teknis jenis gorden yang dipasang |

#### Tabel `testimonials` (Ulasan Pelanggan)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `VARCHAR` (Primary Key) | ID unik testimoni |
| `name` | `VARCHAR` | Nama pelanggan/instansi |
| `role` | `VARCHAR` | Pekerjaan atau tipe properti |
| `rating` | `INTEGER` | Skor rating bintang (1-5) |
| `comment` | `TEXT` | Ulasan pengalaman pemasangan |
| `date` | `VARCHAR` | Tanggal testimoni |
| `avatar` | `LONGTEXT` | Foto profil / avatar pelanggan (Base64 / URL) |
| `image` | `LONGTEXT` | Foto hasil gorden di rumah pelanggan (Base64 / URL) |

### 4. Menjalankan Server Pengembangan Laravel + Vite
Gunakan dua terminal terpisah untuk menjalankan server Laravel dan kompilasi aset real-time Vite:

**Terminal 1 (Laravel Server):**
```bash
php artisan serve
```

**Terminal 2 (Vite Compiler):**
```bash
npm run laravel-dev
```

### 5. Kompilasi Aset Produksi Laravel
Jika aplikasi sudah siap dipublikasikan ke hosting atau server VPS Anda:
```bash
npm run laravel-build
```
Aset terkompilasi akan otomatis disimpan di folder `public/build/` dan siap disajikan secara optimal oleh server produksi Laravel.

---

## 🎨 Konvensi Desain & Standar Kode
- **Visual Konsisten**: Menggunakan skema warna elegan (warm gray, charcoal, dan aksen keemasan/gold) untuk memberikan kesan mewah sesuai citra produk dekorasi rumah kelas atas.
- **Micro-interactions**: Setiap tombol, kartu katalog, dan tautan navigasi dilengkapi transisi animasi interaktif menggunakan pustaka `motion` untuk meningkatkan kenyamanan navigasi pengguna.
- **Type-Safety**: Seluruh komponen ditulis dengan TypeScript demi memastikan tidak ada data atau fungsi properti yang tidak sesuai format saat integrasi backend.
