# GitGoing

Programming education website.

## Run locally

```sh
npm install
npm run dev
```

## Run the API locally

1. Install MongoDB Community Server and make sure the **MongoDB** Windows
   service is running.
2. Copy `server/.env.example` to `server/.env`.
3. From the project root, run:

```sh
npm install
npm run server:dev
```

The API listens on `http://127.0.0.1:5000`. Check
`http://127.0.0.1:5000/api/health` for the server and MongoDB connection status.
`CLIENT_ORIGIN` in `server/.env` controls which frontend origin can make
credentialed API requests; the example is set for the Vite server at
`http://127.0.0.1:5173`. The frontend uses `http://127.0.0.1:5000` by default;
set `VITE_API_URL` when building for a different API address.

Email/password registration is available at `POST /api/auth/register` with
`email`, `password` (12–128 characters), and an optional `displayName`.
Verification links are sent through Resend and require the user to confirm
before the email is verified. Set `RESEND_API_KEY` and `EMAIL_FROM` in
`server/.env`; use an address/domain authorized by your Resend account.
`API_ORIGIN` sets the base URL used in verification links.
Sign-in is available at `POST /api/auth/login`; verified users receive a
MongoDB-backed, HTTP-only session cookie. `GET /api/auth/me` returns the current
user's public profile, or `401` when there is no valid session.
`POST /api/auth/logout` ends the session. Production deployments must set
`SESSION_SECRET` to a random value of at least 32 bytes and use HTTPS; local
development creates a temporary secret if none is set. Auth POST requests
reject a mismatched browser `Origin`.

Password recovery is available from the login dialog and uses
`POST /api/auth/forgot-password` with an email address.
When a verified account exists, Resend sends a one-hour reset link. `GET
/api/auth/reset-password?token=...` displays the reset form; submit the new
password and confirmation there, or use `POST /api/auth/reset-password` with
`token`, `password`, and `confirmPassword`. Password reset invalidates existing
sessions; users sign in again with the new password.

## Terminal navigation

Choose **Terminal** in the site navigation to replace the Vim preview with the
interactive shell. Available commands:

- `whoami` — show the current visitor as `guest`
- `ls` — list all available courses
- `cd <course>` — open a course, for example `cd Java`
- `cd "HTML / CSS"` — open the combined web fundamentals course
- `cd ..` — return to the home page
- `pwd`, `help`, `clear`, `exit`

Course pages are available at `/courses/<course>`, including `/courses/java`.
