
# TaskFlow – System Architecture

## Production Architecture

```mermaid
flowchart TD
    User([User / Browser])

    subgraph Frontend["Frontend – Vercel"]
        UI["Next.js + React + TypeScript"]
    end

    subgraph Backend["Backend – Render"]
        API["Node.js + Express + TypeScript"]
        AUTH["JWT Authentication"]
    end

    subgraph Database["Database – Neon"]
        DB[("PostgreSQL")]
    end

    User --> UI
    UI -->|"HTTPS API Requests"| API
    API --> AUTH
    API --> DB
```

## Local Development Environment

```mermaid
flowchart TD
    DEV["Developer – Windows PC"]
    VSCODE["VS Code"]
    BACKEND["TaskFlow Backend"]
    DOCKER["Docker Desktop"]
    REDIS["Redis Container"]

    DEV --> VSCODE
    VSCODE --> BACKEND
    VSCODE --> DOCKER
    DOCKER --> REDIS
    BACKEND <-->|"Local Cache Connection"| REDIS
```

## Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL (Neon)
- Caching: Redis
- Authentication: JWT
- Frontend Hosting: Vercel
- Backend Hosting: Render
- Local Containerization: Docker Desktop
- API Documentation: Swagger
