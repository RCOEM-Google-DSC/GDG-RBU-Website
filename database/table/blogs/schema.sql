-- CREATE BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  image_url text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);