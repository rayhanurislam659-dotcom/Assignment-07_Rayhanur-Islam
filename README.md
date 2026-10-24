# BazarDor (বাজার দর)

BazarDor is a responsive grocery-price web application for everyday essentials in Bangladesh. It brings today's prices for rice, lentils, oil, vegetables, fish, meat, dairy, and spices together with daily price movements and a market-by-market comparison.

The user-facing interface is written in Bengali, as required by the assignment, and prices are shown in Bengali numerals. This README is in English.

Product data is provided by the [Programming Hero BazarDor API](https://openapi.programming-hero.com/api/bazardor), accessed through `https://api.api-store.workers.dev/api/bazardor`.

---

## Features

1. **Live price ticker** — An infinite-scrolling ticker below the navbar shows each product's emoji, name, today's price, unit, and up/down percentage.
2. **Daily risers and fallers** — Separate panels show the top six products that became more expensive and the top six that became cheaper compared with yesterday, including rank and change badges.
3. **Responsive product grid** — A mobile-first grid of product cards with Bengali names, units, prices, and green up / red down / gray flat change badges.
4. **Protected product details** — `/product/[slug]` requires sign-in and displays a market summary, today's price, minimum/maximum/average prices, price history, and market-by-market ranges grouped by division.
5. **Category browsing with numeric sorting** — Sort products by default order, price low-to-high, or price high-to-low. Sorting compares actual numbers, not Bengali strings. Skeleton, retry, and 404-style empty states are included.
6. **Authentication with BetterAuth** — Email/password sign-up and sign-in, optional Google and GitHub login, validation, password visibility toggle, toast notifications, and cookie-based sessions.
7. **Profile management** — `/profile` shows account details and a sign-out action. `/profile/update` is a separate route that updates the user's name with `authClient.updateUser`.
8. **Complete UI states** — Loading skeletons, error boundaries, global 404 page, protected-route redirect notices, Bengali dates, and accessible responsive layouts.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens; Lucide icons
- **Authentication:** BetterAuth 1.7 (email/password, optional Google/GitHub)
- **Database:** LibSQL (local file or Turso) with Drizzle ORM
- **Notifications:** react-hot-toast
- **Data source:** BazarDor public API with internal Next.js route-handler proxies
- **Fonts:** Next.js Google Fonts — Anek Bangla and Hind Siliguri

---

## Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Hero, top movers, all products | Public |
| `/category/[slug]` | Category products and price sorting | Public |
| `/product/[slug]` | Product details and market comparison | Protected |
| `/signin`, `/signup` | Authentication pages | Public |
| `/profile`, `/profile/update` | Profile overview and name update | Protected |
| `/api/products`, `/api/categories` | Cached product/category proxies | Public |
| `/api/auth/[...all]` | BetterAuth API handler | — |

Unauthenticated users who open a protected route are redirected to `/signin?redirect=...&reason=protected` and shown a toast message.

---

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (tested with Node 24)
- npm

### Installation

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Generate a long random secret and put it in `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

For local development, the default values are sufficient:

```env
BETTER_AUTH_SECRET=<your-generated-secret>
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=file:./.data/bazardor.db
DATABASE_AUTH_TOKEN=
BAZARDOR_API_URL=https://api.api-store.workers.dev/api/bazardor
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The `predev` script automatically creates the local LibSQL database and the BetterAuth tables through `scripts/db-init.mjs`.

To reset local authentication data, stop the server, delete `.data/bazardor.db`, and run `npm run dev` again.

### Optional social login

Google and GitHub buttons are always visible. To make them work, add OAuth credentials to `.env`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Authorized callback URLs for local development:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

If these values are missing, email/password authentication still works and clicking a social button shows a Bengali toast explaining that the provider is not configured.

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Long random string used to sign sessions |
| `BETTER_AUTH_URL` | Yes | Public base URL of the app (`http://localhost:3000` locally) |
| `DATABASE_URL` | Yes | Local `file:` path or production `libsql://` URL |
| `DATABASE_AUTH_TOKEN` | Production | Turso auth token; leave empty for a local file |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No | Enables Google sign-in |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | No | Enables GitHub sign-in |
| `BAZARDOR_API_URL` | No | Overrides the product API base URL |

Never commit `.env`. The repository includes only `.env.example`.

---

## Available Scripts

```bash
npm run dev      # Start development server (also initializes the auth DB)
npm run build    # Create a production build (also initializes the auth DB)
npm start        # Start the production server
npm run lint     # Run ESLint
npm run db:init  # Create or update LibSQL auth tables
```

---

## Production Build Locally

```bash
npm run lint
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel with Turso

Vercel's filesystem is not persistent, so a local SQLite file is not suitable for production authentication. Use Turso (hosted LibSQL).

1. **Create a Turso database:**

   ```bash
   turso db create bazardor
   turso db show bazardor --url
   turso db tokens create bazardor
   ```

2. **Add environment variables in Vercel** (Project Settings > Environment Variables):

   - `BETTER_AUTH_SECRET` — a long random secret
   - `BETTER_AUTH_URL` — `https://your-app.vercel.app`
   - `DATABASE_URL` — the `libsql://...` URL from Turso
   - `DATABASE_AUTH_TOKEN` — the Turso token
   - Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BAZARDOR_API_URL`

3. **Build command:** `npm run build` (the default). The `prebuild` script creates the required tables in Turso automatically.

4. **OAuth callback URLs for production:**

   - Google: `https://your-app.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-app.vercel.app/api/auth/callback/github`

5. Deploy and test sign-up, sign-in, a protected product page, and a hard refresh on a dynamic route.

---

## Manual Verification Checklist

1. **Home page:** Confirm the navbar, infinite price ticker, hero CTA that scrolls to `#সব-পণ্য`, top risers/fallers, and product grid.
2. **Protected route:** Open `/product/sorno-machi-chal` while signed out. You should be redirected to sign-in with a notice toast.
3. **Sign up:** Create an account at `/signup`. On success, you should be redirected to `/signin` with the email prefilled.
4. **Sign in:** After signing in, the navbar should show your profile and the protected product page should open with min/max/average prices and market data.
5. **Category sorting:** Open `/category/chal` and choose "price low to high". Prices should be numerically ascending, e.g. 66, 74, 99, 148.
6. **Profile update:** Open `/profile/update`, change the name, and save. The profile page and navbar should both show the new name.
7. **Empty and error states:** Open `/category/not-a-real-category` for the 404-style empty state, and `/unknown-route` for the global 404 page.
8. **Responsive layout:** Use browser DevTools at 390px, 768px, and 1440px widths.
9. **Refresh behavior:** Reload a product detail and category page directly; both should work without a client-side navigation first.
10. **Sign out:** Sign out from the navbar or profile page and confirm that the protected routes are no longer accessible.

---

## Project Structure

```text
scripts/db-init.mjs              Auth database bootstrap
public/images/                   Hero illustration
src/app/                         Routes, layouts, API handlers, states
src/components/auth/             Sign-in/sign-up forms and social buttons
src/components/category/         Category browser and sorting
src/components/home/             Hero, movers, all-products sections
src/components/layout/           Navbar, ticker, footer, toast provider
src/components/products/         Product cards and change badges
src/components/profile/          Profile update and sign-out actions
src/components/ui/               Shared buttons, skeletons, states
src/lib/api.ts                   Product/category API client
src/lib/auth.ts                  BetterAuth server configuration
src/lib/auth-client.ts           BetterAuth React client
src/lib/bengali.ts               Bengali digits, dates, prices, market stats
src/lib/db.ts                    LibSQL and Drizzle setup
src/lib/schema.ts                BetterAuth database schema
```

---

## Notes

- Email verification and forgot-password flows are intentionally not implemented, in line with the assignment requirements.
- Product details require authentication.
- The public API can occasionally be cold; the app uses a 12-second timeout, cached requests, and visible retry actions.
- BazarDor is an educational project. Prices are informational only; verify them at your local market before making purchasing decisions.
