# Pertamina Daily TODO Frontend

React JS frontend for the Pertamina Daily TODO List study case.

## Tech Stack

- React JS
- Vite
- React Router
- Axios

## Local Setup

Install dependencies:

```powershell
npm install
```

Run development server:

```powershell
npm run dev
```

Default local frontend URL:

```txt
http://localhost:5173
```

## Environment Variable

Create a local `.env` file based on `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5190/api
```

Do not commit real `.env` files.

## Available Scripts

```powershell
npm run dev
npm run build
npm run lint
```

## Current Features

- Login page
- Register page
- JWT token storage helper
- Protected route guard
- Authenticated TODO list
- Create TODO
- Edit TODO
- Toggle TODO status
- Delete TODO
- Basic loading and error states

## Notes

JWT is stored in `localStorage` for this study case to keep the implementation simple and understandable.

Backend authorization remains the source of truth. The frontend route guard only improves user experience and does not replace backend JWT validation.
