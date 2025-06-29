# GitHub Repository Protection Guide

## Methods to Prevent Direct Code Access

### 1. Make Repository Private (Recommended)

**Steps:**
1. Go to your GitHub repository: `https://github.com/yourusername/your-repo-name`
2. Click on "Settings" tab
3. Scroll down to "Danger Zone"
4. Click "Change repository visibility"
5. Select "Make private"
6. Confirm the action

**Pros:**
- Complete protection from public access
- Only invited collaborators can view/clone
- Free for unlimited private repos on GitHub

**Cons:**
- Others can't contribute via pull requests unless invited
- Not visible in your public GitHub profile

### 2. Use .gitignore for Sensitive Files

Create/update `.gitignore` to exclude sensitive files:

```gitignore
# Environment variables
.env
.env.local
.env.production

# Firebase config (if contains sensitive keys)
src/auth/firebase.js

# Build outputs
dist/
build/

# Dependencies
node_modules/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
```

### 3. Environment Variables for Sensitive Data

Move sensitive configuration to environment variables:

**Create `.env` file:**
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

**Update firebase.js:**
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

### 4. Repository Access Controls

**Branch Protection Rules:**
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks
   - Restrict pushes to matching branches

**Collaborator Management:**
1. Go to Settings → Manage access
2. Only invite trusted collaborators
3. Set appropriate permission levels

### 5. License and Legal Protection

**Add LICENSE file:**
```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Include full MIT license text or choose another license]
```

### 6. Code Obfuscation (Advanced)

For production builds, consider code obfuscation:

**Install terser:**
```bash
npm install --save-dev terser
```

**Update vite.config.ts:**
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
    },
  },
});
```

### 7. Deploy from Private Repository

**Vercel with Private Repo:**
1. Connect your private GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy normally - Vercel can access private repos

**Environment Variables in Vercel:**
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all your `VITE_` prefixed variables

## Immediate Actions for Your Current Repo

### Option A: Make Repository Private (Quickest)
1. Go to your repo settings
2. Make it private
3. Your deployed app will still work on Vercel

### Option B: Remove Sensitive Data
1. Remove Firebase config from public files
2. Use environment variables
3. Add sensitive files to .gitignore
4. Force push to remove history:
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch src/auth/firebase.js' --prune-empty --tag-name-filter cat -- --all
   git push origin --force --all
   ```

## Best Practices

1. **Never commit sensitive data** (API keys, passwords, tokens)
2. **Use environment variables** for configuration
3. **Regular security audits** of your dependencies
4. **Keep dependencies updated** to patch security vulnerabilities
5. **Use HTTPS** for all external communications
6. **Implement proper authentication** and authorization
7. **Regular backups** of your code and data

## Monitoring and Alerts

Set up GitHub security features:
1. **Dependabot alerts** for vulnerable dependencies
2. **Secret scanning** to detect accidentally committed secrets
3. **Code scanning** for security vulnerabilities

Remember: Making your repository private is the most effective way to prevent unauthorized access to your source code.