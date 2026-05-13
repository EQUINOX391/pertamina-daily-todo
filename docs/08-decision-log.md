# Decision Log

This document records important technical decisions made during the project.

## Decision 001: Use Documentation-First Setup

### Context

The study case evaluates not only the final application but also the development approach, documentation, architecture, clean code, and security awareness.

### Decision

Start the project by preparing repository structure, documentation, requirements, architecture plan, API contract draft, testing notes, security notes, and reflection log before writing backend or frontend implementation code.

### Reason

This helps keep the project structured, reviewable, and realistic for a professional recruitment process.

### Status

Accepted.

---

## Decision 002: Keep Scope Simple

### Context

The deadline is Friday, 15 May 2026. The required features are authentication and TODO CRUD.

### Decision

Focus only on required features:

- Register
- Login
- JWT authentication
- TODO CRUD
- User-specific TODO ownership
- Setup and API documentation

Avoid non-required features such as:

- Role-based access control
- Email verification
- Password reset
- Real-time updates
- Complex dashboard
- Deployment pipeline

### Reason

The project should be clean, complete, and realistic within the available time.

### Status

Accepted.

---

## Decision 003: Use EF Core 10 for Current Implementation

### Context

The study case mentions Entity Framework v11 if possible. The backend project currently targets .NET 10 and uses ASP.NET Core Web API.

### Decision

Use Entity Framework Core 10.x for the current implementation.

### Reason

EF Core 10 matches the current .NET 10 backend setup and keeps the project stable for the study case deadline. The project should not force a dependency version that does not match the selected SDK/runtime.

### Status

Accepted.

---

## Decision 004: Continue Backend Workflow with Visual Studio

### Context

The initial backend project was created from Git Bash, but the current workflow is continued with Visual Studio.

### Decision

Use Visual Studio as the primary backend workflow for running the API, using Package Manager Console for EF Core commands, and using the `.http` file for manual API testing.

### Reason

This workflow is realistic for ASP.NET Core development on Windows and easier to demonstrate during review.

### Status

Accepted.


## Decision: Use React with Vite for Frontend Setup

Date: 2026-05-13

### Context

The project requires a React JS frontend integrated with an ASP.NET Core Web API backend using JWT authentication.

### Decision

Use React JS with Vite for the frontend foundation.

### Reason

Vite provides a simple and fast development setup for React applications. This keeps the frontend setup realistic for the study case deadline while still being professional and maintainable.

### Consequence

The frontend project is located in:

```txt
src/frontend
```

The frontend uses:

```txt
react
react-router
axios
vite
```

The initial frontend scope is limited to:

- Project setup.
- Clean folder structure.
- Routing placeholder.
- API client foundation.
- Token storage helper.
- Protected route guard.

Full UI implementation is intentionally deferred to the next step.

## Decision: Add Frontend Authentication Integration

Date: 2026-05-13

### Context

The project requires a React frontend that integrates with the ASP.NET Core Web API authentication endpoints using JWT stateless authentication.

### Decision

Implement login and register integration in the frontend using:

```txt
React form state
Axios API wrappers
JWT token storage helper
ProtectedRoute component
Backend CORS policy
```

### Reason

This keeps the authentication flow simple, understandable, and realistic for the study case deadline.

The implementation separates responsibilities:

```txt
Pages handle user interaction.
API wrappers handle backend communication.
Token storage helper handles local token access.
Axios interceptor attaches JWT to protected requests.
ProtectedRoute handles frontend route protection.
Backend JWT middleware remains responsible for real authorization.
```

### Consequence

The frontend can now authenticate users and access protected frontend routes after login or register.

The next implementation step can focus on integrating the TODO list page with protected TODO CRUD endpoints.

## Decision: Keep TODO CRUD Frontend State Local

Date: 2026-05-13

### Context

The frontend needs to support authenticated TODO CRUD operations integrated with the ASP.NET Core Web API backend.

### Decision

Use local React component state in `TodoListPage` for TODO CRUD interaction.

### Reason

The study case scope is small and only has one main TODO page. Local state keeps the implementation simple, readable, and realistic for the deadline.

The frontend handles:

```txt
Loading state
Error state
Create form state
Edit form state
Updating item state
Deleting item state
TODO list state
```

### Consequence

No additional state management library is introduced.

This avoids overengineering while still keeping the code organized through API wrapper functions and utility files.

If the application grows, the TODO state can later be moved into custom hooks or a dedicated data-fetching layer.
