# ALCHEMIST PRODUCTIONS website
Next.js 14 + Tailwind + Framer Motion + Lenis + Supabase (auth, Postgres RLS, storage). No secret/service keys are used anywhere.

## Setup
1. **Supabase**: create a project, SQL Editor, paste and run `supabase/schema.sql`.
2. Project Settings > API: copy *Project URL* and *anon public key*.
3. Authentication > Providers > Email: keep **Confirm email** ON; set *Email OTP length* = 6.
4. **Verification email**: Authentication > Emails > Templates > *Confirm signup*. Subject: `Your Alchemist Productions verification code`. Paste the whole of `supabase/email-confirm-signup.html` as the body. (The default Supabase mailer is heavily rate-limited: add a custom SMTP such as Resend or Brevo under Authentication > SMTP before launch.)
5. **GitHub**: create a repo and push this folder.
6. **Vercel**: import the repo, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, deploy.
7. Supabase > Authentication > URL Configuration: Site URL = your Vercel URL; Redirect URL = `https://YOUR-DOMAIN/auth/callback` (+ `http://localhost:3000/auth/callback`). The email's logo and button use the Site URL.
8. On the site open `/login`, create an account with **kkanjarkar@gmail.com**, enter the 6-digit code from the email, then run in SQL Editor:
   `insert into admins(user_id,role) select id,'super_admin' from auth.users where email='kkanjarkar@gmail.com' and email_confirmed_at is not null;`
   `/admin` now works for that account only. Add staff at `/admin/team` (they must sign up and verify first).
9. Replace images in `public/v/` with the original high-res posters (same file names) and `public/logo.png` with your final square logo.

Local: `npm i`, copy `.env.example` to `.env.local`, `npm run dev`. Application dropdown: `JOIN_ROLES` in `lib/data.ts`.
