# LearnLingo

> A modern language tutor marketplace built with **Next.js**, **TypeScript**, and **Firebase Authentication**.

![LearnLingo cover](./public/og/learnlingo-og-cover.jpg)

## Overview

**LearnLingo** is a responsive web application for browsing language teachers, saving favorites, booking trial lessons, and recovering account access through a custom password reset flow.

The project combines a polished interface with practical real-world functionality:

- semantic, SEO-friendly catalog routes
- Firebase authentication with server session cookies
- protected favorites flow
- custom password recovery page
- responsive UI for mobile, tablet, and desktop
- reusable component architecture with clean styling

---

## Live Demo

```txt
https://learn-lingo-ivory-six.vercel.app
```

---

## Screenshots

### Home page

![Home page](./public/readme/home-page-screenshot.jpg)

### Teachers catalog

![Teachers catalog](./public/readme/teacher-directory-screenshot.jpg)

### Favorites page

![Favorites page](./public/readme/favorite-page-screenshot.jpg)

### Password recovery page

![Password recovery page](./public/readme/password-recovery-page-screenshot.jpg)

### Password recovery success state

![Password recovery success page](./public/readme/successful-password-recovery-page-screenshot.jpg)

### Error page

![Error page](./public/readme/error-page-screenshot.jpg)

### 404 page

![404 page](./public/readme/404-page-screenshot.jpg)

---

## Features

### Core functionality

- browse a catalog of language teachers
- filter teachers by language, level, and price
- sort catalog results
- semantic route-driven catalog URLs
- view detailed teacher information and reviews
- add and remove teachers from favorites
- access a protected favorites page
- book a trial lesson
- register and log in with Firebase Authentication
- recover password through a custom reset page

### UX and UI

- responsive layout for mobile, tablet, and desktop
- mobile and tablet offcanvas navigation
- custom auth and booking modals
- shimmer image placeholders
- reusable buttons, loaders, empty states, breadcrumbs, and actions
- custom success and recovery screens
- clean visual hierarchy with modern card-based layout

### SEO and routing

- route-based teacher filtering
- canonical path normalization
- dynamic metadata for filtered catalog pages
- Open Graph and Twitter metadata
- SEO content blocks for catalog pages

---

## Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **CSS Modules**

### State and data

- **Zustand**
- **TanStack Query**

### Forms and validation

- **React Hook Form**
- **Yup**

### Backend services

- **Firebase Authentication**
- **Firebase Firestore**
- **Firebase Admin SDK**

### UI utilities

- **Lucide React**
- **clsx**
- **react-hot-toast**

---

## Project Structure

```txt
app/
  api/
    auth/
    favorites/
    teachers/
  auth/
    action/
  favorites/
  teachers/
  error.tsx
  layout.tsx
  not-found.tsx
  page.tsx

components/
  auth/
  common/
  favorites/
  forms/
  header/
  home/
  modals/
  teachers/

hooks/
lib/
  constants/
  firebase/
  server/
  services/
  store/
  utils/
  validations/

providers/
public/
  og/
  readme/
types/
```

---

## Authentication Flow

The project uses **Firebase Authentication** together with **server session cookies**.

### Included flows

- register with email and password
- login with email and password
- logout with server session cleanup
- fetch current authenticated user from session
- reset password through a custom `/auth/action` page

### Protected routes

- `/favorites`
- `/api/favorites`

---

## Routing Highlights

The teachers catalog uses **SEO-friendly semantic URLs**, for example:

```txt
/teachers
/teachers/language-french
/teachers/language-french/level-a2-elementary
/teachers/language-french/level-a2-elementary/price-27
/teachers/language-french/level-a2-elementary/price-27/page-2
```

This routing approach gives the app:

- cleaner URLs
- canonical normalization
- filter state reflected in the route
- better page clarity for users and search engines

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_FIREBASE_API_KEY=your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_value

FIREBASE_PROJECT_ID=your_value
FIREBASE_CLIENT_EMAIL=your_value
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_key_here\n-----END PRIVATE KEY-----\n"

> Do not commit `.env.local` or files from the `secrets/` folder. Firebase Admin credentials must stay private.
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Natalia-Skoropad/learn-lingo
cd learn-lingo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create `.env.local` and fill in Firebase credentials.

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the app

```txt
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run check:before-deploy
```

---

## Highlights

What makes this project especially interesting:

- custom password reset UX instead of the default Firebase hosted page
- route-driven filtering with canonical redirects
- protected favorites flow powered by session cookies
- reusable component system and modular styling
- polished UI states for not-found, error, recovery, and success pages

---

## Author

**Nataliia Skoropad**

Frontend Developer
UX/UI redesign and user experience improvements

---

## License

This project is created for educational and portfolio purposes.
