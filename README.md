# CampusHub: The Next-Gen Futuristic Smart School Ecosystem

> **Welcome to the 100-Years-Ahead Cyber-School Operating System.**
> CampusHub eliminates fragmented school management software by centralizing 100% of institutional operations—from 30-second digital attendance grids and holographic student learning to financial ledgers and co-curricular club hubs—wrapped in a breathtaking glassmorphic HUD design.

---

## 🚀 Vision & Key Highlights

- **Breathtaking Glassmorphic UI:** Deep Space Obsidian (`#0F172A`) base with frosted glass cards (`backdrop-blur-md`), glowing cyan/blue HUD borders, and fluid Framer Motion transitions.
- **Revolutionary 1-Minute Attendance:** Eliminates the classic 20-minute roll-call waste. Grid defaults to *Present*; teachers tap only absentees to log the whole class in 30 seconds.
- **Dual AI Cognitive Engines:**
  - **AI Study Assistant:** Curriculum-tuned notes generator and board exam question predictor.
  - **Hey-Clicky Omni-Navigator:** Voice- and text-activated HUD assistant navigating pages, records, and modals instantly.
- **Co-Curricular Club Hubs:** Dedicated digital pavilions for Robotics, Astrophysics, Debate, Art, and Coding societies with verified digital membership badges.
- **Role-Based Security:** Strict multi-role separation for **Admin**, **Teacher**, **Student**, **Parent**, and **Public** visitors powered by Supabase Auth and PostgreSQL Row Level Security (RLS).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 14+ (App Router, React 18, Server Components) |
| **Styling & Effects** | Tailwind CSS, PostCSS, Lucide Icons |
| **Motion & Micro-interactions** | Framer Motion (Glassmorphic glow pulses & HUD transitions) |
| **Backend & API Gateway** | Node.js, Express.js, TypeScript / ES Modules |
| **Database & Auth** | Supabase (PostgreSQL 15+, Supabase Auth, Row-Level Security) |
| **Cloud File Storage** | Supabase Storage (Study notes, certificates, school media) |
| **AI Integration** | Google Gemini API (Flash Multimodal & 1.5 Pro) |
| **Hosting & Deployment** | Frontend on **Vercel** / Backend on **Render** |

---

## 📂 Project Directory Structure

```plaintext
Campushub/
├── PRD.md                  # Comprehensive Product Requirements Document
├── ARCHITECTURE.md         # Technical architecture & communication blueprints
├── DATABASE_SCHEMA.md      # PostgreSQL DDL, ENUMs, and RLS policies
├── API_ENDPOINTS.md        # REST API specifications & request/response samples
├── TEST_PLAN.md            # Comprehensive QA Test Matrix
├── BUG_REPORT_TEMPLATE.md  # Standardized issue tracking template
├── client/                 # Next.js Futuristic Frontend
│   ├── app/                # App Router (Public routes & Private HUD portals)
│   ├── components/         # Glassmorphic UI library, HUD nav, grids
│   └── styles/             # Tailwind theme & neon glow extensions
└── server/                 # Custom Node.js & Express API Gateway
    ├── controllers/        # Attendance, AI, Posts, Notes, Clubs
    ├── middleware/         # Supabase JWT authentication & RBAC guards
    └── routes/             # Express API routes
```

---

## ⚡ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher)
- [Git](https://git-scm.com/)
- Supabase project account (for database & auth URL/anon key)
- Google Gemini API key (for Dual AI system)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/campushub.git
cd campushub
```

### 2. Configure Environment Variables

#### Frontend (`client/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (`server/.env`):
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secure-jwt-secret
```

### 3. Install Dependencies & Run

#### Frontend:
```bash
cd client
npm install
npm run dev
# Running on http://localhost:3000
```

#### Backend:
```bash
cd server
npm install
npm run dev
# Running on http://localhost:5000
```

---

## 🚢 Deployment Guide

### A. Version Control (Git & GitHub)
```bash
git init
git add .
git commit -m "feat: complete phase 0 documentation and architecture"
git branch -M main
git remote add origin https://github.com/<your-username>/campushub.git
git push -u origin main
```

### B. Frontend Deployment on Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository (`campushub`).
3. Set the **Root Directory** to `client`.
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL` (points to your Render URL)
5. Click **Deploy**. Vercel will build and assign an edge-cached production domain.

### C. Backend Deployment on Render
1. Log in to [Render](https://render.com) and create a **New Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables: `PORT`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`.
5. Deploy. Render will provide a public HTTPS URL (e.g., `https://campushub-api.onrender.com`).

---

## 📜 Documentation Index

- [PRD.md](file:///Users/ovi/Desktop/Campushub/PRD.md): Product scope, futuristic features, and roadmap.
- [ARCHITECTURE.md](file:///Users/ovi/Desktop/Campushub/ARCHITECTURE.md): System topology, security layers, and AI pipeline.
- [DATABASE_SCHEMA.md](file:///Users/ovi/Desktop/Campushub/DATABASE_SCHEMA.md): PostgreSQL tables, foreign keys, and RLS rules.
- [API_ENDPOINTS.md](file:///Users/ovi/Desktop/Campushub/API_ENDPOINTS.md): Full REST API contracts and payloads.
- [TEST_PLAN.md](file:///Users/ovi/Desktop/Campushub/TEST_PLAN.md): Complete QA verification checklist.
- [BUG_REPORT_TEMPLATE.md](file:///Users/ovi/Desktop/Campushub/BUG_REPORT_TEMPLATE.md): Quality assurance reporting format.

---

## 🛡️ License
Distributed under the **MIT License**. Engineered for the future of education.

