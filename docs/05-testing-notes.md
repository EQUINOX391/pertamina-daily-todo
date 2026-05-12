# Testing Notes

## Manual Testing Checklist

### Authentication

- [x] Register with valid data
- [x] Login with valid credentials
- [x] Register with duplicate email
- [x] Register with invalid email
- [x] Login with wrong password
- [x] Access protected endpoint without token
- [x] Access protected endpoint with token

### TODO CRUD

- [ ] Create TODO
- [ ] Get TODO list
- [ ] Get TODO detail
- [ ] Update TODO
- [ ] Delete TODO
- [ ] Ensure user cannot access another user's TODO

## API Testing Tools

Planned:

- Swagger UI
- Postman or HTTP file

## Backend Health Check Test

Date: 2026-05-11

Command:

```powershell
dotnet run --launch-profile http
Invoke-RestMethod http://localhost:5190/api/health
```

status  service                timestampUtc
------  -------                ------------
Healthy PertaminaDailyTodo.Api 2026-05-11T13:17:46.1214832Z

Conclusion:

Backend application runs successfully using the HTTP launch profile.
Health check endpoint /api/health is reachable.
Controller routing is working.

## Backend Database Migration Test ##

Date: 2026-05-11

Tooling:

- Visual Studio 2022
- Entity Framework Core
- SQL Server LocalDB
- Package Manager Console

Commands:

```powershell
Add-Migration InitialDatabase -OutputDir Data/Migrations
Update-Database
```
Result:

Database PertaminaDailyTodoDb created successfully.
Tables created:
Users
TodoItems
__EFMigrationsHistory

Conclusion:

EF Core DbContext is configured successfully.
SQL Server LocalDB connection is working.
Initial database schema is ready for authentication and TODO features.

## Backend Authentication Test

Date: 2026-05-12

Tooling:

- Visual Studio 2022
- ASP.NET Core Web API
- SQL Server LocalDB
- User Secrets
- JWT Bearer Authentication

Endpoints tested:

- `POST /api/auth/register`
- `POST /api/auth/login`

Register request:

```json
{
  "fullName": "Egi Erlangga",
  "email": "egi@example.com",
  "password": "Password123!"
}
```

Expected result:

API returns JWT token.
API returns authenticated user data.
Password is stored as a hash in the Users table.
Plain text password is not stored.

Conclusion:

Register endpoint works.
Login endpoint works.
JWT token generation works.
Password hashing works.

## Pending Authentication Tests

These tests should be completed before moving to TODO CRUD:

- Register with duplicate email should return `400 Bad Request`.
- Register with invalid email should return validation error.
- Login with wrong password should return `401 Unauthorized`.
- Protected endpoint without token should return `401 Unauthorized`.
- Protected endpoint with valid token should return authenticated user data.

## Authentication Protected Endpoint Test

Date: 2026-05-12

Endpoint tested:

```http
GET /api/auth/me
```

Test cases:

- [x] Request with valid token returns authenticated user data.
- [x] Request without valid token returns `401 Unauthorized`.
- [x] Authenticated user response contains `id`, `fullName`, and `email`.

Result:

JWT authentication middleware works correctly for protected endpoints.

The backend can read authenticated user claims from the token.

Authentication foundation is ready before implementing TODO ownership.

## Authentication Negative Test Summary

Date: 2026-05-12

Test cases completed:

- Duplicate email registration returns `400 Bad Request`.
- Invalid email registration returns validation error with `400 Bad Request`.
- Login with wrong password returns `401 Unauthorized`.
- Protected endpoint without token returns `401 Unauthorized`.
- Protected endpoint with valid token returns authenticated user data.

Result:

Authentication foundation is working for both successful and failed request scenarios.

Notes:

The API already uses ASP.NET Core model validation through `[ApiController]`.
Password verification uses ASP.NET Core password hashing.
JWT is required for protected endpoints.
