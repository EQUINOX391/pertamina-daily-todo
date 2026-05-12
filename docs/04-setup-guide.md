# Setup Guide

## Prerequisites

Planned tools:

- Git
- Node.js
- .NET SDK
- SQL Server
- SQL Server Management Studio or Azure Data Studio
- Code editor such as Visual Studio Code or Visual Studio

## Initial Setup

Clone repository:

```bash
git clone <repository-url>
cd pertamina-daily-todo
```

## Backend Setup

Open the backend solution in Visual Studio:

```txt
src/backend/PertaminaDailyTodo.Backend.sln
```

Backend API project:

```txt
src/backend/PertaminaDailyTodo.Api
```

Run profile for local API testing:

```txt
http
```

Default local API URL:

```http
http://localhost:5190
```

## Backend Configuration

The backend reads configuration from ASP.NET Core configuration providers.

Required configuration keys:

```txt
ConnectionStrings:DefaultConnection
Jwt:Key
Jwt:Issuer
Jwt:Audience
Jwt:ExpiresInMinutes
```

For local development, use Visual Studio User Secrets for sensitive values such as the database connection string and JWT key.

Example User Secrets values:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=PertaminaDailyTodoDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "replace-with-secure-development-secret-at-least-32-characters",
    "Issuer": "PertaminaDailyTodo.Api",
    "Audience": "PertaminaDailyTodo.Frontend",
    "ExpiresInMinutes": 60
  }
}
```

## Database Setup

The project uses Entity Framework Core with SQL Server LocalDB.

Migration already created:

```txt
InitialDatabase
```

To apply the migration using Visual Studio Package Manager Console:

```powershell
Update-Database
```

Expected database:

```txt
PertaminaDailyTodoDb
```

Expected tables:

```txt
Users
TodoItems
__EFMigrationsHistory
```

## Frontend Setup

To be documented after frontend project is created.

## Environment Variables

Use `.env.example` as reference.

Do not commit real `.env` files.
