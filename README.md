# Zenvora HRM

A full-stack Human Resource Management (HRM) system built with the MERN stack and TypeScript.

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing
- **Formik / React Hook Form + Yup** — form handling and validation
- **Lucide React** — icon library
- **Axios** — HTTP client

### Backend
- **Node.js + Express 5** with TypeScript
- **MongoDB + Mongoose** — database
- **JWT** — authentication tokens
- **bcryptjs** — password hashing
- **Passport.js** — OAuth (Google, Microsoft)
- **Nodemailer** — email sending
- **Multer** — file uploads (resumes)

## Project Structure

```
zenvora-hrm/
├── frontend/                  # React app
│   └── src/
│       ├── components/        # Shared UI components
│       ├── context/           # React context (theme, auth, etc.)
│       ├── features/
│       │   ├── dashboard/     # HR admin dashboard pages
│       │   │   ├── DashboardPage.tsx
│       │   │   ├── CandidatesPage.tsx
│       │   │   ├── InterviewsPage.tsx
│       │   │   ├── AttendancePage.tsx
│       │   │   ├── FollowUpPage.tsx
│       │   │   ├── ResultsReviewPage.tsx
│       │   │   ├── RiskAnalysisPage.tsx
│       │   │   ├── ProfilePage.tsx
│       │   │   └── jobs/
│       │   └── candidateDashboard/  # Candidate-facing portal
│       │       ├── CandidateDashboardPage.tsx
│       │       ├── JobsPage.tsx
│       │       ├── JobDetailPage.tsx
│       │       └── JobApplicationForm.tsx
│       ├── pages/auth/        # Auth pages (login, register, reset)
│       └── styles/            # Theme configuration
└── backend/                   # Express API
    └── src/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── services/
        ├── types/
        ├── utils/
        └── server.ts
```

## Features

- **Role-based access** — separate dashboards for HR admins and candidates
- **Authentication** — JWT-based auth with Google and Microsoft OAuth
- **Candidate management** — track candidates through the hiring pipeline
- **Job postings** — create and manage job listings
- **Interviews** — schedule and review interviews
- **Follow-ups** — manage follow-up communications
- **Risk analysis** — candidate risk assessment
- **Attendance tracking**
- **Resume uploads** — file upload support via Multer
- **Email notifications** — via Nodemailer
- **Dark/light theme** — theme switching support

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

### Build for Production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build
```

## Scripts

| Location | Command | Description |
|---|---|---|
| frontend | `npm run dev` | Start Vite dev server |
| frontend | `npm run build` | Type-check and build |
| frontend | `npm run lint` | Run ESLint |
| backend | `npm run dev` | Start with ts-node-dev (hot reload) |
| backend | `npm run build` | Compile TypeScript |
| backend | `npm start` | Run compiled output |
