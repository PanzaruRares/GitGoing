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

## Course assistant

The **Ask GitBuddy** button retrieves relevant lesson pages from the JavaScript,
Python, Java, C++, HTML/CSS, and Linux courses and sends those excerpts with
the question to Gemini for a grounded answer. This is retrieval-based question
answering, not model training. Create a Gemini API key in Google AI Studio and
set `GEMINI_API_KEY` in `server/.env`; `GEMINI_MODEL` can select a model
available to your API project. The server keeps the key private, limits
requests to eight per minute per client, and does not store Gemini interactions.

Questions and selected course excerpts are sent to Google. Google's Gemini API
free tier may use submitted content to improve its products, so the assistant
displays this notice and users should not submit personal or sensitive
information. The static GitHub Pages deployment does not run the Express API;
using the assistant there requires deploying the API and setting `VITE_API_URL`
to its public address at frontend build time.

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

## Publish a static preview on GitHub Pages

The repository includes a GitHub Actions workflow that builds and deploys the
frontend to `https://panzarurares.github.io/GitGoing/` whenever changes are
pushed to `main`. In the GitHub repository, open **Settings → Pages** and set
**Build and deployment → Source** to **GitHub Actions**. The first deployment
will then publish the site; check the **Actions** tab for its status.

Course navigation and the simulated terminal work in this static preview.
Account creation, sign-in, email, and password recovery need the Express API,
which GitHub Pages does not run. Those controls are explicitly marked as
unavailable unless a public API URL is configured with `VITE_API_URL` at build
time. The Pages build also publishes a `404.html` fallback so course links
continue to load when opened or refreshed directly.
