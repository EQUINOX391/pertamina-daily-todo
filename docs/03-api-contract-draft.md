# API Contract Draft

This is an initial draft. Final request and response formats may be adjusted during backend implementation.

## Auth

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

Validation rules:

- `fullName` is required and has maximum length 100.
- `email` is required, must be a valid email address, and has maximum length 255.
- `password` is required, has minimum length 8, and maximum length 100.

Response `201 Created`:

```json
{
  "token": "jwt-token",
  "expiresAtUtc": "2026-05-12T12:00:00Z",
  "user": {
    "id": "00000000-0000-0000-0000-000000000000",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

Possible errors:

- `400 Bad Request` when email is already registered.
- `400 Bad Request` when request validation fails.

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

Validation rules:

- `email` is required, must be a valid email address, and has maximum length 255.
- `password` is required and has maximum length 100.

Response `200 OK`:

```json
{
  "token": "jwt-token",
  "expiresAtUtc": "2026-05-12T12:00:00Z",
  "user": {
    "id": "00000000-0000-0000-0000-000000000000",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

Possible errors:

- `401 Unauthorized` when email or password is invalid.
- `400 Bad Request` when request validation fails.

### Current Authenticated User

Planned endpoint for completing the authentication foundation before TODO CRUD.

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response `200 OK`:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

Possible errors:

- `401 Unauthorized` when token is missing, invalid, or expired.

## Todos

All TODO endpoints require:

```http
Authorization: Bearer <token>
```

### Get Todos

```http
GET /api/todos
```

### Get Todo Detail

```http
GET /api/todos/{id}
```

### Create Todo

```http
POST /api/todos
```

Request:

```json
{
  "title": "Finish documentation",
  "description": "Prepare initial project documentation",
  "dueDate": "2026-05-12",
  "isCompleted": false
}
```

### Update Todo

```http
PUT /api/todos/{id}
```

Request:

```json
{
  "title": "Finish documentation",
  "description": "Update documentation after review",
  "dueDate": "2026-05-12",
  "isCompleted": true
}
```

### Delete Todo

```http
DELETE /api/todos/{id}
```
