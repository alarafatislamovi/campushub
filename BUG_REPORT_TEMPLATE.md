# Bug Report Template - CampusHub

---

## 1. Issue Overview

| Field | Detail |
| :--- | :--- |
| **Bug ID** | `BUG-[MODULE]-[NUMBER]` *(e.g., `BUG-ATT-001`)* |
| **Title** | *[Short, descriptive summary of the defect]* |
| **Module** | [ ] Attendance [ ] Dual AI [ ] Auth & RBAC [ ] UI/Glassmorphism [ ] Clubs [ ] Finance |
| **Severity** | [ ] **P0 - Critical** (System crash, security/RLS breach, data loss)<br>[ ] **P1 - High** (Core feature blocked, e.g., cannot mark attendance)<br>[ ] **P2 - Medium** (Minor functional glitch, UI misalignment)<br>[ ] **P3 - Low** (Cosmetic defect, animation stutter) |
| **Reporter** | *[Name / Role]* |
| **Assignee** | *[Developer Name]* |
| **Date Logged** | `YYYY-MM-DD` |
| **Status** | [ ] New [ ] Investigating [ ] Fix in Progress [ ] Ready for QA [ ] Closed |

---

## 2. Environment Details

- **Device:** [e.g., MacBook Pro M2, iPhone 14, Dell XPS 15]
- **OS:** [e.g., macOS Sonoma, Windows 11, iOS 17, Android 14]
- **Browser & Version:** [e.g., Chrome 124.0, Safari 17.2, Edge]
- **Viewport / Resolution:** [e.g., 1920x1080 (Desktop), 390x844 (Mobile)]
- **Active User Role:** [ ] Admin [ ] Teacher [ ] Student [ ] Parent [ ] Public (Unauthenticated)

---

## 3. Description & Behavior

### Observed Behavior
> *Clearly describe what is actually happening (the unexpected behavior).*

### Expected Behavior
> *Clearly describe what should happen according to the PRD and UI design specifications.*

---

## 4. Steps to Reproduce

1. Navigate to `'...'`
2. Log in with role `'...'`
3. Click on `'...'`
4. Trigger action `'...'`
5. Observe the error/behavior.

---

## 5. Error Logs & Console Traces

### Client-Side Console Errors (Browser DevTools):
```plaintext
[Paste frontend console logs or unhandled exception stack trace here]
```

### Server-Side API Logs (Express / Supabase):
```plaintext
[Paste backend server logs or database error message here]
```

---

## 6. Visual Evidence (Screenshots / Recordings)

> *Drop screenshots or GIF recordings showing the visual defect, layout clipping, or network tab failure.*

| Expected Wireframe / Mockup | Actual Defect Screenshot |
| :---: | :---: |
| *[Image Link]* | *[Image Link]* |

---

## 7. Root Cause Analysis (RCA) - *To be completed by Developer*

- **Root Cause:** *[Brief explanation of why the bug occurred]*
- **File(s) Modified:**
  - `file:///path/to/affected/file#L1-L20`
- **Fix Description:** *[Summary of code adjustments implemented]*

---

## 8. Verification & QA Sign-Off Checklist

- [ ] Defect can no longer be reproduced using the original steps.
- [ ] No regression introduced to related modules or surrounding UI.
- [ ] Tested on both Desktop and Mobile viewports.
- [ ] Signed off by QA: `[Name]` on `[Date]`

