-- ANYONE CAN SEE THIER REGISTRATION
CREATE POLICY "Users can read their own registrations"
  ON registrations
  FOR SELECT
  USING (auth.uid() = user_id);

-- USERS CAN REGISTER FOR AN EVENT
CREATE POLICY "Users can register for events"
  ON registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ADMIN AND TEAM CAN SEE ALL REGISTRATION
CREATE POLICY "Admin and Team can read all registrations"
  ON registrations
  FOR SELECT
  USING (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'team')
    ));

-- ANYONE CAN SEE HOW MANY PPL HAVE ENROLE IN A EVENTS
CREATE POLICY "Enable read access for all users"
ON "public"."registrations"
AS PERMISSIVE
FOR SELECT
TO public
USING (
  true
);