-- =============================================================
-- TechXtrasol — Add missing dynamic tables (gallery, ui_templates, contact_submissions)
-- =============================================================

-- ----------------------------
-- Gallery (design showcase)
-- ----------------------------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text not null default 'design',
  project_name text,
  client_name text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table gallery enable row level security;
create policy "Public read published gallery" on gallery for select using (published = true);
create policy "Admin all gallery" on gallery for all using (auth.role() = 'authenticated');

create index if not exists idx_gallery_published on gallery(published);
create index if not exists idx_gallery_category on gallery(category);

-- ----------------------------
-- UI Templates
-- ----------------------------
create table if not exists ui_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  price text,
  price_amount numeric,
  demo_url text,
  preview_image text,
  category text not null default 'landing-page',
  features jsonb not null default '[]'::jsonb,
  tech_stack jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table ui_templates enable row level security;
create policy "Public read published ui_templates" on ui_templates for select using (published = true);
create policy "Admin all ui_templates" on ui_templates for all using (auth.role() = 'authenticated');

create index if not exists idx_ui_templates_slug on ui_templates(slug);
create index if not exists idx_ui_templates_category on ui_templates(category);
create index if not exists idx_ui_templates_published on ui_templates(published);
create index if not exists idx_ui_templates_featured on ui_templates(featured);

-- ----------------------------
-- Contact submissions (consultation form)
-- ----------------------------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;
-- No public read policy: submissions are private (inserted server-side via service key)
create policy "Admin all contact_submissions" on contact_submissions for all using (auth.role() = 'authenticated');

create index if not exists idx_contact_submissions_created on contact_submissions(created_at desc);
create index if not exists idx_contact_submissions_status on contact_submissions(status);

-- ----------------------------
-- Updated at trigger for ui_templates
-- ----------------------------
create trigger update_ui_templates_updated_at before update on ui_templates
  for each row execute function update_updated_at_column();

-- NOTE: Row-level security still relies on auth.role() = 'authenticated' for write access,
-- matching the existing schema. For defense-in-depth, consider restricting these (and the
-- existing tables) to users listed in admin_users, e.g.:
--   create policy "Admin only" on <table> for all using (
--     exists (select 1 from admin_users where auth_id = auth.uid()::text)
--   ) with check (
--     exists (select 1 from admin_users where auth_id = auth.uid()::text)
--   );