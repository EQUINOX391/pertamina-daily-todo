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
```

## Frontend Architecture Plan

The frontend is structured by responsibility to keep the project simple, clean, and maintainable.

### Folder Structure

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

## Frontend Authentication Flow

The frontend authentication flow uses JWT access tokens returned by the backend authentication endpoints.

### Login Flow

```txt
User submits login form
Frontend validates required fields
Frontend sends POST /api/auth/login
Backend validates credentials
Backend returns JWT token and user data
Frontend stores JWT token in localStorage
Frontend redirects user to /todos
```

### Register Flow

```txt
User submits register form
Frontend validates full name, email, and password
Frontend sends POST /api/auth/register
Backend creates user account
Backend returns JWT token and user data
Frontend stores JWT token in localStorage
Frontend redirects user to /todos
```

### Protected Route Flow

```txt
User opens /todos
ProtectedRoute checks whether access token exists
If token exists, TODO page is shown
If token does not exist, user is redirected to /login
```

### API Request Flow

```txt
Frontend calls API wrapper function
Axios HTTP client reads token from token storage
Axios interceptor attaches Authorization header
Backend validates JWT token
Backend returns protected resource
```

### Security Awareness

The current implementation stores JWT in localStorage for simplicity and study case practicality.

This approach is easy to implement, but it has security trade-offs because localStorage can be accessed by JavaScript running in the browser. For a production system, additional protections such as stronger XSS prevention, short token lifetime, refresh token strategy, or HttpOnly cookie-based authentication should be considered.

The backend remains the source of truth for protected data access.

## Frontend TODO CRUD Flow

The TODO list page integrates with protected backend TODO endpoints.

### Data Loading Flow

```txt
User opens /todos
ProtectedRoute checks token existence
TodoListPage calls getTodos()
Axios interceptor attaches JWT token
Backend validates JWT token
Backend returns TODO items owned by authenticated user
Frontend renders TODO list, empty state, loading state, or error state
```

### Create TODO Flow

```txt
User fills create TODO form
Frontend validates title and description
Frontend sends POST /api/todos
Backend validates JWT token and request body
Backend creates TODO owned by authenticated user
Frontend reloads TODO list
```

### Update Status Flow

```txt
User clicks Mark as Completed or Mark as Pending
Frontend sends PUT /api/todos/{id}
Frontend includes existing title, description, due date, and updated isCompleted value
Backend validates ownership and updates TODO
Frontend updates the item in local state
```

### Edit TODO Flow

```txt
User clicks Edit
Frontend shows inline edit form for selected TODO
User updates title, description, or due date
Frontend validates input
Frontend sends PUT /api/todos/{id}
Backend validates ownership and updates TODO
Frontend replaces the updated item in local state
```

### Delete TODO Flow

```txt
User clicks Delete
Browser confirmation is shown
If confirmed, frontend sends DELETE /api/todos/{id}
Backend validates ownership and deletes TODO
Frontend removes the deleted item from local state
```

### Frontend State Strategy

The current implementation uses React local component state.

This is acceptable for the study case scope because:

```txt
The app is small.
The data flow is easy to understand.
The deadline is limited.
No global state management is needed yet.
```

A larger production application could consider a dedicated data-fetching or state management library.
