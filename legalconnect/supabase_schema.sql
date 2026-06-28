-- ============================================================
-- LegalConnect — Supabase SQL Schema
-- Run this entire file in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. PROFILES ─────────────────────────────────────────────
-- Extends Supabase auth.users with app-specific data
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  email       text not null,
  role        text not null check (role in ('customer', 'lawyer')),
  avatar_url  text,
  created_at  timestamptz default now()
);

-- ── 2. LAWYER_PROFILES ──────────────────────────────────────
-- Extra details only lawyers have
create table if not exists public.lawyer_profiles (
  id            uuid primary key references public.profiles(id) on delete cascade,
  specialization text not null,
  experience     integer default 0,
  hourly_rate    numeric(10,2) default 0,
  location       text,
  bar_number     text,
  bio            text,
  available      boolean default true,
  rating         numeric(3,2) default 0,
  review_count   integer default 0
);

-- ── 3. CONVERSATIONS ────────────────────────────────────────
-- One row per unique customer↔lawyer pair
create table if not exists public.conversations (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.profiles(id) on delete cascade,
  lawyer_id     uuid not null references public.profiles(id) on delete cascade,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(customer_id, lawyer_id)
);

-- ── 4. MESSAGES ─────────────────────────────────────────────
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id       uuid not null references public.profiles(id) on delete cascade,
  content         text not null,
  read            boolean default false,
  created_at      timestamptz default now()
);

-- ── 5. REVIEWS ──────────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  lawyer_id   uuid not null references public.profiles(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  rating      integer not null check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now(),
  unique(lawyer_id, customer_id)
);

-- ── 6. INDEXES ──────────────────────────────────────────────
create index if not exists idx_messages_conversation on public.messages(conversation_id);
create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_conversations_customer on public.conversations(customer_id);
create index if not exists idx_conversations_lawyer on public.conversations(lawyer_id);
create index if not exists idx_lawyer_profiles_specialization on public.lawyer_profiles(specialization);
create index if not exists idx_lawyer_profiles_available on public.lawyer_profiles(available);

-- ── 7. AUTO-UPDATE updated_at ───────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_conversations_updated_at
  before update on public.conversations
  for each row execute function public.handle_updated_at();

-- ── 8. AUTO-UPDATE lawyer rating when review added ──────────
create or replace function public.update_lawyer_rating()
returns trigger language plpgsql as $$
begin
  update public.lawyer_profiles
  set
    rating = (select round(avg(rating)::numeric, 2) from public.reviews where lawyer_id = new.lawyer_id),
    review_count = (select count(*) from public.reviews where lawyer_id = new.lawyer_id)
  where id = new.lawyer_id;
  return new;
end;
$$;

create trigger on_review_inserted
  after insert or update on public.reviews
  for each row execute function public.update_lawyer_rating();

-- ── 9. AUTO-CREATE profile on signup ────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 10. ROW LEVEL SECURITY ──────────────────────────────────
alter table public.profiles enable row level security;
alter table public.lawyer_profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Lawyer profiles: anyone can read, only the lawyer can update theirs
create policy "lawyer_profiles_select" on public.lawyer_profiles for select using (true);
create policy "lawyer_profiles_insert" on public.lawyer_profiles for insert with check (auth.uid() = id);
create policy "lawyer_profiles_update" on public.lawyer_profiles for update using (auth.uid() = id);

-- Conversations: only participants can see theirs
create policy "conversations_select" on public.conversations
  for select using (auth.uid() = customer_id or auth.uid() = lawyer_id);
create policy "conversations_insert" on public.conversations
  for insert with check (auth.uid() = customer_id or auth.uid() = lawyer_id);

-- Messages: only conversation participants can read/write
create policy "messages_select" on public.messages
  for select using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.customer_id = auth.uid() or c.lawyer_id = auth.uid())
    )
  );
create policy "messages_insert" on public.messages
  for insert with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.customer_id = auth.uid() or c.lawyer_id = auth.uid())
    )
  );
create policy "messages_update" on public.messages
  for update using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.customer_id = auth.uid() or c.lawyer_id = auth.uid())
    )
  );

-- Reviews: anyone can read, only customers can write (once per lawyer)
create policy "reviews_select" on public.reviews for select using (true);
create policy "reviews_insert" on public.reviews
  for insert with check (auth.uid() = customer_id);

-- ── 11. REALTIME ────────────────────────────────────────────
-- Enable realtime for messages and conversations
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.lawyer_profiles;

-- ── 12. SEED DATA ───────────────────────────────────────────
-- NOTE: Seed lawyers are created via the app's auth system.
-- After running this schema, use the app to register lawyer accounts,
-- OR manually insert via the Supabase dashboard > Table Editor.
-- ============================================================
