-- =============================================================
-- TechXtrasol — Full Schema Migration
-- =============================================================

-- ----------------------------
-- Categories
-- ----------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
create policy "Public read categories" on categories for select using (true);
create policy "Admin all categories" on categories for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Technologies
-- ----------------------------
create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  category text not null default 'Other',
  color text,
  icon text,
  website_url text,
  created_at timestamptz not null default now()
);

alter table technologies enable row level security;
create policy "Public read technologies" on technologies for select using (true);
create policy "Admin all technologies" on technologies for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Industries
-- ----------------------------
create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

alter table industries enable row level security;
create policy "Public read industries" on industries for select using (true);
create policy "Admin all industries" on industries for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Projects
-- ----------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text,
  client_name text,
  client_industry text,
  project_url text,
  github_url text,
  featured_image text,
  gallery jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  challenge text,
  solution text,
  outcome text,
  duration text,
  completion_date date,
  featured boolean not null default false,
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;
create policy "Public read published projects" on projects for select using (published = true);
create policy "Admin all projects" on projects for all using (auth.role() = 'authenticated');

create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_projects_published on projects(published);
create index if not exists idx_projects_featured on projects(featured);

-- ----------------------------
-- Project Categories (many-to-many)
-- ----------------------------
create table if not exists project_categories (
  project_id uuid not null references projects(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (project_id, category_id)
);

alter table project_categories enable row level security;
create policy "Public read project_categories" on project_categories for select using (true);
create policy "Admin all project_categories" on project_categories for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Project Technologies (many-to-many)
-- ----------------------------
create table if not exists project_technologies (
  project_id uuid not null references projects(id) on delete cascade,
  technology_id uuid not null references technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

alter table project_technologies enable row level security;
create policy "Public read project_technologies" on project_technologies for select using (true);
create policy "Admin all project_technologies" on project_technologies for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Project Industries (many-to-many)
-- ----------------------------
create table if not exists project_industries (
  project_id uuid not null references projects(id) on delete cascade,
  industry_id uuid not null references industries(id) on delete cascade,
  primary key (project_id, industry_id)
);

alter table project_industries enable row level security;
create policy "Public read project_industries" on project_industries for select using (true);
create policy "Admin all project_industries" on project_industries for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Case Studies
-- ----------------------------
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  project_id uuid references projects(id) on delete set null,
  title text not null,
  introduction text,
  business_problem text,
  objectives jsonb not null default '[]'::jsonb,
  approach text,
  implementation text,
  results jsonb not null default '[]'::jsonb,
  lessons text,
  conclusion text,
  featured_image text,
  seo_title text,
  seo_description text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table case_studies enable row level security;
create policy "Public read published case_studies" on case_studies for select using (published = true);
create policy "Admin all case_studies" on case_studies for all using (auth.role() = 'authenticated');

create index if not exists idx_case_studies_slug on case_studies(slug);
create index if not exists idx_case_studies_published on case_studies(published);
create index if not exists idx_case_studies_project on case_studies(project_id);

-- ----------------------------
-- Admin users whitelist
-- ----------------------------
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  kinde_id text not null unique,
  email text not null,
  name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;
create policy "Admin read admin_users" on admin_users for select using (auth.role() = 'authenticated');
create policy "Admin all admin_users" on admin_users for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Testimonials (dynamic)
-- ----------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_title text,
  client_company text,
  client_logo text,
  client_avatar text,
  quote text not null,
  rating int default 5,
  project_id uuid references projects(id) on delete set null,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;
create policy "Public read published testimonials" on testimonials for select using (published = true);
create policy "Admin all testimonials" on testimonials for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Services (dynamic, for SEO landing pages)
-- ----------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  full_description text,
  icon text,
  features jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  process jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  featured_image text,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table services enable row level security;
create policy "Public read published services" on services for select using (published = true);
create policy "Admin all services" on services for all using (auth.role() = 'authenticated');

-- ----------------------------
-- Seed categories
-- ----------------------------
insert into categories (name, slug, icon) values
  ('ERP', 'erp', 'cube-outline'),
  ('CRM', 'crm', 'cube-outline'),
  ('HR', 'hr', 'cube-outline'),
  ('Mobile Apps', 'mobile-apps', 'cube-outline'),
  ('Websites', 'websites', 'cube-outline'),
  ('E-commerce', 'e-commerce', 'cube-outline'),
  ('AI', 'ai', 'cube-outline'),
  ('Fintech', 'fintech', 'cube-outline'),
  ('POS', 'pos', 'cube-outline'),
  ('Healthcare', 'healthcare', 'cube-outline'),
  ('Education', 'education', 'cube-outline'),
  ('Logistics', 'logistics', 'cube-outline')
on conflict (name) do nothing;

-- ----------------------------
-- Seed technologies
-- ----------------------------
insert into technologies (name, slug, category, color) values
  ('Laravel', 'laravel', 'Backend', '#FF2D20'),
  ('Nuxt', 'nuxt', 'Frontend', '#00DC82'),
  ('Vue.js', 'vuejs', 'Frontend', '#4FC08D'),
  ('React', 'react', 'Frontend', '#61DAFB'),
  ('Go', 'go', 'Backend', '#00ADD8'),
  ('Node.js', 'nodejs', 'Backend', '#339933'),
  ('Flutter', 'flutter', 'Mobile', '#02569B'),
  ('Docker', 'docker', 'DevOps', '#2496ED'),
  ('AWS', 'aws', 'Cloud', '#FF9900'),
  ('DigitalOcean', 'digitalocean', 'Cloud', '#0080FF'),
  ('Cloudflare', 'cloudflare', 'Cloud', '#F38020'),
  ('Redis', 'redis', 'Database', '#DC382D'),
  ('PostgreSQL', 'postgresql', 'Database', '#4169E1'),
  ('MySQL', 'mysql', 'Database', '#4479A1'),
  ('Supabase', 'supabase', 'Backend', '#3ECF8E'),
  ('Figma', 'figma', 'Design', '#F24E1E'),
  ('GitHub', 'github', 'Tools', '#6e40c9'),
  ('Linux', 'linux', 'DevOps', '#FCC624')
on conflict (name) do nothing;

-- ----------------------------
-- Seed industries
-- ----------------------------
insert into industries (name, slug, icon) values
  ('Healthcare', 'healthcare', 'healthcare'),
  ('Education', 'education', 'education'),
  ('Finance', 'finance', 'finance'),
  ('Hospitality', 'hospitality', 'hospitality'),
  ('Retail', 'retail', 'retail'),
  ('Manufacturing', 'manufacturing', 'manufacturing'),
  ('Agriculture', 'agriculture', 'agriculture'),
  ('Government', 'government', 'government'),
  ('NGO', 'ngo', 'ngo'),
  ('Logistics', 'logistics', 'logistics'),
  ('Real Estate', 'real-estate', 'realestate'),
  ('Startups', 'startups', 'startups')
on conflict (name) do nothing;

-- ----------------------------
-- Seed services
-- ----------------------------
insert into services (slug, title, short_description, features, sort_order, published) values
  ('custom-software-development', 'Custom Software Development', 'Scalable software engineered for your unique business processes.', '["ERP Systems","CRM Platforms","HR Systems","POS Systems","School Management","Healthcare Systems"]'::jsonb, 1, true),
  ('web-development', 'Web Development', 'Modern, responsive web applications built for performance and conversion.', '["Corporate Websites","Customer Portals","Admin Dashboards","PWAs","Headless CMS","Landing Pages"]'::jsonb, 2, true),
  ('mobile-development', 'Mobile App Development', 'Native and cross-platform mobile applications that deliver premium experiences.', '["iOS & Android","Flutter","Cross-Platform","Business Apps","Customer Apps"]'::jsonb, 3, true),
  ('erp-development', 'ERP Development', 'End-to-end enterprise resource planning systems built for your operations.', '["Inventory","Finance","Procurement","HR","Reporting"]'::jsonb, 4, true),
  ('crm-development', 'CRM Development', 'Customer relationship management platforms that drive sales and retention.', '["Lead Management","Pipeline Tracking","Automation","Analytics","Integrations"]'::jsonb, 5, true),
  ('cloud-solutions', 'Cloud Solutions', 'Cloud infrastructure engineered for performance, security, and reliability.', '["AWS & Azure","Docker","CI/CD","Linux Servers","Monitoring"]'::jsonb, 6, true),
  ('ai-solutions', 'AI Solutions', 'Intelligent systems that transform how businesses operate.', '["AI Chatbots","Document Intelligence","RAG Applications","LLM Integrations"]'::jsonb, 7, true),
  ('ui-ux', 'UI/UX Design', 'Research-driven design that converts and delights.', '["Wireframes & Prototypes","Design Systems","Figma","Accessibility","User Research"]'::jsonb, 8, true),
  ('api-development', 'API Development', 'Robust APIs that connect your systems and enable integrations.', '["REST & GraphQL","Payment Gateways","SMS Integration","SSO/OAuth","JWT"]'::jsonb, 9, true),
  ('ecommerce', 'E-Commerce', 'Full-featured online stores built for conversion and scale.', '["Product Catalog","Payments","Inventory","Shipping","Analytics"]'::jsonb, 10, true)
on conflict (slug) do nothing;

-- ----------------------------
-- Updated at trigger
-- ----------------------------
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_projects_updated_at before update on projects
  for each row execute function update_updated_at_column();

create trigger update_services_updated_at before update on services
  for each row execute function update_updated_at_column();
