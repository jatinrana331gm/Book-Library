# Firebase Domain Configuration Fix

## Issue
Your app is hosted on Vercel at `book-library-swart.vercel.app`, but this domain is not authorized in Firebase, causing Google authentication to fail with `auth/unauthorized-domain` error.

## Solution
Add your Vercel domain to Firebase's authorized domains:

### Steps to Fix:

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `booklibrary-c1b67`

2. **Navigate to Authentication Settings:**
   - Click on "Authentication" in the left sidebar
   - Click on "Settings" tab
   - Scroll down to "Authorized domains" section

3. **Add Your Vercel Domain:**
   - Click "Add domain"
   - Enter: `book-library-swart.vercel.app`
   - Click "Add"

4. **Verify Current Domains:**
   Your authorized domains should now include:
   - `localhost` (for local development)
   - `booklibrary-c1b67.firebaseapp.com` (default Firebase domain)
   - `booklibrary-c1b67.web.app` (default Firebase domain)
   - `book-library-swart.vercel.app` (your Vercel domain) ← **ADD THIS**

### Important Notes:
- Changes may take a few minutes to propagate
- Make sure to use the exact domain without `https://` prefix
- If you have a custom domain configured in Vercel, add that as well

### After Adding the Domain:
1. Wait 2-3 minutes for changes to take effect
2. Clear your browser cache
3. Try Google authentication again

The Google login should work properly once the domain is added to Firebase's authorized domains list.