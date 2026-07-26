-- =============================================================
-- TechXtrasol — Rename kinde_id to auth_id in admin_users
-- =============================================================

-- Add new column
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS auth_id text;

-- Copy data from kinde_id to auth_id (if any rows exist)
UPDATE admin_users SET auth_id = kinde_id WHERE auth_id IS NULL;

-- Drop old column
ALTER TABLE admin_users DROP COLUMN IF EXISTS kinde_id;

-- Add unique constraint
ALTER TABLE admin_users ADD CONSTRAINT admin_users_auth_id_unique UNIQUE (auth_id);

-- Drop old constraint if it exists
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_kinde_id_key;
