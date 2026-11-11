# TaskFlow – Frontend

TaskFlow is a task management application built with Next.js, React, TypeScript, and Tailwind CSS. It allows users to register, log in, and manage their personal tasks through a responsive dashboard.

## Features

- User registration and login
- JWT-based authentication
- Create tasks with titles and descriptions
- View and manage tasks
- Edit and delete tasks
- Update task status
- Search tasks by title or description
- Filter tasks by status
- Responsive user interface

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- REST API
- JWT Authentication

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

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_API_URL=https://taskflow-api-c3hg.onrender.com
```

This variable specifies the backend API URL.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend

The frontend communicates with the TaskFlow REST API.

- **Production API:** https://taskflow-api-c3hg.onrender.com
- **API Documentation:** https://taskflow-api-c3hg.onrender.com/api-docs/
- **Health Check:** https://taskflow-api-c3hg.onrender.com/health

## Authentication

TaskFlow uses JWT-based authentication. After successful login, the authentication token is stored in the browser's session storage and used for authenticated API requests.

## Author

**Satyobroto Talukder**  
Full-Stack Developer