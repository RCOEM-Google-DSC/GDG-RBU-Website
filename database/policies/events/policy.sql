-- ANYONE CAN SEE EVENTS
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO PUBLIC
  USING (true);

-- TEAM MEMBERS CAN CREATE BLOGS
CREATE POLICY "Admin and team can create events"
  ON events
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- TEAM MEMBERS CAN UPDATE BLOGS
CREATE POLICY "Admin and team can update events"
  ON events
  FOR UPDATE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));

-- TEAM MEMBERS CAN DELETE BLOGS
CREATE POLICY "Admin and team can delete events"
  ON events
  FOR DELETE
  USING (auth.jwt() ->> 'role' IN ('admin', 'team'));