# Blood Centre Management System

## Project Information

**Project Name:** Blood Centre Management System

**Frontend Developer:** Prasad Meragala

**Frontend Tech Stack**

- React.js (Vite)
- Material UI (MUI)
- React Router DOM
- Axios
- TanStack Query (React Query)
- React Hook Form
- Zod
- React Toastify
- Day.js

**Backend Tech Stack**

- Node.js
- Express.js
- PostgreSQL

---

# User Roles

## 1. Frontdesk

Responsible for:

```text
Frontdesk
├── Patient Requisition
├── Patient List
└── Billing & Receipt

### Frontdesk

frontdesk/
│
├── api/
├── components/
├── hooks/
├── pages/
│   ├── PatientRequisition.jsx
│   ├── PatientList.jsx
│   └── BillingReceipt.jsx
├── schemas/
├── utils/
└── constants/
```
```

Description:

- Register patient details
- Create blood requisition
- View patient list
- Generate bill
- Print invoice

---

## 2. Lab

Workflow:

```text
Lab
├── Lab Queue
├── Blood Grouping
├── Donor Details
├── Cross Matching
├── Label Generation
└── Compatibility Report
```

Description:

- Receive patient request
- Perform blood grouping
- Perform infection screening
- Perform cross matching
- Generate labels
- Generate compatibility report

---

## 3. Admin

Responsible for:

```text
Admin
└── Dashboard
```

Description:

- View system statistics
- Manage overall application

# Project Goals

- Clean Architecture
- Reusable Components
- Responsive UI
- Professional Codebase
- Feature-Based Folder Structure
- Production Ready

---

# Current Status

Project Initialized

# Application Flow

```text
                Login
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Role Validation      Authentication
        │
        ▼
────────────────────────────────────────────

Frontdesk

Patient Requisition
        │
        ▼
Patient List
        │
        ▼
Billing & Receipt
        │
        ▼
Lab Queue
        │
        ▼
Blood Grouping
        │
        ▼
Donor Details
        │
        ▼
Cross Matching
        │
        ▼
Label Generation
        │
        ▼
Compatibility Report

────────────────────────────────────────────

Admin

Dashboard
```
