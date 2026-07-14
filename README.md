# Frontend Assessment Test (ReactJS)

Proyek ini adalah mini-aplikasi direktori produk yang dibangun menggunakan ReactJS (Vite), Redux Toolkit, dan React Router. Proyek ini sudah dilengkapi dengan sistem autentikasi (Protected Routes), manajemen state global untuk CRUD produk (Local State Mutation), serta integrasi CI/CD menggunakan GitHub Actions.

## Tech Stack
- **Library Utama:** ReactJS (Vite)
- **State Management:** Redux Toolkit (@reduxjs/toolkit & react-redux)
- **Routing:** React Router DOM (v7)
- **API Target:** [DummyJSON API](https://dummyjson.com)
- **CI/CD:** GitHub Actions

## Kredensial Uji Coba (Login)
Untuk masuk ke halaman beranda, silakan gunakan akun berikut:
- **Username:** `emilys`
- **Password:** `emilyspass`

## Panduan Penggunaan (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone <url-repository-github-anda>
cd <nama-folder-project>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Mode Development
```bash
npm run dev
```
Setelah berjalan, buka tautan lokal yang tertera pada terminal (biasanya `http://localhost:5173`).

### 4. Build untuk Production
```bash
npm run build
```
Perintah ini akan memvalidasi tipe kode dan menghasilkan folder `dist` yang siap untuk dideploy ke platform hosting seperti Vercel atau Netlify.