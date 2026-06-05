# Urban Innovation 

Created by Nina Meier as Comaker project. A full-stack web application for the Urban Innovation research group at Windesheim Flevoland. The application provides public dashboards per municipality and a secured CMS for managing content without developer involvement.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | React |
| Meta-framework | Next.js 16.2.2 |
| Authentication | Auth.js v5 |
| Database | MySQL |
| ORM | Prisma |

**Key dependencies:** Prisma (type-safe database access), Auth.js (magic link authentication), Zod (input validation), Resend (email delivery), Faker (seed data), Lucide React (icons), Playwright (end-to-end testing).

---

## Requirements

| Tool | Version |
|---|---|
| Node.js | 22.x or higher |
| npm | 10.x or higher |
| MySQL | 8.x |
| Git | Latest |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ninameier1/urbinn.git
cd urbinn
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `AUTH_SECRET` | Secret key for signing sessions and tokens |
| `AUTH_URL` | Base URL of the application |
| `RESEND_API_KEY` | API key for sending emails via Resend *(not required for local development, see Authentication below)* |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application |
| `APP_URL` | Internal base URL of the application |

### 4. Set up the database

Create a MySQL database:

```sql
CREATE DATABASE urban_innovation;
```

Run Prisma migrations:

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### 5. Seed the database

```bash
npm run seed
```

This populates the database with sample municipalities, partners, and users. The following admin account is created:

```
Email: admin@admin.com
```

---

## Running the App

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

> Keep the terminal running while using the application.

---

## Authentication (Local Development)

The application uses magic link authentication via Auth.js. In development, emails are **not** actually sent — the magic link is printed directly in the terminal instead.

To log in locally:

1. Start the app: `npm run dev`
2. Go to the login page
3. Enter a valid email address (e.g. `admin@admin.com`)
4. Click **Send Magic Link**
5. Copy the link from the terminal
6. Open it in your browser

`RESEND_API_KEY` is not required for local development, testing, or evaluation.

---

## Running Tests

Make sure the development server is running, then open a second terminal and run:

```bash
npm test
```

Playwright will simulate user interactions to verify the core functionality of the application (TC-001 through TC-015).

---

## Project Structure

```
app/
├── (auth)/         # Login and registration pages
├── (cms)/          # Secured CMS for administrators
└── (public)/       # Public-facing website and municipality dashboards

components/         # Reusable UI components
lib/
├── actions/        # Server actions (CRUD operations)
├── db/             # Database query functions
└── validations/    # Zod schemas
prisma/             # Database schema, migrations, and seed
tests/              # Playwright end-to-end tests
```