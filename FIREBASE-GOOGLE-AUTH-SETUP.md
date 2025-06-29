# Firebase Google Authentication Setup Guide

## Your Project Details
- **Project ID**: booklibrary-c1b67
- **Project Number**: 711300589543
- **Current Domain**: book-library-swart.vercel.app
- **Local Development**: https://localhost:5173 (HTTPS)

## 🚨 URGENT FIX NEEDED

Your local development server is running on HTTPS (`https://localhost:5173`), but your Firebase project is not configured for this domain. This is causing the `auth/unauthorized-domain` error.

## Quick Fix Steps

### 1. Add HTTPS Localhost to Firebase Console (IMMEDIATE ACTION REQUIRED)

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `booklibrary-c1b67`

2. **Add HTTPS Localhost Domain:**
   - Click "Authentication" in the left sidebar
   - Click "Settings" tab
   - Scroll to "Authorized domains"
   - Click "Add domain"
   - Enter: `localhost:5173`
   - Click "Add"

### 2. Update Google Cloud Console OAuth Settings

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Select project: `booklibrary-c1b67` (Project ID: 711300589543)

2. **Update OAuth 2.0 Client:**
   - Go to "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID (should already exist from Firebase)
   - Click to edit it
   - Under "Authorized JavaScript origins", ensure these are present:
     - `http://localhost:5173` (existing)
     - `https://localhost:5173` (ADD THIS)
     - `https://book-library-swart.vercel.app` (existing)
   - Under "Authorized redirect URIs", ensure these are present:
     - `http://localhost:5173/__/auth/handler` (existing)
     - `https://localhost:5173/__/auth/handler` (ADD THIS)
     - `https://book-library-swart.vercel.app/__/auth/handler` (existing)
   - Click "Save"

## Complete Setup Guide

### 1. Enable Google Authentication in Firebase Console

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `booklibrary-c1b67`

2. **Enable Google Sign-In:**
   - Click "Authentication" in the left sidebar
   - Click "Sign-in method" tab
   - Find "Google" in the list of providers
   - Click on "Google"
   - Toggle "Enable" to ON
   - Add your support email (required)
   - Click "Save"

### 2. Configure Authorized Domains

1. **In Firebase Console:**
   - Go to Authentication → Settings
   - Scroll to "Authorized domains"
   - Ensure these domains are added:
     - `localhost` (for both HTTP and HTTPS development)
     - `localhost:5173` (specific port for your dev server)
     - `book-library-swart.vercel.app` (your production domain)
     - `booklibrary-c1b67.firebaseapp.com` (default Firebase domain)

### 3. Google Cloud Console Configuration

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Select project: `booklibrary-c1b67` (Project ID: 711300589543)

2. **Configure OAuth Consent Screen:**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields:
     - App name: "Personal Book Library"
     - User support email: your email
     - Developer contact information: your email
   - Add scopes: `email`, `profile`, `openid`

3. **Configure OAuth 2.0 Client:**
   - Go to "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID
   - Click to edit it
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for HTTP development)
     - `https://localhost:5173` (for HTTPS development - REQUIRED)
     - `https://book-library-swart.vercel.app` (for production)
   - Add authorized redirect URIs:
     - `http://localhost:5173/__/auth/handler`
     - `https://localhost:5173/__/auth/handler` (REQUIRED)
     - `https://book-library-swart.vercel.app/__/auth/handler`

### 4. Verify Firebase Configuration

Your current Firebase config is correct:

```javascript
// src/auth/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDgCWlp9HK7PLy8m1MiXRXdQrAod5KCwE",
  authDomain: "booklibrary-c1b67.firebaseapp.com",
  projectId: "booklibrary-c1b67",
  storageBucket: "booklibrary-c1b67.appspot.com",
  messagingSenderId: "711300589543",
  appId: "1:711300589543:web:1124af024fcd7e6bcbbf42",
  measurementId: "G-WFVD9SD4TF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };
```

## Testing After Configuration

### 1. Clear Browser Data
```bash
# Chrome DevTools
F12 → Application → Storage → Clear site data

# Or test in incognito mode
```

### 2. Test Local Development (https://localhost:5173)
- [ ] Email login works
- [ ] Google login popup works
- [ ] Google login redirect works (if popup blocked)
- [ ] No `auth/unauthorized-domain` errors

### 3. Test Production (https://book-library-swart.vercel.app)
- [ ] Email login works
- [ ] Google login popup works
- [ ] Google login redirect works (if popup blocked)
- [ ] No unauthorized domain errors

## Troubleshooting the Current Error

### Error: `auth/unauthorized-domain`
**Cause**: `https://localhost:5173` is not in Firebase authorized domains
**Solution**: Add `localhost:5173` to Firebase authorized domains (Step 1 above)

### Error: `redirect_uri_mismatch`
**Cause**: Missing redirect URI in Google Cloud Console
**Solution**: Add `https://localhost:5173/__/auth/handler` to OAuth redirect URIs

### Error: `origin_mismatch`
**Cause**: Missing JavaScript origin in Google Cloud Console
**Solution**: Add `https://localhost:5173` to OAuth JavaScript origins

## Development Server Configuration

Your Vite development server is configured to use HTTPS. If you want to force HTTP instead:

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    https: false, // Force HTTP
    port: 5173
  }
})
```

However, HTTPS is recommended for security, so updating Firebase configuration is the better solution.

## Final Checklist for HTTPS Localhost Fix

- [ ] Add `localhost:5173` to Firebase authorized domains
- [ ] Add `https://localhost:5173` to Google Cloud OAuth JavaScript origins
- [ ] Add `https://localhost:5173/__/auth/handler` to Google Cloud OAuth redirect URIs
- [ ] Clear browser cache
- [ ] Test Google login on https://localhost:5173/login
- [ ] Verify no `auth/unauthorized-domain` errors

After completing these steps, Google authentication should work properly on both your local HTTPS development server and your deployed Vercel app.