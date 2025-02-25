-- ENABLE ROW LEVEL SECURITY (RLS) FOR THE STORAGE.OBJECTS TABLE
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR THE 'EVENTS' BUCKET

-- PUBLIC READ ACCESS FOR EVENTS
CREATE POLICY "Public read access for events"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'events');

-- ADMINS AND TEAM MEMBERS CAN UPLOAD TO EVENTS
CREATE POLICY "Admins and team can upload to events"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'events'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ADMINS AND TEAM MEMBERS CAN UPDATE EVENTS
CREATE POLICY "Admins and team can update events"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'events'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ONLY ADMINS AND TEAM MEMBERS CAN DELETE FROM EVENTS
CREATE POLICY "Only admins and team can delete from events"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'events'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- POLICIES FOR THE 'BLOGS' BUCKET

-- PUBLIC READ ACCESS FOR BLOGS
CREATE POLICY "Public read access for blogs"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blogs');

-- ADMINS AND TEAM MEMBERS CAN UPLOAD TO BLOGS
CREATE POLICY "Admins and team can upload to blogs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'blogs'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ADMINS AND TEAM MEMBERS CAN UPDATE BLOGS
CREATE POLICY "Admins and team can update blogs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'blogs'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ONLY ADMINS  AND TEAM MEMBERS CAN DELETE FROM BLOGS
CREATE POLICY "Admins and team can delete from blogs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'blogs'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- POLICIES FOR THE 'BLOGS' BUCKET

-- PUBLIC READ ACCESS FOR PROFILE IMAGES
CREATE POLICY "Public read access for profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile');

-- ADMINS AND TEAM MEMBERS CAN UPLOAD TO PROFILE
CREATE POLICY "Admins and team can upload to profile"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profile'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ADMINS AND TEAM MEMBERS CAN UPDATE PROFILE IMAGES
CREATE POLICY "Admins and team can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'profile'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);

-- ONLY ADMINS AND TEAM MEMBERS CAN DELETE FROM PROFILE
CREATE POLICY "Only admins and team can delete from profile"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'profile'
    AND EXISTS (
        SELECT 1
        FROM users
        WHERE id = auth.uid()
        AND role IN ('admin', 'team')
    )
);