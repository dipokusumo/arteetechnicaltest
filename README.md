## Cara Install dan Setup

### 1. Clone Repository dan Install Dependencies

1. Clone repository ini:

 ```bash
 git clone <url-repo-ini>
 ```

2. Buka 2 terminal untuk menginstall dependencies dan nantinya menjalankan server.

- Untuk frontend tetap di folder utama

- Untuk backend pindah ke folder backend:

 ```bash
 cd backend
 ```

3. Install dependencies yang dibutuhkan di kedua terminal:
   
 ```bash
 npm install
 ```

### 2. Setup Environment Variables

Buat file .env di folder backend, lalu salin isi dari file .env.example yang ada di folder backend.

Backend (.env):
  
 ```env
 DB_HOST=
 DB_USER=
 DB_PASSWORD=
 DB_NAME=
 PORT=
 JWT_SECRET=
 ```

### 3. Setup MySQl (di terminal backend)

```bash
npm run db
```

Script ini akan menghasilkan:
- 1 akun dan 2 task di akun tersebut

### 4. Menjalankan Aplikasi di terminal masing-masing (Frontend dan Backend)

- Frontend:
 ```bash
 npm run dev
 ```

- Backend (menggunakan nodemon):
 ```bash
 npm run dev
 ```

### Notes: pastikan untuk setup instalasi di kedua terminal frontend & backend sebelum menjalankan aplikasi