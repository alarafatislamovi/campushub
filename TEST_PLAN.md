# Quality Assurance Test Plan (QATP) - CampusHub
## The Next-Gen Futuristic Smart School Ecosystem

---

## 1. Overview & Objectives

This document establishes the test scope, testing methodology, and detailed test cases for validating **CampusHub**. The primary objective is to verify visual perfection (100-years-ahead futuristic glassmorphism), sub-second responsiveness (1-minute attendance logging), robust multi-role security (RBAC & RLS), and intelligent AI prompt generation.

---

## 2. Test Scope & Environments

### Target Platforms
- **Browsers:** Google Chrome (Latest), Mozilla Firefox, Apple Safari, Microsoft Edge.
- **Mobile Viewports:** Responsive test down to 375px (iPhone SE, Pixel 7, iPad Air, 4K Ultrawide).
- **Backend Runtime:** Node.js v18 LTS on Render.
- **Database:** Supabase PostgreSQL with active Row Level Security.

---

## 3. Comprehensive Test Cases

### 3.1. Futuristic Glassmorphic UI & Visual Experience

| Test ID | Test Scenario | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-UI-01** | Glassmorphic Cards Rendering | 1. Open Landing & HUD Portal.<br>2. Inspect CSS styling of cards. | Cards render with frosted glass backdrop blur (`backdrop-blur-md`), glowing borders, and `#0F172A` deep space background. | Ready |
| **TC-UI-02** | Neon Glow & Hover Transitions | 1. Hover over action buttons & cards.<br>2. Inspect Framer Motion animations. | Subtle cyan/neon-blue glow pulse activates smoothly with zero layout shift (CLS < 0.05). | Ready |
| **TC-UI-03** | Mobile HUD Responsiveness | 1. Resize browser window to mobile view (390px).<br>2. Toggle collapsible HUD sidebar. | Sidebar slides in smoothly with frosted glass overlay; HUD icons remain accessible without clipping. | Ready |

---

### 3.2. Role-Based Authentication & Access Control (RBAC)

| Test ID | Test Scenario | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Student Login & Portal Routing | 1. Login with student credentials.<br>2. Attempt to navigate to `/admin/ledger`. | Successfully logs in; lands on Student Learning HUD; `/admin/ledger` is blocked with 403 Forbidden. | Ready |
| **TC-AUTH-02** | Teacher Portal Verification | 1. Login with teacher credentials.<br>2. Open Attendance Hub. | Teacher sees class roster grid with 1-tap toggle capabilities. | Ready |
| **TC-AUTH-03** | Public Route Protection | 1. Logout completely.<br>2. Direct navigate to `/portal/dashboard`. | User is redirected to `/login` with an informative toast notification. | Ready |
| **TC-AUTH-04** | Parent Dashboard Binding | 1. Login as Parent.<br>2. Open student progress tab. | Displays only the linked child's attendance records, fee status, and report cards. | Ready |

---

### 3.3. Revolutionary 1-Minute Attendance System

| Test ID | Test Scenario | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-ATT-01** | Default 'Present' Grid | 1. Teacher opens Class 10 attendance view for today. | All student avatars/cards display in glowing green "Present" state by default. | Ready |
| **TC-ATT-02** | 1-Tap Absentee Marking | 1. Tap 3 student cards to mark Absent.<br>2. Click "Confirm Class Log". | Tapped cards flip to glowing amber/red "Absent"; API logs bulk payload in < 500ms. | Ready |
| **TC-ATT-03** | Parent Alert Simulation | 1. Submit attendance with absent students.<br>2. Verify backend event log. | Automated notification trigger fires for parents of absent students. | Ready |
| **TC-ATT-04** | Duplicate Entry Prevention | 1. Try submitting attendance twice for the same student on the same date. | Backend rejects duplicate via PostgreSQL `UNIQUE (student_id, date)` constraint with clear notice. | Ready |

---

### 3.4. Dual AI System (Study Assistant & Hey-Clicky)

| Test ID | Test Scenario | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AI-01** | AI Study Notes Generation | 1. Navigate to AI Study Assistant.<br>2. Input "Organic Chemistry: Carbonyls".<br>3. Click "Generate Revision Note". | System invokes Gemini endpoint and streams structured summary notes, key formulas, and concepts. | Ready |
| **TC-AI-02** | Board Exam Question Predictor | 1. Select "Physics Class 10" and click "Predict High-Yield Questions". | Returns 3 predicted board exam questions with probability ratings and answer outlines. | Ready |
| **TC-AI-03** | Hey-Clicky Voice/Text Omni-Search | 1. Press `Cmd+K` or say *"Take me to Science Club"*. | Hey-Clicky interprets intent and navigates directly to `/clubs/science` with a HUD highlight pulse. | Ready |

---

### 3.5. Co-Curricular Club Hubs & Community Feed

| Test ID | Test Scenario | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-CLUB-01** | Browse Club Directory | 1. Open `/clubs`. | Displays Robotics, Science, Debate, Art, and Coding club cards with active member counters. | Ready |
| **TC-CLUB-02** | Join Club & Badge Issuance | 1. Student clicks "Join Quantum Robotics Club". | Endpoint responds with 200 OK; HUD immediately displays the newly minted digital club badge. | Ready |
| **TC-FEED-01** | Community Social Feed Post | 1. Submit a post with `#Physics` tag.<br>2. Verify social feed. | Post appears instantly at top of feed with correct author avatar and zero reload. | Ready |
| **TC-FEED-02** | Like Post Atomic Counter | 1. Click like button on a post. | Like count increases by +1 with neon heart animation; re-clicking toggles it off. | Ready |

---

## 4. Test Execution & Reporting Protocol

- **Pass Criteria:** Feature fulfills 100% of functional requirements with no console errors and response latency under 1.5s.
- **Fail Criteria:** Any security bypass (RLS failure), broken UI layout on mobile viewports, or unhandled 500 server crashes.
- Any defect detected must be logged using the standardized format defined in [BUG_REPORT_TEMPLATE.md](file:///Users/ovi/Desktop/Campushub/BUG_REPORT_TEMPLATE.md).

