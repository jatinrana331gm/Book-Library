# Firebase Domain Configuration Verification

## Your Current Configuration

### Firebase Project Details
- **Project ID**: `booklibrary-c1b67`
- **Auth Domain**: `booklibrary-c1b67.firebaseapp.com`
- **API Key**: `AIzaSyDDgCWlp9HK7PLy8m1MiXRXdQrAod5KCwE`
- **App ID**: `1:711300589543:web:1124af024fcd7e6bcbbf42`

### Required Authorized Domains
✅ `localhost` - for local development (HTTP)
⚠️ **MISSING**: `https://localhost:5173` - for local development (HTTPS)
✅ `booklibrary-c1b67.firebaseapp.com` - default Firebase domain
✅ `booklibrary-c1b67.web.app` - default Firebase domain
✅ `book-library-swart.vercel.app` - your Vercel domain

## 🚨 URGENT: Configuration Issue Detected

Your local development server is running on **HTTPS** (`https://localhost:5173`), but your Firebase project is only configured for HTTP localhost. This is causing the `auth/unauthorized-domain` error.

## Required Actions to Fix Google Login

### 1. Add HTTPS Localhost to Firebase Console

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `booklibrary-c1b67`

2. **Add HTTPS Localhost Domain:**
   - Click "Authentication" in the left sidebar
   - Click "Settings" tab
   - Scroll to "Authorized domains"
   - Click "Add domain"
   - Enter: `localhost:5173` (Firebase will handle both HTTP and HTTPS)
   - Click "Add"

### 2. Update Google Cloud Console OAuth Settings

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Select project: `booklibrary-c1b67`

2. **Update OAuth 2.0 Client:**
   - Go to "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID
   - Click to edit it
   - Under "Authorized JavaScript origins", add:
     - `https://localhost:5173`
   - Under "Authorized redirect URIs", add:
     - `https://localhost:5173/__/auth/handler`
   - Click "Save"

### 3. Alternative: Force HTTP in Development

If you prefer to use HTTP for local development, you can modify your Vite configuration:

```javascript
// vite.config.ts
export default defineConfig({
  // ... other config
  server: {
    https: false, // Force HTTP
    port: 5173
  }
})
```

## Configuration Status: ❌ NEEDS FIXING

Your Firebase configuration needs to be updated to include HTTPS localhost support.

## Testing Checklist

### After Adding HTTPS Localhost Domain:

- [ ] Clear browser cache and cookies
- [ ] Restart your development server
- [ ] Test Google login at `https://localhost:5173/login`
- [ ] Verify no `auth/unauthorized-domain` errors

### Local Development (https://localhost:5173)
- [ ] Email login works
- [ ] Google login popup works
- [ ] Google login redirect works (if popup blocked)
- [ ] Error messages are clear

### Production (https://book-library-swart.vercel.app)
- [ ] Email login works
- [ ] Google login popup works
- [ ] Google login redirect works (if popup blocked)
- [ ] No unauthorized domain errors

## Quick Fix Steps

1. **Immediate Fix (Recommended):**
   - Add `localhost:5173` to Firebase authorized domains
   - Add `https://localhost:5173` to Google Cloud Console OAuth origins
   - Add `https://localhost:5173/__/auth/handler` to OAuth redirect URIs

2. **Alternative Fix:**
   - Modify Vite config to force HTTP instead of HTTPS

## Troubleshooting

### If Google Login Still Fails After Domain Addition:

1. **Wait for Propagation (2-5 minutes)**
   - Firebase and Google Cloud changes need time to propagate

2. **Clear Browser Data**
   ```bash
   # Chrome DevTools
   F12 → Application → Storage → Clear site data
   
   # Or use incognito mode for testing
   ```

3. **Verify Domain Format**
   - Firebase: Use `localhost:5173` (no protocol)
   - Google Cloud: Use full URLs with protocol

4. **Check Console Logs**
   - Look for additional error details in browser console
   - Verify the exact domain being rejected

### Common Error Solutions

| Error | Solution |
|-------|----------|
| `auth/unauthorized-domain` | Add missing domain to Firebase authorized list |
| `redirect_uri_mismatch` | Add redirect URI to Google Cloud Console |
| `origin_mismatch` | Add JavaScript origin to Google Cloud Console |

## Security Notes

✅ **HTTPS Security**: Your development server using HTTPS is more secure
✅ **Domain Restrictions**: Only authorized domains can use your Firebase project
✅ **Localhost Exception**: Localhost domains are safe for development

## Next Steps

1. **Add the missing HTTPS localhost domain to Firebase**
2. **Update Google Cloud Console OAuth settings**
3. **Test the configuration**
4. **Clear browser cache if needed**

The Google login should work immediately after adding the HTTPS localhost domain to your Firebase authorized domains list.