# Subscription Management Dashboard

## 📝 Project Overview
**Subscription Management Dashboard** is a mini SaaS admin dashboard that allows users to:

- Register and login
- Subscribe to a plan
- View their active subscription
- Manage their profile  
- Admins can view all subscriptions  

The dashboard has a clean, responsive UI and is built with modern web technologies.

**Frontend:**
- React.js (Vite)
- TailwindCSS
- Redux Toolkit

**Backend:**
- Node.js + Express.js
- MongoDB
- Mongoose
- JWT Authentication (Access & Refresh Tokens)

**Version Control:**
- Git (Public GitHub Repository)

## Backend Features

### 1. Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Role-based access control (admin, user)
- Middleware to protect routes

### 2. Subscription Module
**Collections / Tables:**
- `plans`: `id, name, price, features[], duration (days)`
- `users`: `id, name, email, password, role`
- `subscriptions`: `id, user_id, plan_id, start_date, end_date, status`

**APIs:**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login existing user
- `GET /api/plans` — Get all available plans
- `POST /api/subscribe/:planId` — Subscribe to a plan (authenticated)
- `GET /api/my-subscription` — Get current user’s active subscription
- `GET /api/admin/subscriptions` — Admin-only endpoint for all subscriptions

### 3. Validation & Error Handling
- Payload validation using **Joi/Yup/Zod**
- Structured error responses with proper HTTP status codes

### 4. Database Seeding
- Seeded 3–4 realistic plans for demonstration purposes

## Frontend Features

### Pages:
- `/login` — User login
- `/register` — User registration
- `/plans` — List of available plans
- `/dashboard` — User’s active subscription
- `/admin/subscriptions` — Admin dashboard listing all subscriptions

### Core Functionality:
- Global state management via **Redux Toolkit**
- JWT and refresh tokens stored securely
- Automatic token refresh or auto-logout
- Protected routes based on roles (admin vs user)

### UI & UX:
- Responsive and professional layout (TailwindCSS)
- Navigation bar with logout button and user menu
- Subscription status display (active, expired, none)

## Setup & Run Instructions

### Backend
1. Navigate to `/server` folder:
```bash
cd server
npm install
npm start
node seed/seedPlans for getting plans

### Frontend
1. Navigate to `/client` folder:
```bash
cd client
npm install
npm run dev
