-- USERS CAN SEE ALL TEAM MEMBERS DATA
CREATE POLICY "Anyone can read members"
ON members
FOR SELECT
TO PUBLIC
USING (true);

-- ADMIN CAN ONLY ADD NEW MEMBERS
CREATE POLICY "Only admins can insert members"
ON members
FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ONLY ADMIN HAVE THE ACCESS OF ALL THE MEMBERS DATA 
CREATE POLICY "Only admins can update members"
ON members
FOR UPDATE
USING (auth.jwt() ->> 'role' = 'admin');

-- ONLY ADMIN CAN REMOVE MEMEBERS
CREATE POLICY "Only admins can delete members"
ON members
FOR DELETE
USING (auth.jwt() ->> 'role' = 'admin');

-- ALL TEAM MEMBERS CAN UPDATE THEIR OWN DATA LIKE PROFILE_LINKS , DESCRIPTION ,THOUGHT
CREATE POLICY "Team Mebers & Admin can update their own data"
ON members
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
