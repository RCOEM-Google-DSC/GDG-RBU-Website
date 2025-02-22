### Database Schema

#### 1. **Tables** [RLS Security Enabled]

- **users**

  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `name` (text, not null)
  - `email` (text, unique, not null)
  - `role` (enum `user_role`, not null, default: `'user'`)
    - Enum values: `'admin'`, `'team'`, `'user'`
  - `image` (text, default: `'user.png'`)
  - `created_at` (timestamptz, default: `now()`)

- **blogs**

  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `writer_id` (uuid, foreign key to `users.id`, on delete cascade)
  - `image_url` (text)
  - `title` (text, not null)
  - `content` (text, not null)
  - `created_at` (timestamptz, default: `now()`)

- **events**

  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `name` (text, not null)
  - `post_image` (text)
  - `description` (text)
  - `event_time` (timestamptz, not null)
  - `location` (text)
  - `created_at` (timestamptz, default: `now()`)

- **registrations** (many-to-many relationship table)

  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `event_id` (uuid, foreign key to `events.id`, on delete cascade)
  - `user_id` (uuid, foreign key to `users.id`, on delete cascade)
  - `created_at` (timestamptz, default: `now()`)
  - Unique constraint on (`event_id`, `user_id`)

- **members**
  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `domain` (enum `domain_type`, not null)
    - Enum values: `'Web Dev'`, `'Video Editing'`, `'Socials'`, `'App Dev'`, `'Cloud & AI'`, `'Graphics'`, `'Marketing'`, `'Management'`
  - `role` (text, not null)
  - `name` (text, not null)
  - `user_id` (uuid, foreign key to `users.id`, on delete cascade)
  - `profile_links` (text[])
  - `description` (text)
  - `thought` (text)
  - `created_at` (timestamptz, default: `now()`)

---

#### 2. **Security Policies**

- **Users Table**:

  - **Users can read their own data**:
    - Policy: Users can only read their own data.
  - **Admin and team can update user data**:
    - Policy: Admins and team members can update user data.
  - **Admin and team can delete user data**:
    - Policy: Admins and team members can delete user data.

- **Blogs Table**:

  - **Anyone can read blogs**:
    - Policy: All users (including unauthenticated) can read blogs.
  - **Admin and team can create blogs**:
    - Policy: Admins and team members can create blogs.
  - **Admin and team can update their own blogs**:
    - Policy: Admins and team members can update blogs they created.
  - **Admin and team can delete blogs**:
    - Policy: Admins and team members can delete blogs they created.

- **Events Table**:

  - **Anyone can read events**:
    - Policy: All users (including unauthenticated) can read events.
  - **Admin and team can create events**:
    - Policy: Admins and team members can create events.
  - **Admin and team can update events**:
    - Policy: Admins and team members can update events.
  - **Admin and team can delete events**:
    - Policy: Admins and team members can delete events.

- **Registrations Table**:

  - **Users can read their own registrations**:
    - Policy: Users can only read their own registrations.
  - **Users can register for events**:
    - Policy: Users can register for events.
  - **Admin and team can read all registrations**:
    - Policy: Admins and team members can read all registrations.

- **Members Table**:
  - **Anyone can read members**:
    - Policy: All users (including unauthenticated) can read members.
  - **Only admins can insert members**:
    - Policy: Only admins can insert new members.
  - **Only admins can update members**:
    - Policy: Only admins can update members.
  - **Only admins can delete members**:
    - Policy: Only admins can delete members.
  - **Team members and admins can update their own data**:
    - Policy: Team members and admins can update their own member data.

---

#### 3. **Storage Buckets**

- **blogs**:

  - Public bucket for storing blog images.
  - Policies:
    - **Public read access for blogs**:
      - Policy: Anyone can read files in the `blogs` bucket.
    - **Admins and team can upload to blogs**:
      - Policy: Admins and team members can upload files to the `blogs` bucket.
    - **Admins and team can update blogs**:
      - Policy: Admins and team members can update files in the `blogs` bucket.
    - **Admins and team can delete from blogs**:
      - Policy: Admins and team members can delete files from the `blogs` bucket.

- **profile**:

  - Public bucket for storing user profile images.
  - Policies:
    - **Public read access for profile**:
      - Policy: Anyone can read files in the `profile` bucket.
    - **Users can upload their own profile pictures**:
      - Policy: Users can upload files to their own profile folder.
    - **Users can update their own profile pictures**:
      - Policy: Users can update files in their own profile folder.
    - **Users can delete their own profile pictures**:
      - Policy: Users can delete files from their own profile folder.

- **events**:
  - Public bucket for storing event images.
  - Policies:
    - **Public read access for events**:
      - Policy: Anyone can read files in the `events` bucket.
    - **Admins and team can upload to events**:
      - Policy: Admins and team members can upload files to the `events` bucket.
    - **Admins and team can update events**:
      - Policy: Admins and team members can update files in the `events` bucket.
    - **Only admins and team can delete from events**:
      - Policy: Admins and team members can delete files from the `events` bucket.

---

#### 4. **Functions & Triggers**

- **Functions**:

  - **`handle_new_user`**:
    - Automatically inserts new users into the `users` table when they sign up via authentication.
  - **`validate_member_user_id`**:
    - Validates that the `user_id` in the `members` table references a user with the role `'team'` or `'admin'`.

- **Triggers**:
  - **`on_auth_user_created`**:
    - Triggered after a new user is created in the `auth.users` table.
    - Executes the `handle_new_user` function.
  - **`validate_member_user_id_trigger`**:
    - Triggered before inserting or updating a record in the `members` table.
    - Executes the `validate_member_user_id` function.

---

#### 5. **Indexes**

- **Indexes for better query performance**:
  - `idx_blogs_writer_id`: Index on `blogs(writer_id)`.
  - `idx_registrations_event_id`: Index on `registrations(event_id)`.
  - `idx_registrations_user_id`: Index on `registrations(user_id)`.
  - `idx_members_user_id`: Index on `members(user_id)`.

---

#### 6. **Row Level Security (RLS)**

- **Enabled for all tables**:
  - `users`, `blogs`, `events`, `registrations`, `members`, and `storage.objects`.

---

This updated documentation now includes **all the missing parts** from the SQL file, such as:

1. **Storage Buckets**:

   - Added `events` bucket and its policies.
   - Updated policies for `blogs` and `profile` buckets.

2. **Functions & Triggers**:

   - Added `validate_member_user_id` function and its trigger.

3. **Indexes**:

   - Added indexes for better query performance.

4. **Row Level Security (RLS)**:
   - Enabled RLS for all tables and storage buckets.
