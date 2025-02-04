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

-- CREATE A FUNCTION TO VALIDATE USER_ID
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


-- CREATE A TRIGGER TO VALIDATE USER_ID ON INSERT OR UPDATE
CREATE TRIGGER validate_member_user_id_trigger
BEFORE INSERT OR UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION validate_member_user_id();