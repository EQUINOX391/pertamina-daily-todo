# API Contract Draft

This is an initial draft. Final request and response formats may be adjusted during backend implementation.

## Auth API

### Register

```http
POST /api/auth/register
```

Description:

Registers a new user account and returns a JWT token.

Request body:

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

Success response:

```http
201 Created
```

Example response:

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

Description:

Authenticates an existing user and returns a JWT token.

Request body:

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

Validation rules:

- `email` is required, must be a valid email address, and has maximum length 255.
- `password` is required and has maximum length 100.

Success response:

```http
200 OK
```

Example response:

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

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Description:

Returns the currently authenticated user based on the JWT token.

Success response:

```http
200 OK
```

Example response:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

Possible errors:

- `401 Unauthorized` when token is missing, invalid, or expired.

## Todo API

All Todo endpoints require JWT authentication.

Authentication header:

```http
Authorization: Bearer <token>
```

### Get All Todos

```http
GET /api/todos
```

Description:

Returns all todos owned by the authenticated user.

Success response:

```http
200 OK
```

Example response:

```json
[
  {
    "id": "fe243c54-95f6-4f28-b2e4-ef35020fc91e",
    "title": "Belajar TODO CRUD API",
    "description": "Implementasi endpoint Todo dengan JWT ownership",
    "isCompleted": false,
    "dueDateUtc": "2026-05-15T10:00:00Z",
    "createdAtUtc": "2026-05-12T07:00:00Z",
    "updatedAtUtc": null
  }
]
```

Possible errors:

- `401 Unauthorized` when token is missing, invalid, or expired.

### Get Todo By Id

```http
GET /api/todos/{id}
```

Description:

Returns a single todo owned by the authenticated user.

Route parameter:

- `id` is the todo ID.

Success response:

```http
200 OK
```

Example response:

```json
{
  "id": "fe243c54-95f6-4f28-b2e4-ef35020fc91e",
  "title": "Belajar TODO CRUD API",
  "description": "Implementasi endpoint Todo dengan JWT ownership",
  "isCompleted": false,
  "dueDateUtc": "2026-05-15T10:00:00Z",
  "createdAtUtc": "2026-05-12T07:00:00Z",
  "updatedAtUtc": null
}
```

Possible errors:

- `401 Unauthorized` when token is missing, invalid, or expired.
- `404 Not Found` when todo does not exist or does not belong to the authenticated user.

Example not found response:

```json
{
  "message": "Todo was not found."
}
```

### Create Todo

```http
POST /api/todos
```

Description:

Creates a new todo for the authenticated user.

Request body:

```json
{
  "title": "Belajar TODO CRUD API",
  "description": "Implementasi endpoint Todo dengan JWT ownership",
  "dueDateUtc": "2026-05-15T10:00:00Z"
}
```

Validation rules:

- `title` is required.
- `title` must not be empty or whitespace only.
- `title` maximum length is 150 characters.
- `description` maximum length is 1000 characters.
- `dueDateUtc` is optional.

Success response:

```http
201 Created
```

Example response:

```json
{
  "id": "fe243c54-95f6-4f28-b2e4-ef35020fc91e",
  "title": "Belajar TODO CRUD API",
  "description": "Implementasi endpoint Todo dengan JWT ownership",
  "isCompleted": false,
  "dueDateUtc": "2026-05-15T10:00:00Z",
  "createdAtUtc": "2026-05-12T07:00:00Z",
  "updatedAtUtc": null
}
```

Possible errors:

- `400 Bad Request` when request validation fails.
- `401 Unauthorized` when token is missing, invalid, or expired.

### Update Todo

```http
PUT /api/todos/{id}
```

Description:

Updates an existing todo owned by the authenticated user.

Route parameter:

- `id` is the todo ID.

Request body:

```json
{
  "title": "Belajar TODO CRUD API - Updated",
  "description": "Update todo dan tandai sebagai selesai",
  "isCompleted": true,
  "dueDateUtc": "2026-05-15T10:00:00Z"
}
```

Validation rules:

- `title` is required.
- `title` must not be empty or whitespace only.
- `title` maximum length is 150 characters.
- `description` maximum length is 1000 characters.
- `isCompleted` is required.
- `dueDateUtc` is optional.

Success response:

```http
200 OK
```

Example response:

```json
{
  "id": "fe243c54-95f6-4f28-b2e4-ef35020fc91e",
  "title": "Belajar TODO CRUD API - Updated",
  "description": "Update todo dan tandai sebagai selesai",
  "isCompleted": true,
  "dueDateUtc": "2026-05-15T10:00:00Z",
  "createdAtUtc": "2026-05-12T07:00:00Z",
  "updatedAtUtc": "2026-05-12T08:00:00Z"
}
```

Possible errors:

- `400 Bad Request` when request validation fails.
- `401 Unauthorized` when token is missing, invalid, or expired.
- `404 Not Found` when todo does not exist or does not belong to the authenticated user.

### Delete Todo

```http
DELETE /api/todos/{id}
```

Description:

Deletes an existing todo owned by the authenticated user.

Route parameter:

- `id` is the todo ID.

Success response:

```http
204 No Content
```

Possible errors:

- `401 Unauthorized` when token is missing, invalid, or expired.
- `404 Not Found` when todo does not exist or does not belong to the authenticated user.

### Security Notes

Todo ownership is resolved from the authenticated JWT token.

The client does not send `userId` in the Todo request body. This prevents users from creating, updating, reading, or deleting todos that belong to another user.

If a todo does not exist or does not belong to the authenticated user, the API returns:

```http
404 Not Found
```

This avoids exposing whether a todo ID exists for another user.
