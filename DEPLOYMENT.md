# SnapBooth Deployment & Configuration Guide

Follow these steps to deploy your **Personal Web Photo Booth** to production.

## 1. Firebase Setup

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (e.g., `snapbooth-prod`).
3.  **Authentication**:
    -   Enable the **Anonymous** sign-in provider in the "Sign-in method" tab.
4.  **Firestore Database**:
    -   Create a database in "Production mode".
    -   Select a location close to your users.
5.  **Admin Feature**:
    -   As the project owner, you can view all user data and photos directly in the **Firestore Database** tab of the Firebase Console.
    -   Photos are stored as `data:image/png;base64,...` strings in the `imageUrl` field. You can copy this string and paste it into a browser address bar (or a base64 viewer) to see the image.
    -   Note: This app uses a "Firestore-only" approach to avoid the Firebase Storage paid tier.

## 2. Security Rules (Mandatory)

Copy and paste these rules into your Firebase Console to ensure privacy.

### Firestore Rules
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /photos/{photoId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 3. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`) and fill in your Firebase project credentials found in **Project Settings > General > Your apps**.

```bash
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

## 4. Local Development

1.  Run `npm install` to install dependencies.
2.  Run `npm run dev` to start the local preview.
3.  Open `https://localhost:5173` in your browser.

## 5. Deployment (Vercel/Netlify)

The easiest way to deploy is using Vercel:

1.  Push your code to a GitHub repository.
2.  Connect the repository to **Vercel**.
3.  Add the environment variables listed above in the Vercel project settings.
4.  Deploy!

**Note**: Ensure your site is served over **HTTPS**, as browsers require a secure context to access the camera API.
