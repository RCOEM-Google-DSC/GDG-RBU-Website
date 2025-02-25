-- ALLOW THIS POLICY SO THAT THE ISER CAN SEE PROFILE PIC OF ADMIN & TEAM
ALTER POLICY "Enable read access for all users"
ON "public"."users"
TO public
USING (
  true
);

-- ADMIN & TEAM MEMBERS CAN UPDATE THEIR OWN PROFILE PIC
CREATE POLICY "Admin and team can update user data"
  ON users
  FOR UPDATE
  USING (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'team')
    ));

-- ADMIN & TEAM MEMBERS CAN DELETE USER PROFILE 
CREATE POLICY "Admin and team can delete user data"
  ON users
  FOR DELETE
  USING (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'team')
    ));

-- USERS CAN UPDATE THEIR OWN NAME AND IMAGE
CREATE POLICY "Allow users to update their name and image"
ON users
FOR UPDATE
USING (auth.role() = 'user')
WITH CHECK (auth.uid() = id);