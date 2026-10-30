# Product Requirements Document (PRD) - CampusHub: The Next-Gen Futuristic Smart School Ecosystem

## 1. Project Overview & Vision
CampusHub is a centralized, futuristic, all-in-one smart school ecosystem designed to eliminate reliance on external apps or software. It handles 100% of a school's operations—from administrative, financial, and attendance management to advanced student learning, immersive virtual labs, and co-curricular club activities. The platform features a breathtaking 100-years-ahead futuristic glossy UI (Glassmorphic design) optimized to make education seamless, empowering remote and rural communities.

## 2. Tech Stack & Architecture
- **Frontend:** Next.js (React), Tailwind CSS, Lucide Icons, Framer Motion (for futuristic smooth animations & glassmorphism effects).
- **Version Control:** Git & GitHub.
- **Authentication & Security:** Supabase Auth (Role-based access: Admin, Teacher, Student, Parent, Public).
- **Cloud Storage:** Supabase Storage (for notes, assignments, school media, and report cards).
- **Database:** PostgreSQL (via Supabase) for robust relational data.
- **Custom Backend API:** Node.js & Express.js (handling attendance logs, fee processing, and AI request orchestration).
- **Deployment:** Vercel (Frontend) & Render (Backend).

## 3. UI/UX & Design System (Futuristic Glassmorphism)
- **Aesthetic:** Cyber-School Holographic / Glassmorphism. Frosted glass cards with backdrop filters (`backdrop-blur-md`), glowing borders, and soft neon accents.
- **Color Palette:** Deep Space Obsidian (`#0F172A`) base, Holographic Neon Blue (`#3B82F6`), Quantum Cyan (`#06B6D4`), and Success Emerald (`#10B981`).
- **Layout Structure:** 
  - **Public Side:** Open to all visitors (School showcase, achievements, public notice board, admissions).
  - **Private Portal:** Secured behind multi-role authentication. Features a collapsible futuristic sidebar, top HUD-style navigation bar with global search, live notification center, and profile badge.

## 4. Comprehensive Modules & Features

### Module 1: The Public Showcase & Admission Portal
- **School Showcase:** Dynamic galleries of school achievements, history, events, and media.
- **Public Notice Board:** General announcements visible to parents and visitors.
- **Admission Hub:** Online application form and status tracking for prospective students.

### Module 2: Revolutionary 1-Minute Attendance System (Solving the 20-Min Waste)
- **Teacher's 1-Tap Grid:** A sleek digital grid showing student avatars/names. Defaults to "Present"; teachers click only the absentees to log the entire class in 30 seconds.
- **Smart ID / NFC / QR Tap Simulation:** Digital entry logging system that instantly syncs attendance to the cloud and pushes automated alerts to parents.
- **Automated Analytics:** Instant daily/monthly attendance reports for administration.

### Module 3: Office & Finance Management (Digital Ledger)
- **Fee Collection:** Secure digital payment gateway integration for tuition and fees with instant automated digital receipts.
- **Financial Ledger:** Transparent tracking of school funds, salaries, and expenses for administration.

### Module 4: Dual AI System & Futuristic Learning
- **AI Study Assistant (For Students):** 
  - Generates custom summary notes for specific topics.
  - Analyzes past board questions to predict and generate high-yield exam question sets.
  - Interactive doubt-solving chatbot tailored to the school's curriculum.
- **AI Navigator / "Hey-Clicky" (For App Navigation):**
  - An interactive voice/text-based helper guiding users instantly to any page, feature, or record within the platform.
- **Adaptive Learning & Virtual Labs:** 
  - Personalized skill pathways based on student performance.
  - Immersive 3D/Virtual simulation spaces for science and practical experiments.

### Module 5: Co-Curricular Club & Branch Grouping
- **Dynamic Club Hubs:** Dedicated spaces for Science Club, Debate Club, Art Club, Programming Club, and Cultural groups where members share projects and announcements.
- **Class & Branch Grouping:** Private group spaces for specific sections (e.g., Class 10 Science Section A) for targeted teacher broadcasts and group study.

### Module 6: Secure Portal & Assessment Dashboard
- **Role-Based Dashboards:** Distinct tailored views for Students, Teachers, Parents, and Admins.
- **Gradebook & Report Cards:** Automated GPA calculation, semester grade sheets, and progress tracking with blockchain-verified digital badges.

## 5. Phased Development Roadmap
- **Phase 1:** Futuristic Glassmorphic Frontend UI (Public site + Private portal views with rich dummy data).
- **Phase 2:** Version control setup with Git & GitHub.
- **Phase 3:** Supabase Authentication & Cloud Storage.
- **Phase 4:** PostgreSQL Database schema setup (Users, Attendance, Fees, Posts, Clubs).
- **Phase 5:** Node.js & Express backend APIs (Attendance processing, GPA calculations, AI integrations).
- **Phase 6:** Automated testing and live deployment on Vercel & Render.

