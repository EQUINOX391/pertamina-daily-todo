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
