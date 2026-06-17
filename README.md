# 🏃 Marathon Skills 2026

Next.js + Supabase + Google Auth + Vercel

---

## Стек

- **Next.js 14** (App Router)
- **Supabase** — база данных (PostgreSQL) + Google Auth
- **Vercel** — деплой
- **TypeScript** + CSS Modules

---

## Быстрый старт

### 1. Supabase — создай проект

1. Зайди на [supabase.com](https://supabase.com) и создай новый проект
2. В **SQL Editor** выполни файл `supabase/schema.sql`
3. Скопируй из **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Google OAuth в Supabase

1. Открой [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Authorized redirect URIs добавь:
   ```
   https://<your-project>.supabase.co/auth/v1/callback
   ```
5. Скопируй **Client ID** и **Client Secret**
6. В Supabase: **Authentication → Providers → Google**
   - Включи Google
   - Вставь Client ID и Client Secret
   - Сохрани

### 3. Локальный запуск

```bash
# Клонируй / распакуй проект
npm install

# Создай .env.local (скопируй из .env.local.example)
cp .env.local.example .env.local
# Заполни значения из Supabase Dashboard

npm run dev
# Открой http://localhost:3000
```

### 4. Деплой на Vercel

```bash
# Способ 1 — через CLI
npm i -g vercel
vercel

# Способ 2 — через GitHub
# Загрузи проект в репозиторий → подключи на vercel.com
```

**Переменные окружения на Vercel** (Settings → Environment Variables):
```
NEXT_PUBLIC_SUPABASE_URL       = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY  = eyJ...
```

После деплоя добавь URL Vercel в Google Cloud Console:
```
https://your-app.vercel.app/auth/callback
```

---

## Структура проекта

```
marathon-skills/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Глобальные стили
│   ├── page.tsx            # Главная (лендинг)
│   ├── dashboard/
│   │   └── page.tsx        # Кабинет участника
│   └── auth/
│       ├── callback/
│       │   └── route.ts    # OAuth callback
│       └── error/
│           └── page.tsx    # Ошибка авторизации
├── components/
│   ├── HomeClient.tsx      # Лендинг (клиентский)
│   ├── HomeClient.module.css
│   ├── DashboardClient.tsx # Кабинет (клиентский)
│   └── DashboardClient.module.css
├── lib/
│   └── supabase/
│       ├── client.ts       # Клиент для браузера
│       └── server.ts       # Клиент для сервера
├── supabase/
│   └── schema.sql          # SQL схема БД
├── middleware.ts            # Защита роутов
├── .env.local.example
├── vercel.json
└── package.json
```

---

## Добавить поля в БД

Открой **Supabase → SQL Editor** и выполни:

```sql
-- Например, добавить футболку и категорию
alter table public.participants
  add column if not exists tshirt_size text check (tshirt_size in ('XS','S','M','L','XL','XXL')),
  add column if not exists category text default 'open';
```

Затем добавь поле в форму в `components/DashboardClient.tsx`.

---

## Telegram Bot

Бот уже подключён в UI: [@MarathonSkills2026_AssistantBot](https://t.me/MarathonSkills2026_AssistantBot)
