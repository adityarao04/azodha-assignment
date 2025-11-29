# Onboarding Assignment

A multi-step onboarding flow built with React, TypeScript, and Redux.

## Features

- Login page with hardcoded credentials (username: `user123`, password: `password123`)
- Multi-step onboarding process:
  1. Personal Profile (name, age, email, profile picture)
  2. Favorite Songs List (dynamic list with Formik)
  3. Payment Information (card details)
  4. Success page
- Home page after onboarding completion
- Redux for state management
- localStorage persistence (resume from last step)
- Navigation between steps with data retention

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Formik
- Vite

## Cursor AI Integration

**Code Autocompletion:** Intelligent suggestions for React, TypeScript, and CSS

**Note:** While AI tools like Cursor were used, all architectural decisions, design choices, and final implementations were made by me. Using AI to some level shows I have the knowledge and ability to adapt according to the changing model.

## Project Structure

```
assignment/
├── src/
│   ├── components/
│   │   └── onboarding/
│   │       ├── Step1PersonalProfile.tsx
│   │       ├── Step1PersonalProfile.css
│   │       ├── Step2FavoriteSongs.tsx
│   │       ├── Step2FavoriteSongs.css
│   │       ├── Step3PaymentInfo.tsx
│   │       ├── Step3PaymentInfo.css
│   │       ├── Step4Success.tsx
│   │       └── Step4Success.css
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Login.css
│   │   ├── Onboarding.tsx
│   │   ├── Onboarding.css
│   │   ├── Home.tsx
│   │   └── Home.css
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── onboardingSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .eslintrc.cjs
└── README.md
```

### Directory Overview

- **`src/components/onboarding/`** - Individual onboarding step components
- **`src/pages/`** - Main page components (Login, Onboarding container, Home)
- **`src/store/`** - Redux store configuration and slices
  - **`slices/`** - Redux slices for auth and onboarding state management
- **`src/`** - Root source files (App, main entry point, styles)

## Future Improvements

Here are some potential enhancements that could be made to improve the application:

### Storage & Persistence
- **IndexedDB Integration**: Replace localStorage with IndexedDB for better storage capacity and structured data management, especially for larger datasets like favorite songs
- **Backend API Integration**: Connect to a real backend API for authentication, data persistence, and user management

### Authentication & Security
- **Real Authentication**: Integrate with authentication providers (OAuth, JWT tokens, etc.)
- **Password Security**: Implement proper password hashing and validation
- **Session Management**: Add token refresh and session timeout handling
- **Input Sanitization**: Add XSS protection and input validation

### User Experience
- **Form Validation**: Enhanced validation with better error messages and real-time feedback
- **Loading States**: Add loading indicators and skeleton screens
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Accessibility**: Improve ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Enhanced mobile responsiveness and tablet optimization
- **Animations**: Add smooth transitions and micro-interactions


### Performance
- **Code Splitting**: Implement lazy loading for routes and components
- **Image Optimization**: Compress and optimize profile pictures
- **Memoization**: Add React.memo and useMemo for performance optimization

### Features
- **Profile Picture Cropping**: Add image cropping functionality before upload
- **Payment Validation**: Integrate with payment validation services (e.g., Stripe)
- **Data Export**: Allow users to export their onboarding data
- **Multi-language Support**: Add i18n for internationalization
- **Dark Mode**: Implement theme switching functionality

