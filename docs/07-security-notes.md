# Security Notes

## Authentication

The application uses JWT for stateless authentication.

Planned security considerations:

- Passwords must be hashed before being stored in database.
- JWT secret must be stored in environment configuration, not hardcoded.
- Protected endpoints must require valid JWT token.
- Token should contain only necessary claims.
- Token expiration should be configured.
- Login failure messages should not expose sensitive details.

## Authorization

TODO data must be user-specific.

A logged-in user should only be able to:

- View their own TODO items
- Create TODO items under their own account
- Update their own TODO items
- Delete their own TODO items

A user must not be able to access another user's TODO data by changing the TODO ID in the URL.

## Input Validation

Validation should exist on both backend and frontend.

Backend validation is mandatory because frontend validation can be bypassed.

## Configuration

Sensitive values must not be committed to Git.

Examples:

- JWT secret
- Database connection string
- Production credentials

## Security Trade-Off Notes

For this study case, the project prioritizes simple and understandable security implementation while still showing awareness of real-world risks.

## Database Foundation Decision

- Date: 2026-05-11
- Decision: Use SQL Server LocalDB for local development.
- Reason:
  - It is lightweight for local development on Windows.
  - It works well with Visual Studio.
  - It keeps the project aligned with the MSSQL requirement.
- Impact:
  - Local development uses `(localdb)\MSSQLLocalDB`.
  - Production or reviewer environment can replace the connection string later.
