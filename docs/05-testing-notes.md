# Testing Notes

## Manual Testing Checklist

### Authentication

- [ ] Register with valid data
- [ ] Register with duplicate email
- [ ] Register with invalid email
- [ ] Login with valid credentials
- [ ] Login with wrong password
- [ ] Access protected endpoint without token
- [ ] Access protected endpoint with token

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

```powershell```
dotnet run --launch-profile http
Invoke-RestMethod http://localhost:5190/api/health

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

```powershell```
Add-Migration InitialDatabase -OutputDir Data/Migrations
Update-Database

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

```json```
{
  "fullName": "Egi Erlangga",
  "email": "egi@example.com",
  "password": "Password123!"
}

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
