-- Marathon Skills 2026 — Supabase Schema
-- Выполни этот SQL в Supabase Dashboard → SQL Editor

-- Таблица участников
create table if not exists public.participants (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  full_name   text not null,
  phone       text,
  city        text,
  bib_number  int unique,  -- Номер нагрудника (заполняет организатор)
  created_at  timestamptz default now(),
  constraint one_registration_per_user unique (user_id)
);

-- Индексы
create index if not exists participants_user_id_idx on public.participants(user_id);

-- Row Level Security
alter table public.participants enable row level security;

-- Политики RLS
-- Любой авторизованный пользователь может просматривать всех участников
create policy "Все участники видят список"
  on public.participants for select
  to authenticated
  using (true);

-- Пользователь может добавить только свою запись
create policy "Пользователь регистрирует себя"
  on public.participants for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Пользователь может удалить только свою запись
create policy "Пользователь отменяет свою регистрацию"
  on public.participants for delete
  to authenticated
  using (auth.uid() = user_id);

-- Организатор может обновлять (например, задавать bib_number)
-- Для этого нужно создать отдельную роль или использовать service role key
-- Пока разрешаем пользователю обновлять свою запись
create policy "Пользователь обновляет свою запись"
  on public.participants for update
  to authenticated
  using (auth.uid() = user_id);
