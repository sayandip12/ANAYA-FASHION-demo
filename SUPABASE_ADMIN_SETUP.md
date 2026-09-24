# ANAYA Admin Dashboard Setup

To set up your secure ANAYA Admin access, follow these precise steps:

## 1. Create Your Admin User in Supabase
Do not attempt to log in yet! First, you must create your administrator credentials directly in your Supabase backend.
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project.
3. Click on **Authentication** in the left sidebar, then click on **Users**.
4. Click **Add User** -> **Create New User**.
5. Enter your own email address and create a **secure password**.
6. Make sure "Auto Confirm User?" is checked if you want to skip email verification.
7. Click **Create user**.

*Note: Your application does not store your admin password anywhere in its source code. It is exclusively managed by Supabase Auth.*

## 2. Update Database Policies (RLS)
Ensure you have run the updated `supabase/schema.sql` script in your Supabase **SQL Editor**. This script enforces that only Authenticated users (like the one you just created) can edit products or store settings.

## 3. Log In to the ANAYA Admin Dashboard
1. Go to your local/live website.
2. The Admin Dashboard is hidden from the public. To reveal it, click the main **ANAYA logo** at the top of the screen exactly **7 times** (or navigate manually to `/admin`).
3. You will see the secure ANAYA Admin Login screen.
4. Enter the **email** and **password** you created in Supabase Auth.
5. Click **SIGN IN**.

## 4. Session Persistence & Security
Once signed in, Supabase securely manages your session.
- You can safely refresh the browser; you will remain logged in.
- Unauthenticated users trying to access `/admin/dashboard` will be automatically bounced back to the login screen.
- You can log out safely by clicking **LOGOUT** in the sidebar.

*Your public website (Homepage, Collections, Product detail) remains 100% accessible to normal visitors without requiring authentication.*
