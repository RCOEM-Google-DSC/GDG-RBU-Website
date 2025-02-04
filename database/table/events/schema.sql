-- CREATE EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  post_image text,
  description text,
  event_time timestamptz NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);