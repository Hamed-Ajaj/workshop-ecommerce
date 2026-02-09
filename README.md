# MERN Products Management

Full‑stack MERN app with an ecommerce storefront and an admin dashboard. The admin UI uses shadcn UI components, TanStack Table, TanStack Form, TanStack Query, and Recharts (via shadcn charts).

## Development

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in `server/` with:

```bash
JWT_SECRET=your-secret-here
```

## Project Structure

```
client/   # React + Vite frontend
server/   # Express + MySQL backend
```

## Frontend Overview

### Public App
Routes:
- `/` Home
- `/shop` Product catalog
- `/products/:id` Product details
- `/cart` Cart
- `/sign-in` Auth
- `/signup` Auth

### Admin App
Routes:
- `/admin` Dashboard
- `/admin/products` Products list
- `/admin/products/new` Add product
- `/admin/users` Users list
- `/admin/users/new` Add user

Access:
- Admin routes are guarded by `useAuthStore` and require `role === "admin"`.
- Temporary fallback: email `admin@gmail.com` is treated as admin until backend returns roles.

UI:
- Sidebar uses shadcn Sidebar component (collapsible).
- Charts use shadcn Chart component (Recharts).
- Tables use TanStack Table with shadcn Table + Pagination + Badge.

### Frontend Auth
Tokens and user data are stored in `client/src/stores/useAuthStore.ts` and attached to requests in `client/src/lib/axios.ts`.

## Backend Overview

### Auth
- JWT-based authentication.
- Endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Middleware: `server/src/middlewares/auth.middleware.ts`

### Profile
- `GET /api/profile`
- `PATCH /api/profile`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`

### Orders
- `POST /api/orders` (auth required)

## Admin Data (UI‑Only for now)
Admin tables and charts are currently powered by mock data:
- `client/src/admin/mock-data.ts`

## Database Notes
Recommended columns for role‑based admin access:
```sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user';
```

Create an admin user (example):
```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@gmail.com', '<bcrypt-hash>', 'admin');
```

## Scripts

### Client
- `npm run dev`
- `npm run build`
- `npm run preview`

### Server
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`

## Notes
- This README is the canonical documentation and should be updated whenever new features or architectural changes are added.
