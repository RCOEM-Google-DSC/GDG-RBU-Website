-- CREATE ENUM FOR MEMBERS DOMIAN
CREATE TYPE domain_type AS ENUM (
  'Web Dev',
  'Video Editing',
  'Socials',
  'App Dev',
  'Cloud & AI',
  'Graphics',
  'Marketing',
  'Management'
);

-- CREATE MEMBERS TABLE
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain domain_type NOT NULL, 
  role text NOT NULL,
  name text NOT NULL,
  description text,
  thought text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  profile_links text[],
  created_at timestamptz DEFAULT now()
);