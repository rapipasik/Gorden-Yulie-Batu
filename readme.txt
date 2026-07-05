============================================================
       GORDEN YULIE BATU - WEBSITE & SISTEM MANAJEMEN
============================================================

Aplikasi Sistem Informasi & Manajemen Katalog Interaktif untuk 
Gorden Yulie Batu (Penyedia Gorden & Interior Premium).

------------------------------------------------------------
🌐 TAUTAN RESMI & DEPLOYMENT
------------------------------------------------------------
- Domain Website : https://gordenyuliebatu.com
- Desain Figma   : https://www.figma.com/design/5JHNM4ht7rJiq6vugcwNsA/Sistem-Informasi---Gorden-Yulie-Batu?node-id=0-1&t=xxQmFCCwQILbT3Ld-1
- Hosting        : VPS (Virtual Private Server) - Self-Managed

------------------------------------------------------------
🚀 CARA MENJALANKAN DENGAN DOCKER (PRODUKSI)
------------------------------------------------------------
Jika Anda ingin menjalankan aplikasi ini dalam kontainer Docker:

1. Pastikan Anda memiliki Docker dan Docker Compose terpasang di VPS/Komputer Anda.
2. Buat file .env berdasarkan .env.example.
3. Jalankan perintah untuk build dan menjalankan kontainer:
   docker compose up -d --build

Catatan tentang Error "docker compose push":
Jika Anda mendapatkan error "push access denied..." saat menjalankan `docker compose push`, 
itu karena image name didefinisikan secara lokal di file docker-compose.yml (seperti `image: gorden-yulie-batu`).
Untuk mengunggah image ke Docker Hub/Registry Anda sendiri:
1. Ganti nama image di docker-compose.yml menjadi format: <username_docker_hub>/<nama_repo>:<tag>
   Contoh:
   - Dari: image: gorden-yulie-batu
   - Menjadi: image: rapipasik/gorden-yulie-batu:latest
2. Login terlebih dahulu di terminal Anda dengan perintah:
   docker login
3. Jalankan kembali perintah push:
   docker compose push

------------------------------------------------------------
🛠️ PERINTAH LOKAL (NON-DOCKER)
------------------------------------------------------------
- Instalasi Dependensi:
  npm install

- Menjalankan Mode Pengembangan (Vite):
  npm run dev

- Membangun Aset untuk Produksi (Express/React):
  npm run build
  npm start

- Integrasi Laravel PHP (Jika digunakan):
  php artisan migrate
  php artisan db:seed
  npm run laravel-build
