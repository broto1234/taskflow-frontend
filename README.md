# TaskFlow – Frontend

TaskFlow is a task management application built with Next.js, React, TypeScript, and Tailwind CSS. It allows users to register, log in, and manage their personal tasks through a responsive dashboard.

The application helps users organize tasks, track progress, and manage their daily activities through a simple and intuitive interface.

## Live Demo

- **Live Application:** https://taskflow-satyobroto.vercel.app
- **Backend API:** https://taskflow-api-c3hg.onrender.com
- **API Documentation (Swagger):** https://taskflow-api-c3hg.onrender.com/api-docs/

## Demo Login Credentials

Use the following demo account to explore the TaskFlow dashboard.

| Field | Credentials |
|---|---|
| Email | satyo123@example.com |
| Password | password123 |

**How to access the dashboard:**

1. Open the [TaskFlow Live Application](https://taskflow-satyobroto.vercel.app).
2. Navigate to the Login page.
3. Enter the demo email and password.
4. Click **Login** to access the dashboard.
5. Explore the task management features.

## Features

- User registration and login
- JWT-based authentication
- Personal task management dashboard
- Create tasks with titles and descriptions
- View, edit, and delete tasks
- Update task status
- Search tasks by title or description
- Filter tasks by status
- User-specific task management
- Responsive user interface
- Input validation and error handling

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| REST API | Backend communication |
| JWT | Authentication |

## Screenshots

### Homepage

![TaskFlow Homepage](screenshots/homepage.png)

## Project Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── page.tsx
│   └── lib/
│       └── api.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

## Getting Started

Follow these instructions to run the frontend application locally.

### Prerequisites

- Node.js
- npm
- Running TaskFlow backend API

### 1. Clone the repository

```bash
git clone https://github.com/broto1234/taskflow-frontend.git

cd taskflow-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend root directory.

For the production backend:

```env
NEXT_PUBLIC_API_URL=https://taskflow-api-c3hg.onrender.com
```

For local backend development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This variable specifies the backend API URL used by the frontend.

### 4. Start the development server

```bash
npm run dev
```

Open your browser and navigate to:

http://localhost:3000

## Authentication

TaskFlow uses JWT-based authentication to secure user access.

- Users can register and log in using their credentials.
- After successful login, the authentication token is stored in browser session storage.
- The token is included in authenticated API requests.
- Users can manage only their own tasks.

## Backend Integration

The frontend communicates with the TaskFlow REST API for authentication and task management.

**Backend Repository:** [TaskFlow Backend API](https://github.com/broto1234/taskflow-api)

**Production API Endpoints:**

- **Base URL:** https://taskflow-api-c3hg.onrender.com
- **API Documentation:** https://taskflow-api-c3hg.onrender.com/api-docs/
- **Health Check:** https://taskflow-api-c3hg.onrender.com/health

For backend setup and configuration, refer to the backend repository.

## Architecture

For detailed information about the system architecture, production deployment, and local development environment, see: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Deployment & Infrastructure

The application uses the following technologies and hosting platforms:

| Component | Technology / Platform |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Database | PostgreSQL |
| Database Hosting (Current) | Neon |
| Database Hosting (Previous) | Render PostgreSQL |
| Caching | Redis |

**Database Infrastructure:**

- Initially used PostgreSQL hosted on Render.
- Migrated to Neon PostgreSQL to use its free-tier database hosting.
- Continued using PostgreSQL as the primary relational database.

## Author

**Satyobroto Talukder**

Full-Stack Developer [GitHub](https://github.com/broto1234) [Portfolio](https://satyobroto-portfolio.vercel.app/)