-- CREATE ENUM FOR USER ROLES
CREATE TYPE user_role AS ENUM ('admin', 'team', 'user');

-- CREATE USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  image text DEFAULT 'user.png',
  created_at timestamptz DEFAULT now()
);