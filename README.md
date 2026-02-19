# AutoML — Full-Stack Starter Kit

React + FastAPI + PostgreSQL starter with auth, protected routing, responsive layout, and dark mode.

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [uv](https://docs.astral.sh/uv/) (Python package manager)

## Quick Start

### 1. Setup environment

```bash
make setup
# Creates backend/.env from backend/.env.example and installs frontend deps
```

### 2. Start development (hot reload)

```bash
make dev
# Starts postgres + backend in Docker, runs frontend via Vite dev server
```

App runs at: http://localhost:5173
API runs at: http://localhost:8000

### 3. Run database migrations

```bash
make migrate
```

### 4. Build & run everything in Docker

```bash
make build
# Frontend at http://localhost:3000, API at http://localhost:8000
```

---

## Environment Variables

### `backend/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+asyncpg://...` | PostgreSQL connection string |
| `JWT_SECRET_KEY` | — | Secret for signing JWTs (required) |
| `JWT_EXPIRE_MINUTES` | `1440` | Token expiry in minutes |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed origin |

### `frontend/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |
| `VITE_APP_NAME` | `AutoML` | App display name |

> **Note:** `VITE_*` vars are baked into the JS bundle at build time.

---

## Auth Flow

- `POST /api/v1/auth/login` → returns `{access_token}` → stored in `localStorage`
- `POST /api/v1/auth/register` → redirects to `/login` with success message
- `GET /api/v1/auth/me` → validates token on app mount
- Sign out → clears `localStorage`, redirects to `/login`

## Make Targets

| Target | Description |
|--------|-------------|
| `make setup` | Copy `.env.example` and install frontend deps |
| `make dev` | Start backend services + frontend dev server |
| `make build` | Build Docker images and start all services |
| `make migrate` | Run Alembic migrations |
| `make logs` | Tail Docker Compose logs |
