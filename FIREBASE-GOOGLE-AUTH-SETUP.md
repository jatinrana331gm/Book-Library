# Firebase Google Authentication Setup Guide

## Your Project Details
- **Project ID**: booklibrary-c1b67
- **Project Number**: 711300589543
- **Current Domain**: book-library-swart.vercel.app

## Steps to Enable Google Authentication

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
     - `localhost` (for development)
     - `book-library-swart.vercel.app` (your production domain)
     - `booklibrary-c1b67.firebaseapp.com` (default Firebase domain)

2. **Add Your Vercel Domain:**
   - Click "Add domain"
   - Enter: `book-library-swart.vercel.app`
   - Click "Add"

### 3. Google Cloud Console Configuration

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Select project: `booklibrary-c1b67` (Project ID: 711300589543)

2. **Enable Required APIs:**
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - "Google+ API" (if available)
     - "People API"
     - "Identity and Access Management (IAM) API"

3. **Configure OAuth Consent Screen:**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields:
     - App name: "Personal Book Library"
     - User support email: your email
     - Developer contact information: your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed

4. **Configure OAuth 2.0 Client:**
   - Go to "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID (should already exist from Firebase)
   - Click to edit it
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://book-library-swart.vercel.app` (for production)
   - Add authorized redirect URIs:
     - `http://localhost:5173/__/auth/handler` (for development)
     - `https://book-library-swart.vercel.app/__/auth/handler` (for production)

### 4. Verify Firebase Configuration

Your current Firebase config should work, but verify these settings:

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

### 5. Test the Configuration

1. **Local Testing:**
   - Run your app locally: `npm run dev`
   - Try Google sign-in at `http://localhost:5173/login`

2. **Production Testing:**
   - Test on your live site: `https://book-library-swart.vercel.app/login`

### 6. Troubleshooting Common Issues

**Error: "auth/unauthorized-domain"**
- Solution: Add your domain to Firebase authorized domains

**Error: "auth/popup-blocked"**
- Solution: Your app already handles this with redirect fallback

**Error: "auth/operation-not-allowed"**
- Solution: Enable Google sign-in in Firebase Console

**Error: "redirect_uri_mismatch"**
- Solution: Add correct redirect URIs in Google Cloud Console

### 7. Security Considerations

1. **API Key Security:**
   - Your Firebase API key is safe to expose in client-side code
   - It's restricted by domain and Firebase security rules

2. **Domain Restrictions:**
   - Only authorized domains can use your Firebase project
   - Keep the authorized domains list minimal

3. **OAuth Scopes:**
   - Only request necessary scopes (`email`, `profile`)
   - Users will see what data you're requesting

### 8. Monitoring and Analytics

1. **Firebase Analytics:**
   - Your `measurementId` is already configured
   - Monitor authentication events in Firebase Console

2. **Error Monitoring:**
   - Check Firebase Console → Authentication → Users
   - Monitor sign-in methods and user activity

## Quick Commands for Google Cloud CLI (Optional)

If you have `gcloud` CLI installed:

```bash
# Set your project
gcloud config set project booklibrary-c1b67

# Enable required APIs
gcloud services enable identitytoolkit.googleapis.com
gcloud services enable people.googleapis.com

# List enabled APIs
gcloud services list --enabled
```

## Final Checklist

- [ ] Google sign-in enabled in Firebase Console
- [ ] Support email configured
- [ ] Authorized domains added (localhost + Vercel domain)
- [ ] OAuth consent screen configured in Google Cloud Console
- [ ] OAuth 2.0 client configured with correct origins and redirect URIs
- [ ] Firebase config updated in your app
- [ ] Local testing successful
- [ ] Production testing successful

After completing these steps, Google authentication should work properly on both your local development environment and your deployed Vercel app.