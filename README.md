# Pertamina Daily TODO List Study Case

Fullstack Daily TODO List application built for Pertamina recruitment study case.

## Study Case Context

This project is developed as part of a Pertamina recruitment study case.

The requested application is a fullstack Daily TODO List system with:

- React JS frontend
- .NET / ASP.NET Core Web API backend
- Entity Framework, preferably version 11 if compatible
- MSSQL database
- JWT-based stateless authentication
- Login and register features
- CRUD TODO List features

The main evaluation focus is not only the final application result, but also the development approach, including:

- Fullstack architecture
- API integration between frontend and backend
- Clean code
- Validation
- Error handling
- Separation of concerns
- Security awareness
- Setup and API documentation

## Development Approach

This project is developed step by step with emphasis on:

- Clear planning
- Incremental commits
- Documentation-first preparation
- Manual testing notes
- Security considerations
- Decision logging
- Reflection after each development phase

Gen-AI is used only as a learning and planning assistant, not as a replacement for understanding official documentation or blindly generating production code.

## Tech Stack

### Frontend

- React JS
- Planned: Vite
- Planned: Axios or Fetch API
- Planned: Form validation

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- MSSQL
- JWT Stateless Authentication

## Main Features

- User registration
- User login
- JWT-based authentication
- Create TODO
- Read TODO list
- Update TODO
- Delete TODO
- User-specific TODO data

## Project Goals

This project focuses on:

- Clean code
- Validation
- Error handling
- Separation of concerns
- Secure authentication flow
- API integration
- Clear setup documentation
- Realistic implementation within a 4-day deadline

## Project Structure

```txt
pertamina-daily-todo/
├── docs/
│   ├── 00-overview.md
│   ├── 01-requirements.md
│   ├── 02-architecture-plan.md
│   ├── 03-api-contract-draft.md
│   ├── 04-setup-guide.md
│   ├── 05-testing-notes.md
│   ├── 06-reflection-log.md
│   ├── 07-security-notes.md
│   ├── 08-decision-log.md
│   └── 09-gen-ai-usage.md
├── src/
│   ├── backend/
│   └── frontend/
├── .editorconfig
├── .env.example
├── .gitignore
└── README.md
```

## Development Status

- [x] Step 1: Initial project structure and documentation
- [x] Step 2: Backend project setup
- [x] Step 3: Database and Entity Framework setup
- [ ] Step 4: Authentication API
- [ ] Step 5: TODO CRUD API
- [ ] Step 6: Frontend setup
- [ ] Step 7: API integration
- [ ] Step 8: Testing, polish, and final documentation

## Notes

EF Core version will be finalized during backend setup based on compatibility with the selected .NET SDK version.
