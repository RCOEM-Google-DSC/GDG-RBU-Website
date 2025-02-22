-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blogs', 'blogs', true);

-- Ensure the bucket is public
UPDATE storage.buckets
SET public = true
WHERE id = 'blogs';

-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true);

-- Ensure the bucket is public
UPDATE storage.buckets
SET public = true
WHERE id = 'profile';

-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true);

-- Ensure the bucket is public
UPDATE storage.buckets
SET public = true
WHERE id = 'events';