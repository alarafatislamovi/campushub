# REST API Specifications - CampusHub
## Custom Node.js & Express Backend Gateway

This document provides the technical specification for all primary REST API endpoints powering CampusHub. All endpoints (unless noted as Public) require a valid Bearer JWT token issued by Supabase Auth / Express Auth Gateway.

---

## Global Standards

- **Base URL:** `https://api.campushub.school/api` (Production) / `http://localhost:5000/api` (Local Dev)
- **Standard Request Header:**
  ```http
  Authorization: Bearer <JWT_ACCESS_TOKEN>
  Content-Type: application/json
  Accept: application/json
  ```
- **Standard Error Response Format:**
  ```json
  {
    "success": false,
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "The requested resource could not be found."
    },
    "timestamp": "2026-10-29T13:40:00Z"
  }
  ```

---

## 1. Authentication APIs

### 1.1. User Login
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Description:** Authenticates a user with email and password, returning session tokens and user role profile.

#### Request Body
```json
{
  "email": "teacher.smith@campushub.school",
  "password": "QuantumPassword@2026"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "e9b20755-9a84-469b-862d-9473b185b91a",
      "name": "Prof. Marcus Vance",
      "email": "teacher.smith@campushub.school",
      "role": "teacher",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

---

### 1.2. User Registration
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public / Admin
- **Description:** Creates a new user record in Supabase Auth and mirrors it to the `users` table.

#### Request Body
```json
{
  "name": "Aria Stark",
  "email": "aria.stark@student.campushub.school",
  "password": "SecureStudentPass#2026",
  "role": "student"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Aria Stark",
      "email": "aria.stark@student.campushub.school",
      "role": "student",
      "avatar": null,
      "created_at": "2026-10-29T13:42:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2. Attendance APIs

### 2.1. Mark Attendance (Single or Batch 1-Tap)
- **Endpoint:** `POST /api/attendance/mark`
- **Access:** Protected (`teacher`, `admin`)
- **Description:** Records attendance status for one or multiple students. Defaults to present; teachers send absent/late entries to complete class logs in 30 seconds.

#### Request Body (Batch Support)
```json
{
  "date": "2026-10-29",
  "records": [
    {
      "student_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "status": "absent"
    },
    {
      "student_id": "8c6b65f3-5c02-4fc9-b690-e8838b02e5b7",
      "status": "late"
    }
  ]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Attendance successfully logged for 2 students. Parent alerts dispatched.",
  "data": {
    "date": "2026-10-29",
    "updated_count": 2,
    "marked_by": "e9b20755-9a84-469b-862d-9473b185b91a"
  }
}
```

---

### 2.2. Get Student Attendance History
- **Endpoint:** `GET /api/attendance/student/:id`
- **Access:** Protected (`student` [own record], `parent` [own child], `teacher`, `admin`)
- **Description:** Retrieves all attendance logs, overall attendance percentage, and monthly trends for a specific student.

#### Query Parameters
- `month` (optional, e.g., `10`)
- `year` (optional, e.g., `2026`)

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "student_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "summary": {
      "total_days": 24,
      "present_days": 22,
      "absent_days": 1,
      "late_days": 1,
      "attendance_percentage": 91.67
    },
    "logs": [
      {
        "id": "b182cb80-5a3d-4cbf-a110-388f8303f292",
        "date": "2026-10-29",
        "status": "present",
        "marked_by_name": "Prof. Marcus Vance"
      }
    ]
  }
}
```

---

## 3. Social Feed APIs

### 3.1. Get Community Posts
- **Endpoint:** `GET /api/posts`
- **Access:** Protected (`authenticated`)
- **Description:** Returns paginated social feed posts with author profiles and subject tags.

#### Query Parameters
- `page` (optional, default `1`)
- `limit` (optional, default `20`)
- `tag` (optional, e.g., `Physics`, `Robotics`, `Debate`)

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "7fa12bf1-912a-4dfa-8f78-2d08a5c104e1",
        "content": "Just calibrated the Quantum Physics simulation lab for Class 10! Check out our resonance experiment findings.",
        "subject_tag": "Physics",
        "likes_count": 42,
        "created_at": "2026-10-29T10:15:00Z",
        "author": {
          "id": "e9b20755-9a84-469b-862d-9473b185b91a",
          "name": "Prof. Marcus Vance",
          "role": "teacher",
          "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 95
    }
  }
}
```

---

### 3.2. Create Post
- **Endpoint:** `POST /api/posts`
- **Access:** Protected (`authenticated`)
- **Description:** Publishes a new update or discussion topic to the CampusHub social wall.

#### Request Body
```json
{
  "content": "Excited for today's Inter-School Robotics Showcase at the Holo-Dome!",
  "subject_tag": "Robotics"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "18cbe22b-3c3b-48cf-9486-0428d0eeef91",
    "content": "Excited for today's Inter-School Robotics Showcase at the Holo-Dome!",
    "subject_tag": "Robotics",
    "likes_count": 0,
    "author_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "created_at": "2026-10-29T13:45:00Z"
  }
}
```

---

### 3.3. Like a Post
- **Endpoint:** `POST /api/posts/:id/like`
- **Access:** Protected (`authenticated`)
- **Description:** Toggles a futuristic like on a post, atomically incrementing or decrementing the likes counter.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "post_id": "18cbe22b-3c3b-48cf-9486-0428d0eeef91",
    "likes_count": 43,
    "user_liked": true
  }
}
```

---

## 4. Study Notes APIs

### 4.1. Get Study Notes
- **Endpoint:** `GET /api/notes`
- **Access:** Protected (`authenticated`)
- **Description:** Fetches study notes and curriculum revision sheets with optional subject filtering.

#### Query Parameters
- `subject` (optional, e.g., `Mathematics`, `Biology`, `Computer Science`)
- `search` (optional keyword search in title)

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "22d19b78-4389-42b7-a3cf-e5cfa8ff1290",
      "title": "Quantum Mechanics & Superposition Summary Guide",
      "subject": "Physics",
      "file_url": "https://storage.campushub.school/notes/quantum-mechanics-v2.pdf",
      "uploaded_by": {
        "id": "e9b20755-9a84-469b-862d-9473b185b91a",
        "name": "Prof. Marcus Vance"
      },
      "created_at": "2026-10-28T14:00:00Z"
    }
  ]
}
```

---

### 4.2. Upload Study Note
- **Endpoint:** `POST /api/notes/upload`
- **Access:** Protected (`teacher`, `admin`)
- **Description:** Saves study material metadata and links the file stored in Supabase Storage.

#### Request Body
```json
{
  "title": "Cellular Respiration & Bioenergetics Visual Mindmap",
  "subject": "Biology",
  "file_url": "https://storage.campushub.school/notes/bioenergetics-mindmap.pdf"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "67b9c9f2-2309-43a9-a93c-238d9bb098ff",
    "title": "Cellular Respiration & Bioenergetics Visual Mindmap",
    "subject": "Biology",
    "file_url": "https://storage.campushub.school/notes/bioenergetics-mindmap.pdf",
    "uploaded_by": "e9b20755-9a84-469b-862d-9473b185b91a",
    "created_at": "2026-10-29T13:48:00Z"
  }
}
```

---

## 5. AI Study Assistant APIs

### 5.1. Generate AI Summary Notes
- **Endpoint:** `POST /api/ai/generate-notes`
- **Access:** Protected (`student`, `teacher`)
- **Description:** Invokes the Gemini LLM engine with curriculum-grounded prompts to generate structured summary notes, key formulas, and flashcards.

#### Request Body
```json
{
  "subject": "Chemistry",
  "topic": "Electrochemical Cells & Nernst Equation",
  "depth": "exam-ready-summary"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "topic": "Electrochemical Cells & Nernst Equation",
    "subject": "Chemistry",
    "summary": "### Core Principles\nAn electrochemical cell converts chemical energy into electrical energy...\n\n### The Nernst Equation\n$$E = E^0 - \\frac{RT}{nF} \\ln Q$$\n\n### Key Board Takeaways\n1. At 298 K, simplified form: $E = E^0 - \\frac{0.0591}{n} \\log_{10} Q$\n2. Equilibrium constant calculation where $E = 0$.",
    "key_takeaways": [
      "Galvanic vs Electrolytic cell conventions",
      "Standard electrode potential baseline (SHE)",
      "Concentration dependence of electromotive force"
    ],
    "generated_at": "2026-10-29T13:50:00Z"
  }
}
```

---

### 5.2. Predict Board & Exam Questions
- **Endpoint:** `POST /api/ai/predict-questions`
- **Access:** Protected (`student`, `teacher`)
- **Description:** Analyzes past curriculum question patterns and generates high-probability mock exam questions with solution blueprints.

#### Request Body
```json
{
  "subject": "Physics",
  "grade_level": "Class 10",
  "question_count": 3
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "subject": "Physics",
    "grade_level": "Class 10",
    "predictions": [
      {
        "id": 1,
        "question": "Derive the mirror formula for a concave mirror with a real image and calculate the magnification factor.",
        "difficulty": "Hard",
        "predicted_probability": "94%",
        "sample_answer_outline": "1. Ray diagram setup with object beyond C. 2. Similar triangles ratio. 3. Sign convention application."
      },
      {
        "id": 2,
        "question": "Explain Fleming's Left-Hand Rule and its direct application in an electric motor.",
        "difficulty": "Medium",
        "predicted_probability": "88%",
        "sample_answer_outline": "Thumb = Force, Forefinger = Magnetic Field, Center finger = Current direction."
      }
    ]
  }
}
```

---

## 6. Club APIs

### 6.1. Get All Clubs
- **Endpoint:** `GET /api/clubs`
- **Access:** Protected (`authenticated`)
- **Description:** Lists all active school clubs, descriptions, member counts, and faculty leads.

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "a0000000-0000-0000-0000-000000000001",
      "name": "Quantum Robotics & AI Club",
      "description": "Exploring cybernetics, machine learning, and autonomous drone navigation.",
      "member_count": 86,
      "lead_teacher": {
        "id": "e9b20755-9a84-469b-862d-9473b185b91a",
        "name": "Prof. Marcus Vance"
      }
    },
    {
      "id": "a0000000-0000-0000-0000-000000000002",
      "name": "Astrophysics & Science Society",
      "description": "Space exploration simulations, stargazing events, and quantum physics labs.",
      "member_count": 64,
      "lead_teacher": {
        "id": "c119283a-4428-4e12-b918-725381aa0123",
        "name": "Dr. Sarah Connor"
      }
    }
  ]
}
```

---

### 6.2. Join a Club
- **Endpoint:** `POST /api/clubs/join`
- **Access:** Protected (`student`)
- **Description:** Registers the authenticated student into the selected club branch.

#### Request Body
```json
{
  "club_id": "a0000000-0000-0000-0000-000000000001"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Welcome to Quantum Robotics & AI Club! Your membership badge is now active on your HUD.",
  "data": {
    "club_id": "a0000000-0000-0000-0000-000000000001",
    "student_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "joined_at": "2026-10-29T13:52:00Z"
  }
}
```

