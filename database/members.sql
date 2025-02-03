-- Create the domain ENUM
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

-- Create members table
-- Update the members table to use the domain ENUM
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain domain_type NOT NULL, -- Use the ENUM here
  role text NOT NULL,
  name text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  profile_links text[],
  created_at timestamptz DEFAULT now()
);

-- Create an index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);


-- Create a function to validate user_id
CREATE OR REPLACE FUNCTION validate_member_user_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user_id is valid (references a user with role 'team' or 'admin')
  IF NEW.user_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM users
    WHERE id = NEW.user_id AND role IN ('team', 'admin')
  ) THEN
    RAISE EXCEPTION 'user_id must reference a user with role "team" or "admin"';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create a trigger to validate user_id on insert or update
CREATE TRIGGER validate_member_user_id_trigger
BEFORE INSERT OR UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION validate_member_user_id();

-- Enable Row Level Security for the members table
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read members
CREATE POLICY "Anyone can read members"
ON members
FOR SELECT
TO PUBLIC
USING (true);

-- Policy: Only admins can insert members
CREATE POLICY "Only admins can insert members"
ON members
FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policy: Only admins can update members
CREATE POLICY "Only admins can update members"
ON members
FOR UPDATE
USING (auth.jwt() ->> 'role' = 'admin');

-- Policy: Only admins can delete members
CREATE POLICY "Only admins can delete members"
ON members
FOR DELETE
USING (auth.jwt() ->> 'role' = 'admin');