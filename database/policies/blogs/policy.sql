-- ANYONE CAN READ BLOGS
CREATE POLICY "Anyone can read blogs"
  ON blogs
  FOR SELECT
  TO PUBLIC
  USING (true);

-- TEAM MEMBERS CAN CREATE BLOGS
CREATE POLICY "Admin and team can create blogs"
  ON blogs
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- TEAM MEMBERS CAN ONLY EDIT THEIR OWN BLOGS AND ADMIN CAN UPDATE THEIR BLOGS TOO
CREATE POLICY "Admin and team can update their own blogs"
  ON blogs
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'team')
    AND writer_id = auth.uid()
  );

-- TEAM MEMBERS CAN ONLY DELETE THEIR OWN BLOGS AND ADMIN CAN DELETE THEIR BLOGS TOO
CREATE POLICY "Admin and team can delete their own blogs"
  ON blogs
  FOR DELETE
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'team')
    AND writer_id = auth.uid()
  );
