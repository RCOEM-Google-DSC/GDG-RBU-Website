/*
  # Initial Database Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - name (text, not null)
      - email (text, unique, not null)
      - role (text, not null)
      - image (text, default: 'user.png')
      - created_at (timestamptz, default: now())
    
    - blogs
      - id (uuid, primary key)
      - writer_id (uuid, foreign key to users.id)
      - image_url (text)
      - content (text, not null)
      - created_at (timestamptz, default: now())
    
    - events
      - id (uuid, primary key)
      - name (text, not null)
      - post_image (text)
      - description (text)
      - event_time (timestamptz, not null)
      - location (text)
      - created_at (timestamptz, default: now())
    
    - registrations (many-to-many relationship table)
      - id (uuid, primary key)
      - event_id (uuid, foreign key to events.id)
      - user_id (uuid, foreign key to users.id)
      - created_at (timestamptz, default: now())
      - Unique constraint on (event_id, user_id)

  2. Security Policies
    - Users table:
      - Users can read their own data
      - Admin/team can update/delete user data
    - Blogs table:
      - Anyone can read blogs
      - Admin/team can create/update/delete blogs
    - Events table:
      - Anyone can read events
      - Admin/team can create/update/delete events
    - Registrations table:
      - Users can read their own registrations
      - Users can register for events
      - Admin can read all registrations
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'team', 'user');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  image text DEFAULT 'user.png',
  created_at timestamptz DEFAULT now()
);

-- CREATE A FUNCTION TO HANDLE NEW USERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'user'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREATE A TRIGGER
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();


-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  image_url text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  post_image text,
  description text,
  event_time timestamptz NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

-- Create registrations table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blogs_writer_id ON blogs(writer_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Users table policies 
--  Allow so that they can see other user profile pic
ALTER POLICY "Enable read access for all users"
ON "public"."users"
TO public
USING (
  true
);

CREATE POLICY "Admin and team can update user data"
  ON users
  FOR UPDATE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

CREATE POLICY "Admin and team can delete user data"
  ON users
  FOR DELETE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- Blogs table policies
CREATE POLICY "Anyone can read blogs"
  ON blogs
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admin and team can create blogs"
  ON blogs
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'team'));

CREATE POLICY "Admin and team can update their own blogs"
  ON blogs
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'team')
    AND writer_id = auth.uid()
  );

CREATE POLICY "Admin and team can delete their own blogs"
  ON blogs
  FOR DELETE
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'team')
    AND writer_id = auth.uid()
  );

-- Events table policies
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admin and team can create events"
  ON events
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'team'));

CREATE POLICY "Admin and team can update events"
  ON events
  FOR UPDATE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

CREATE POLICY "Admin and team can delete events"
  ON events
  FOR DELETE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- Registrations table policies
CREATE POLICY "Users can read their own registrations"
  ON registrations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can read all registrations"
  ON registrations
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Enable read access for all users"
ON "public"."registrations"
AS PERMISSIVE
FOR SELECT
TO public
USING (
  true
);