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
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- ADMIN & TEAM MEMBERS CAN DELETE USER PROFILE 
CREATE POLICY "Admin and team can delete user data"
  ON users
  FOR DELETE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));