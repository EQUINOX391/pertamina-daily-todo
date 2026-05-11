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

```powershell
dotnet run --launch-profile http
Invoke-RestMethod http://localhost:5190/api/health

status  service                timestampUtc
------  -------                ------------
Healthy PertaminaDailyTodo.Api 2026-05-11T13:17:46.1214832Z

Conclusion:

Backend application runs successfully using the HTTP launch profile.
Health check endpoint /api/health is reachable.
Controller routing is working.
