# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখার জন্য একটি রেসপন্সিভ বাংলা ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার দাম, দৈনিক বাড়া-কমা, এবং বাজারভিত্তিক তুলনা—সব এক জায়গায়।

ডেটা আসে [Programming Hero BazarDor API](https://openapi.programming-hero.com/api/bazardor) থেকে, যা এই প্রজেক্টে `https://api.api-store.workers.dev/api/bazardor`-এর মাধ্যমে ব্যবহার করা হয়েছে।

---

## ✨ ফিচার

1. **লাইভ প্রাইস টিকার** — নেভবারের নিচে চালু থাকা অসীম স্ক্রলিং টিকারে প্রতিটি পণ্যের ইমোজি, নাম, আজকের দাম, একক ও ▲/▼ শতাংশ দেখায়।
2. **আজ দাম বেড়েছে / কমেছে** — গতকালের তুলনায় সবচেয়ে বেশি বাড়া ৬টি এবং কমা ৬টি পণ্য আলাদা প্যানেলে, র‍্যাংক ও পরিবর্তনের ব্যাজসহ।
3. **সব পণ্যের রেসপন্সিভ গ্রিড** — মোবাইল, ট্যাব ও ডেস্কটপে মানানসই কার্ড গ্রিড; প্রতিটি কার্ডে বাংলা সংখ্যায় দাম এবং সবুজ ▲ / লাল ▼ / ধূসর — পরিবর্তনের ব্যাজ।
4. **সুরক্ষিত প্রোডাক্ট ডিটেইল** — `/product/[slug]` শুধু সাইন-ইন করা ব্যবহারকারীর জন্য; সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বিভাগ অনুযায়ী প্রতিটি বাজারের দামের রেঞ্জ বার-ভিজুয়ালাইজেশনসহ।
5. **ক্যাটাগরি ব্রাউজিং ও নিউমেরিক সর্টিং** — ডিফল্ট / দাম কম থেকে বেশি / দাম বেশি থেকে কম। দাম সংখ্যা হিসেবে সর্ট হয়, বাংলা স্ট্রিং হিসেবে নয়। লোডিং স্কেলেটন, এরর রিট্রাই এবং ৪০৪-স্টাইল খালি অবস্থা রয়েছে।
6. **BetterAuth অথেন্টিকেশন** — ইমেইল/পাসওয়ার্ড সাইন আপ ও সাইন ইন, ঐচ্ছিক Google ও GitHub লগইন, টোস্ট নোটিফিকেশন, ভ্যালিডেশন, প্যাসওয়ার্ড শো/হাইড এবং সেশন-ভিত্তিক সুরক্ষিত রুট।
7. **প্রোফাইল ও প্রোফাইল আপডেট** — `/profile`-এ অ্যাকাউন্টের সারসংক্ষেপ, সাইন আউট; `/profile/update`-এ আলাদা রুটে নাম পরিবর্তন করে `authClient.updateUser` দিয়ে সংরক্ষণ।
8. **বাংলা টাইপোগ্রাফি ও সম্পূর্ণ স্টেটস** — বাংলা সংখ্যা, তারিখ (Asia/Dhaka), Anek Bangla + Hind Siliguri ফন্ট, স্কেলেটন, এরর বাউন্ডারি, গ্লোবাল ৪০৪, সাইন-ইন রিডাইরেক্ট টোস্ট এবং মোবাইল-ফার্স্ট লেআউট।

---

## 🧰 টেক স্ট্যাক

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4, custom design tokens, Lucide icons
- **Auth:** BetterAuth 1.7 (email/password + optional Google/GitHub), session cookies
- **Database:** LibSQL (লোকাল ফাইল বা Turso) + Drizzle ORM adapter
- **Notifications:** react-hot-toast
- **API:** BazarDor public API, Next.js Route Handlers দিয়ে internal proxy
- **Fonts:** `next/font/google` — Anek Bangla ও Hind Siliguri

---

## 📁 গুরুত্বপূর্ণ রুট

| রুট | বর্ণনা | অ্যাক্সেস |
| --- | --- | --- |
| `/` | হিরো, দাম বাড়া/কমা, সব পণ্য | পাবলিক |
| `/category/[slug]` | ক্যাটাগরি পণ্য, সর্টিং | পাবলিক |
| `/product/[slug]` | বিস্তারিত দাম ও বাজার তুলনা | **প্রোটেক্টেড** |
| `/signin`, `/signup` | BetterAuth লগইন/রেজিস্ট্রেশন | পাবলিক |
| `/profile`, `/profile/update` | প্রোফাইল ও নাম আপডেট | **প্রোটেক্টেড** |
| `/api/products`, `/api/categories` | ক্যাটাগরি/পণ্য proxy API | পাবলিক |
| `/api/auth/[...all]` | BetterAuth handler | — |

প্রোটেক্টেড রুটে লগইন না থাকলে `/signin?redirect=...&reason=protected`-এ পাঠানো হয় এবং টোস্টে জানানো হয়।

---

## 🚀 লোকাল সেটআপ

**প্রয়োজন:** Node.js 20.9+ (পরীক্ষিত Node 24), npm।

```bash
npm install
cp .env.example .env
```

`.env` ফাইলে একটি শক্ত সিক্রেট বসান:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

লোকাল ডেভেলপমেন্টের জন্য `.env`-এ ডিফল্ট মানগুলোই যথেষ্ট:

```env
BETTER_AUTH_SECRET=<generated-secret>
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=file:./.data/bazardor.db
DATABASE_AUTH_TOKEN=
BAZARDOR_API_URL=https://api.api-store.workers.dev/api/bazardor
```

এরপর:

```bash
npm run dev
```

- অ্যাপ: <http://localhost:3000>
- `predev` স্ক্রিপ্ট LibSQL ডাটাবেস ও BetterAuth টেবিল স্বয়ংক্রিয়ভাবে তৈরি করে (`scripts/db-init.mjs`)।
- লোকাল auth ডেটা রিসেট করতে চাইলে `.data/bazardor.db` ফাইলটি মুছে আবার `npm run dev` দিন।

> Windows PowerShell-এ কপি করতে: `Copy-Item .env.example .env`

### Google / GitHub লগইন (ঐচ্ছিক)

`.env`-এ ক্রেডেনশিয়াল দিলে সোশ্যাল বাটনগুলো সক্রিয় হবে; না দিলে ইমেইল/পাসওয়ার্ড কাজ করবে এবং সোশ্যাল বাটনে ক্লিক করলে বাংলা টোস্ট দেখাবে।

- Google Cloud Console → OAuth client → Authorized redirect URI:
  `http://localhost:3000/api/auth/callback/google`
- GitHub → Developer settings → OAuth App → Authorization callback URL:
  `http://localhost:3000/api/auth/callback/github`

ডিপ্লয়ের পর একই URI-তে নিজের ডোমেইন ব্যবহার করুন।

---

## 📜 স্ক্রিপ্ট

```bash
npm run dev      # ডেভেলপমেন্ট সার্ভার (+ DB init)
npm run build    # প্রোডাকশন বিল্ড (+ DB init)
npm start        # প্রোডাকশন সার্ভার
npm run lint     # ESLint
npm run db:init  # LibSQL টেবিল তৈরি/আপডেট
```

---

## ☁️ Vercel-এ ডিপ্লয় (প্রস্তাবিত)

Vercel-এর ফাইলসিস্টেম স্থায়ী নয়, তাই প্রোডাকশনে **Turso** (LibSQL) ব্যবহার করুন।

1. **Turso ডাটাবেস তৈরি করুন** (Turso CLI):
   ```bash
   turso db create bazardor
   turso db show bazardor --url
   turso db tokens create bazardor
   ```
2. **Vercel Project → Settings → Environment Variables:**
   - `BETTER_AUTH_SECRET` — লোকাল সিক্রেটের মতো লম্বা র‍্যান্ডম স্ট্রিং
   - `BETTER_AUTH_URL` — `https://your-app.vercel.app`
   - `DATABASE_URL` — `libsql://...` (Turso URL)
   - `DATABASE_AUTH_TOKEN` — Turso token
   - ঐচ্ছিক: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BAZARDOR_API_URL`
3. **Build command:** `npm run build` (ডিফল্ট)। `prebuild` স্বয়ংক্রিয়ভাবে একই স্কিমা Turso-তে তৈরি করবে।
4. **OAuth callback (প্রোডাকশন):**
   - Google: `https://your-app.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-app.vercel.app/api/auth/callback/github`
5. Deploy করুন এবং সাইন আপ → সাইন ইন → প্রোটেক্টেড পেজে প্রবেশ যাচাই করুন।

`.env` কখনো Git-এ কমিট করবেন না; শুধু `.env.example` কমিট হয়েছে।

---

## 🧪 যাচাই করা হয়েছে

- সাইন আপ → সাইন ইন → হোম; সেশন নেভবারে নাম দেখায়।
- লগআউট অবস্থায় প্রোটেক্টেড পেজে গেলে সাইন-ইন পেজ + টোস্ট।
- প্রোডাক্ট ডিটেইল, সর্বনিম্ন/সর্বোচ্চ/গড় এবং বাজারভিত্তিক ডেটা লোড হয়।
- প্রোফাইল নাম আপডেট (`updateUser`) সফলভাবে সংরক্ষিত হয়।
- ক্যাটাগরি দামের সর্টিং সংখ্যাগতভাবে সঠিক (যেমন ৬৬ → ৭৪ → ৯৯ → ১৪৮)।
- ভুল ক্যাটাগরি/পণ্য ও অজানা রুটে ৪০৪ UI + হোম CTA।
- রিফ্রেশে ডায়নামিক রুট কাজ করে; লিন্ট ও প্রোডাকশন বিল্ড পাস করেছে।

---

## 📝 নোট

- অ্যাসাইনমেন্টের নির্দেশ অনুযায়ী **ইমেইল ভেরিফিকেশন ও ফরগট পাসওয়ার্ড** ইচ্ছাকৃতভাবে রাখা হয়নি।
- প্রোডাক্ট ডিটেইল পেজে প্রবেশের জন্য লগইন আবশ্যক।
- পাবলিক API মাঝে মাঝে ঠান্ডা (cold) হতে পারে; ১২ সেকেন্ড টাইমআউট ও এরর রিট্রাই বাটন রাখা হয়েছে।
- বাজারদর একটি শিক্ষামূলক প্রজেক্ট; দাম শুধু তথ্যের জন্য, কেনাকাটার আগে স্থানীয় বাজারে যাচাই করুন।
