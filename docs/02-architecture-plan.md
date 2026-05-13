# Architecture Plan

## High-Level Architecture

```txt
React Frontend
    |
    | HTTP Request with JWT Bearer Token
    v
ASP.NET Core Web API
    |
    | Entity Framework Core
    v
MSSQL Database
```

## Backend Planned Layers

```txt
Controllers
Services
Repositories / Data Access
DbContext
Entities
DTOs
```

## Frontend Planned Structure

```txt
src/
├── api/
├── components/
├── features/
│   ├── auth/
│   └── todos/
├── pages/
├── routes/
├── utils/
└── main.jsx
```

## Security Considerations

- Passwords must be hashed, not stored as plain text.
- JWT secret must not be committed to Git.
- Protected endpoints require authentication.
- User can only access their own TODO data.
- Input validation must exist on both frontend and backend.
- Error messages should not expose sensitive implementation details.

## Design Principle

Keep the project simple, readable, and realistic for a recruitment study case.

## Backend Database Foundation

The backend uses Entity Framework Core with SQL Server.

Initial database tables:

- Users
- TodoItems

Relationship:

- One User can have many TodoItems.
- Each TodoItem belongs to one User.

The database context is registered through dependency injection in `Program.cs`.

Local development database:

```text
Server=(localdb)\MSSQLLocalDB
Database=PertaminaDailyTodoDb

## Frontend Architecture Plan

The frontend is structured by responsibility to keep the project simple, clean, and maintainable.

### Folder Structure

```txt
src/frontend/src/
├── api/
├── components/
├── features/
│   ├── auth/
│   │   └── pages/
│   └── todos/
│       └── pages/
├── layouts/
├── routes/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

### Responsibility

```txt
api/          API client and endpoint wrappers
components/   Reusable shared UI or route components
features/     Feature-based page organization
layouts/      Shared page layout
routes/       Application routing configuration
utils/        Small shared utilities
```

### Routing Plan

```txt
/           Redirects to /todos
/login      Login page
/register   Register page
/todos      Protected TODO list page
```

### API Integration Plan

The frontend communicates with the ASP.NET Core Web API using Axios.

The API base URL is configured through:

```env
VITE_API_BASE_URL=http://localhost:5190/api
```

JWT authentication flow:

```txt
User logs in
Frontend receives JWT access token
Frontend stores token locally
Axios request interceptor attaches Authorization header
Protected backend endpoint validates JWT
```

### Authentication Protection

Protected frontend routes are guarded using a `ProtectedRoute` component.

For the current foundation, route protection checks whether an access token exists in local storage. Backend validation remains the source of truth for protected data access.
