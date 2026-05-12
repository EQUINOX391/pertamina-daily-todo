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
