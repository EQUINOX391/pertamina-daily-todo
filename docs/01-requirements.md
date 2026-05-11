# Requirements

## Functional Requirements

### Authentication

- User can register with name, email, and password.
- User can login with email and password.
- System returns JWT token after successful login.
- Authenticated users can access TODO endpoints.
- Unauthenticated users cannot access protected TODO endpoints.

### TODO Management

Authenticated user can:

- Create a TODO item.
- View their own TODO items.
- View TODO detail.
- Update a TODO item.
- Delete a TODO item.

## Non-Functional Requirements

- Clean code structure.
- Clear separation between frontend and backend.
- Backend validation for request data.
- Frontend validation for form input.
- Centralized error handling where possible.
- Secure password hashing.
- JWT stored carefully on frontend.
- Configuration values stored outside source code.
- Documentation for setup and API usage.

## Evaluation Focus

The project should demonstrate:

- Ability to build a fullstack application architecture
- Ability to integrate frontend and backend using API
- Clean and readable code organization
- Proper validation on backend and frontend
- Error handling strategy
- Separation of concerns
- Security awareness, especially around authentication
- Clear setup and API documentation
- Professional development workflow

## Tech Requirements

### Frontend

- React JS
- Planned build tool: Vite

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- MSSQL
- JWT Bearer Authentication

## Open Decisions

| Topic | Decision | Status |
|---|---|---|
| EF Core version | Use EF v11 if available and compatible with selected .NET SDK; otherwise use latest stable compatible EF Core version | Pending |
| Frontend build tool | Prefer Vite for React project setup | Pending |
| Frontend styling | Keep simple; use plain CSS or lightweight approach | Pending |
| Token storage strategy | Need to balance simplicity and security; to be documented before frontend implementation | Pending |
| API documentation | Use Swagger/OpenAPI for backend API testing and review | Pending |
| Testing approach | Manual testing checklist first; automated testing only if time allows | Pending |
