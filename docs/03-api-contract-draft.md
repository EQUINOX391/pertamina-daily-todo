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
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

Response:

```json
{
  "message": "Registration successful"
}
```

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

Response:

```json
{
  "token": "jwt-token",
  "expiresAt": "2026-05-11T12:00:00Z"
}
```

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
