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

## 🎨 Konvensi Desain & Standar Kode
- **Visual Konsisten**: Menggunakan skema warna elegan (warm gray, charcoal, dan aksen keemasan/gold) untuk memberikan kesan mewah sesuai citra produk dekorasi rumah kelas atas.
- **Micro-interactions**: Setiap tombol, kartu katalog, dan tautan navigasi dilengkapi transisi animasi interaktif menggunakan pustaka `motion` untuk meningkatkan kenyamanan navigasi pengguna.
- **Type-Safety**: Seluruh komponen ditulis dengan TypeScript demi memastikan tidak ada data atau fungsi properti yang tidak sesuai format saat integrasi backend.
