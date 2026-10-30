# Technical Architecture Document (TAD) - CampusHub
## The Next-Gen Futuristic Smart School Ecosystem

---

## 1. High-Level Architecture Overview

CampusHub adopts a modern decoupled hybrid-cloud architecture engineered for high speed, low latency, and infinite scalability. It bridges a high-performance Next.js client tier, a custom Node.js/Express orchestration backend, and a cloud-native Supabase infrastructure (PostgreSQL, Auth, Storage, and Realtime Engine).

```mermaid
flowchart TD
    subgraph ClientTier["Client Tier (Vercel Edge Network)"]
        A["Public Portal (SSR / SSG)"]
        B["Private HUD Portal (SPA / PWA)"]
        C["Hey-Clicky AI Navigator Interface"]
        D["1-Tap Smart Attendance Grid"]
    end

    subgraph APITier["Custom API & Orchestration Tier (Render)"]
        E["Express.js Gateway & Router"]
        F["Attendance & Batch Logging Engine"]
        G["Financial Ledger & Payment Service"]
        H["Dual AI Orchestrator & RAG Engine"]
        I["Analytics & Report Card Generator"]
    end

    subgraph DataTier["Data & Cloud Layer (Supabase / PostgreSQL)"]
        J["Supabase Auth (JWT & Roles)"]
        K["PostgreSQL with Row Level Security (RLS)"]
        L["Supabase Storage (Buckets: notes, media, cards)"]
        M["Supabase Realtime (WebSockets)"]
    end

    subgraph ExternalServices["External Intelligence & Payment Providers"]
        N["Google Gemini / LLM Engine"]
        O["Digital Payment Gateways (Stripe / Local MFS)"]
        P["Automated Push/SMS Notification Service"]
    end

    %% Connections
    ClientTier -->|"Direct Queries with RLS & Supabase Auth JWT"| J
    ClientTier -->|"Direct Realtime Subscriptions"| M
    ClientTier -->|"Asset Uploads / Downloads (Signed URLs)"| L
    ClientTier -->|"REST / WebSocket Actions (Attendance, AI, Fees)"| E

    E -->|"Privileged DB Access (Service Key)"| K
    E -->|"Storage Management"| L
    E -->|"Prompt & Context Pipeline"| N
    E -->|"Payment Transactions"| O
    E -->|"Instant Parent Alerts"| P
```

### Core Architecture Components
1. **Frontend Client (Next.js & Framer Motion on Vercel):**
   - Serves the cyber-school glassmorphic UI (`backdrop-blur-md`, glowing HUD counters, neon accents).
   - Direct read capabilities from Supabase using Row-Level Security (RLS) for ultra-fast, cached responses.
   - Reactive global state for notifications, user sessions, and "Hey-Clicky" voice/text overlay.

2. **Backend API Service (Node.js & Express on Render):**
   - Handles multi-record transactions (e.g., 1-minute attendance bulk submission, financial audit logs).
   - Manages secret API keys, prompt construction, and context injection for the Dual AI System.
   - Calculates dynamic GPA sheets, generates automated certificates, and handles payment webhooks.

3. **Database & Storage Core (Supabase / PostgreSQL):**
   - Fully relational schema with foreign key constraints, indexes, and automated audit triggers.
   - Integrated Row-Level Security ensuring strict multi-tenant and role-level isolation.
   - Scalable bucket storage for student documents, assignments, club projects, and school galleries.

---

## 2. Communication Flow Between Subsystems

CampusHub employs a **Dual-Path Communication Model** to maximize performance while securing business logic:

1. **Path A (Direct Edge Data Path):** For high-frequency, read-heavy operations (e.g., loading notice boards, browsing student profiles, fetching personal grades), the Next.js client connects directly to Supabase via `@supabase/supabase-js` leveraging RLS.
2. **Path B (Orchestrated Backend Path):** For high-integrity workflows, bulk actions, and external integrations (e.g., AI inference, fee collection, bulk attendance verification), the client routes requests through the Express API.

### Typical Sequence: 1-Minute Bulk Attendance Logging

```mermaid
sequenceDiagram
    autonumber
    actor Teacher as Teacher
    participant NextClient as Next.js Client (HUD Grid)
    participant ExpressAPI as Express Backend (Render)
    participant SupabaseDB as Supabase PostgreSQL
    participant AlertService as SMS / Notification Gateway
    actor Parent as Parent Mobile / Portal

    Teacher->>NextClient: Opens 1-Tap Attendance (All default to Present)
    Teacher->>NextClient: Taps 3 absent students & clicks "Confirm Log"
    NextClient->>ExpressAPI: POST /api/v1/attendance/bulk-log (JWT + Payload)
    Note over ExpressAPI: Validates Teacher session & Class permissions
    ExpressAPI->>SupabaseDB: Batch INSERT/UPDATE attendance_records (Single Transaction)
    SupabaseDB-->>ExpressAPI: Success Confirmation
    ExpressAPI->>AlertService: Trigger instant absence push notifications
    AlertService-->>Parent: "Notice: Student absent today at 08:30 AM"
    ExpressAPI-->>NextClient: 200 OK (Sync time: < 450ms)
    NextClient-->>Teacher: Futuristic Neon Success Pulse & Audio chime
```

---

## 3. Security Layers & Role-Based Access Control (RBAC)

Security is implemented using defense-in-depth across the client, API gateway, and database layers.

```mermaid
flowchart LR
    Request["Incoming Request"] --> L1["Layer 1: Edge Firewall & HTTPS"]
    L1 --> L2["Layer 2: Supabase Auth JWT Verification"]
    L2 --> L3["Layer 3: Express Role-Guard Middleware"]
    L3 --> L4["Layer 4: PostgreSQL Row Level Security (RLS)"]
    L4 --> Data["Protected Resource / Data"]
```

### Role Matrix

| Role | Access Scope | Accessible Areas | Key Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | Full Campus Ecosystem | All Modules & System Settings | Full CRUD on users, fee ledger, curriculum, logs, and global notices. |
| **Teacher** | Assigned Classes & Clubs | 1-Tap Attendance, Gradebook, Club Management, AI Study Hub | Log attendance, issue grades, create study material, broadcast announcements. |
| **Student** | Personal Data & Learning Hubs | Virtual Labs, Dual AI Assistant, Gradebook, Club Hubs | Access notes, ask AI doubts, view personal progress, submit club projects. |
| **Parent** | Linked Student Data | Child's Attendance, Report Cards, Fee Payment, School Notices | View child's stats, pay tuition digitally, view attendance trends. |
| **Public** | Unauthenticated Public Scope | School Showcase, Public Notice Board, Admission Hub | View galleries, read public news, submit student admission applications. |

### PostgreSQL Row-Level Security (RLS) Rules Strategy
- `attendance_records`: Students and parents can only `SELECT` records where `student_id = auth.uid()` or linked parent relationship. Teachers can `INSERT/UPDATE` only for their allocated `class_section_id`.
- `financial_ledger`: Strictly accessible to users with `role = 'admin'` via service keys.
- `clubs`: Public view for registered students, write permissions restricted to assigned club moderators/teachers.

---

## 4. Dual AI System Integration Architecture

CampusHub embeds two specialized AI engines designed for distinct cognitive roles:

```mermaid
flowchart TD
    subgraph Client["Next.js Client"]
        SA_UI["AI Study Assistant Widget / Modal"]
        NAV_UI["Hey-Clicky Voice & Command HUD"]
    end

    subgraph BackendAPI["Node.js / Express AI Orchestrator"]
        Router["/api/v1/ai Router"]
        Sanitizer["Prompt Sanitizer & Token Limiter"]
        ContextRetriever["Curriculum Context / Vector Retriever"]
        RouteMap["App Navigation Schema Map"]
    end

    subgraph LLM["AI Model Engine (Gemini API)"]
        GeminiModel["Gemini 1.5 / Flash Multimodal"]
    end

    %% AI Study Assistant Flow
    SA_UI -->|"POST /api/v1/ai/study-assistant (Query, Subject, ClassLevel)"| Router
    Router --> Sanitizer
    Sanitizer --> ContextRetriever
    ContextRetriever -->|"Augmented Prompt with Past Questions & Syllabus"| GeminiModel
    GeminiModel -->|"Streaming Markdown Notes / Solution"| SA_UI

    %% Hey-Clicky Navigator Flow
    NAV_UI -->|"POST /api/v1/ai/navigator (Speech-to-Text / Command)"| Router
    Router --> RouteMap
    RouteMap -->|"Intent Analysis & Route Matching"| GeminiModel
    GeminiModel -->|"JSON Action Payload: { targetRoute, action, parameters }"| NAV_UI
    NAV_UI -->|"Client Router triggers instant page transition & highlight"| Client
```

### 1. AI Study Assistant (For Students & Teachers)
- **Functions:**
  1. Generates concise summary revision sheets for complex curriculum concepts.
  2. Analyzes past board questions and textbook sections to generate high-yield mock tests.
  3. Context-aware doubt clearing chatbot tuned specifically to national and school-specific curricula.
- **Protocol:** Server-Sent Events (SSE) for real-time word-by-word streaming to the glassmorphic terminal interface.

### 2. AI Navigator / "Hey-Clicky" (For Whole-App Voice & Text Navigation)
- **Functions:**
  1. Voice and text-commanded omni-search (e.g., *"Take me to Class 10 Physics attendance"*, *"Pay pending tuition fees"*).
  2. Converts natural language inputs into precise application actions using structured JSON output.
  3. Interacts with Next.js router and deep-links directly into target records, tables, or modals with subtle glowing highlights.

---

## 5. Deployment Topology & Environments

- **Frontend Platform:** Hosted on **Vercel** with automatic global CDN edge caching, optimized for Next.js Server Components and dynamic Framer Motion bundles.
- **Backend Platform:** Deployed on **Render** (Node.js runtime environment) with environment-variable-backed secret isolation, automated health checks, and autoscaling.
- **Database & Storage:** Managed **Supabase** instance (PostgreSQL 15+) hosted with automatic daily backups, connection pooling (PgBouncer), and geo-distributed S3-compatible asset storage.

