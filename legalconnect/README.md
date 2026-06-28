# LegalConnect 🏛️

A production-ready platform connecting clients with verified lawyers. Real-time chat, live lawyer directory, dual-role auth, and English/Swahili support.

**Stack:** React 18 · Supabase (Auth + DB + Realtime) · Render (hosting)

---

## ⚡ Quick Start

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a name, password, and region (pick one closest to your users)
3. Wait ~2 minutes for it to provision

### 2. Run the Database Schema
1. In your Supabase dashboard → **SQL Editor** → **New Query**
2. Paste the entire contents of `supabase_schema.sql`
3. Click **Run** — this creates all tables, security policies, and triggers

### 3. Get Your API Keys
In Supabase → **Settings** → **API**:
- Copy **Project URL**
- Copy **anon / public** key

### 4. Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env`:
```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Install & Run
```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) ✅

---

## 🚀 Deploy to Render

### Option A — Using render.yaml (recommended)
The `render.yaml` in this repo auto-configures everything.

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo
4. Add environment variables in Render dashboard:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
5. Deploy ✅

### Option B — Manual
1. Render → **New** → **Static Site**
2. Connect GitHub repo
3. Settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
4. Add the two env vars above
5. Deploy ✅

Every `git push` to `main` triggers an automatic redeploy.

---

## 🔐 Supabase Auth Setup

By default Supabase requires email confirmation. For faster testing:
1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Turn off **"Confirm email"** during development
3. Re-enable it before going live

---

## 🌍 What's Real (vs the old version)

| Feature | Before (localStorage) | Now (Supabase) |
|---|---|---|
| User accounts | Browser only | ✅ Real DB, any device |
| Lawyer directory | Hardcoded seed data | ✅ Live from DB |
| New lawyer registration | Invisible to others | ✅ Appears instantly for everyone |
| Chat | Fake auto-replies | ✅ Real messages between users |
| Real-time chat | ❌ | ✅ Supabase Realtime (WebSockets) |
| Data after clearing browser | ❌ Lost | ✅ Persists in cloud DB |
| Multiple devices | ❌ | ✅ Works everywhere |

---

## 📁 Project Structure

```
src/
├── lib/
│   └── supabase.js          ← Supabase client
├── services/
│   ├── authService.js       ← Auth (register/login/session)
│   ├── lawyerService.js     ← Lawyer CRUD + realtime
│   └── chatService.js       ← Messaging + realtime
├── contexts/
│   ├── LawyerContext.jsx    ← Global auth + lawyer state
│   └── ChatContext.jsx      ← Chat state + subscriptions
├── components/
│   ├── common/              ← Header, Footer, Nav
│   ├── home/                ← Hero, Services, HowItWorks, etc.
│   ├── lawyers/             ← Directory, Cards, Auth modal
│   ├── chat/                ← Chat window, messages, input
│   └── contact/             ← Contact form
└── pages/                   ← Route-level page components
```

---

## 🗄️ Database Tables

| Table | Purpose |
|---|---|
| `profiles` | All users (auto-created on signup) |
| `lawyer_profiles` | Extra data for lawyer accounts |
| `conversations` | One row per customer↔lawyer pair |
| `messages` | Individual chat messages |
| `reviews` | Client reviews (rating + comment) |

Row Level Security is enabled on all tables — users can only see/edit data they're allowed to.

---

## 🔧 Customisation

- **Colors** → `src/styles/globals.css` (CSS custom properties)
- **Languages** → `src/utils/translations.js`
- **Specializations/Locations** → `src/utils/helpers.js`
- **Email templates** → Supabase Dashboard → Authentication → Email Templates

---

## 📝 License
MIT
