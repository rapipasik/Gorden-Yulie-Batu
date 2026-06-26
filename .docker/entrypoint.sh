#!/bin/bash
set -e

# 1. Pastikan file .env ada
if [ ! -f /var/www/html/.env ]; then
    echo "Membuat file .env dari .env.example..."
    cp /var/www/html/.env.example /var/www/html/.env
fi

# 2. Tunggu koneksi database MySQL terhubung
if [ -n "$DB_HOST" ]; then
    echo "Menunggu koneksi database ke $DB_HOST:${DB_PORT:-3306}..."
    until mysqladmin ping -h"$DB_HOST" -P"${DB_PORT:-3306}" --silent; do
        sleep 2
    done
    echo "Koneksi database berhasil terhubung!"
fi

# 3. Generate APP_KEY jika kosong
if ! grep -q "^APP_KEY=base64:" /var/www/html/.env; then
    echo "Menghasilkan Application Key (APP_KEY)..."
    php artisan key:generate --no-interaction --force
fi

# 4. Jalankan migrasi database
echo "Menjalankan migrasi database..."
php artisan migrate --force

# 5. Jalankan seeder database (mengisi default admin & testimoni bawaan)
echo "Menjalankan seeders database..."
php artisan db:seed --force

# 6. Optimasi Laravel untuk performa produksi
echo "Mengoptimalkan cache konfigurasi Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. Jalankan supervisord (Nginx + PHP-FPM) sebagai proses utama container
echo "Menjalankan Nginx & PHP-FPM melalui Supervisord..."
exec /usr/bin/supervisord -c /etc/supervisord.conf
