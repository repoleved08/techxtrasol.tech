-- =============================================================
-- TechXtrasol — Add author to blog_posts
-- =============================================================

-- Add author column with default
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author text NOT NULL DEFAULT 'Norman Bii';

-- Backfill existing rows
UPDATE blog_posts SET author = 'Norman Bii' WHERE author IS NULL OR author = '';
