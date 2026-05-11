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

## Decision 003: Verify EF Version During Backend Setup

### Context

The study case mentions Entity Framework v11. Compatibility depends on the selected .NET SDK and available EF Core version.

### Decision

Document EF v11 as a target if available and compatible. Final EF version will be decided during backend setup.

### Reason

Avoid forcing an incompatible dependency and keep the implementation stable.

### Status

Pending verification.
