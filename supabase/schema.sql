-- Thread Core Studios: database schema
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- It is safe to re-run.
--
-- Access model
--   * services / portfolio_projects: public read-only (for the future, when the
--     site reads them from the database instead of lib/services.ts).
--   * enquiries / contact_messages: NO public access at all. Row Level Security is
--     on and there are no policies, so only the server (service-role key, used by
--     /api/quote and /api/contact) can read or write them.
--   * enquiry-artwork storage bucket: private, same rule.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text not null default '',
  category      text not null,
  image_url     text,
  status        text not null default 'active'
                  check (status in ('active', 'coming_soon', 'inactive')),
  featured      boolean not null default false,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text not null default '',
  category    text not null,
  image_url   text,
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.enquiries (
  id                   uuid primary key default gen_random_uuid(),
  full_name            text not null check (char_length(full_name) between 2 and 100),
  phone                text not null check (char_length(phone) between 7 and 30),
  email                text check (email is null or char_length(email) <= 254),
  customer_type        text not null check (customer_type in ('individual', 'business')),
  service_category     text not null,
  product              text not null check (char_length(product) <= 120),
  quantity             integer not null check (quantity between 1 and 1000000),
  customisation_method text not null,
  description          text not null check (char_length(description) between 10 and 4000),
  delivery_date        date not null,
  artwork_url          text,  -- storage path inside the enquiry-artwork bucket
  status               text not null default 'new'
                         check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'closed')),
  created_at           timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null check (char_length(full_name) between 2 and 100),
  email      text not null check (char_length(email) <= 254),
  phone      text,
  message    text not null check (char_length(message) between 10 and 4000),
  status     text not null default 'new'
               check (status in ('new', 'replied', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists services_category_idx on public.services (category, display_order);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.services           enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.enquiries          enable row level security;
alter table public.contact_messages   enable row level security;

drop policy if exists "Public can read visible services" on public.services;
create policy "Public can read visible services"
  on public.services for select
  to anon, authenticated
  using (status <> 'inactive');

drop policy if exists "Public can read portfolio projects" on public.portfolio_projects;
create policy "Public can read portfolio projects"
  on public.portfolio_projects for select
  to anon, authenticated
  using (true);

-- Enquiries and messages: deliberately NO policies (service role only).
-- Belt and braces: also remove the default table privileges from public roles.
revoke all on public.enquiries        from anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: private bucket for customer artwork uploads
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'enquiry-artwork',
  'enquiry-artwork',
  false,
  4194304, -- 4 MB, matches the website's upload limit
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
-- No storage.objects policies are created: only the service role can read/write.
