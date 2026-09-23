# NyVer ERP — Serverga Yuklash va Docker / CI-CD Qo'llanmasi

## 1. Server Parametrlari
- **IP Manzil:** `170.168.6.161`
- **Foydalanuvchi:** `root` (yoki `vps05699`)
- **Parol:** `7crKbm@hfxjgOTae`
- **PostgreSQL Porti:** `1402`
- **PostgreSQL Paroli:** `1402`
- **PostgreSQL Foydalanuvchi:** `postgres`
- **Ma'lumotlar bazasi (DB):** `nyver_lms`

---

## 2. Savolga Javob: Serverga kirib nimadir ochish kerakmi?
**YO'Q, serverga kirib ma'lumotlar bazasi (PostgreSQL) yoki Node.js o'rnatishingiz shart emas!**
Docker va Docker Compose barcha xizmatlarni o'zi avtomatik izolyatsiyalangan konteynerlarda ishga tushiradi:
- `nyver_postgres` — PostgreSQL 16 bazasi avtomatik yaratiladi, tashqi 1402-portga ulanadi va ma'lumotlar xavfsiz `postgres_data` jildida saqlanadi.
- `nyver_server` — NestJS backend API (Port 3000) bazani avtomatik `prisma db push` qilib jadvallarni yaratadi.
- `nyver_ui` — Vue 3 Frontend Nginx orqali 80-portda (veb) ishlaydi va `/api/` so'rovlarini to'g'ridan-to'g'ri backendga yo'naltiradi.

---

## 3. GitHub Actions orqali Avtomatik Deploy (CI/CD)

Har safar `git push origin main` qilganingizda kod avtomatik serverga yuklanadi va docker yangilanadi.

### GitHub Repository Secrets sozlash:
1. GitHub da loyihangiz sahifasiga kiring -> **Settings** -> **Secrets and variables** -> **Actions**.
2. **New repository secret** tugmasini bosib quyidagilarni qo'shing:
   - `VPS_HOST` = `170.168.6.161`
   - `VPS_USER` = `root`
   - `VPS_PASSWORD` = `7crKbm@hfxjgOTae`

Endi istalgan yangi o'zgarish `main` branchga push qilinishi bilan serverdagi containerlar avtomatik yangilanadi.

---

## 4. Serverdagi Asosiy Buyruqlar (Qo'lda boshqarish uchun)

Agar serverga SSH orqali kirsangiz (`ssh root@170.168.6.161`):

```bash
# Loyiha papkasiga o'tish
cd /var/www/nyver_erp

# Holatni ko'rish (barcha containerlar ishlab turganini tekshirish)
docker compose ps

# Loglarni jonli kuzatish
docker compose logs -f

# Qayta build qilish va yangilash
docker compose up -d --build

# To'xtatish
docker compose down
```

---

## 5. DBeaver / pgAdmin orqali PostgreSQL ga ulanish
- **Host:** `170.168.6.161`
- **Port:** `1402`
- **Database:** `nyver_lms`
- **Username:** `postgres`
- **Password:** `1402`
