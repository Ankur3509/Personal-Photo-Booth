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
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Standard user-specific rules
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /photos/{photoId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Global rule to allow Admin Dashboard (Secret Admin Screen)
    // This allows the collectionGroup('photos') query to work
    match /{path=**}/photos/{photoId} {
      allow read: if true; 
    }
  }
}
```

## 3. Secret Admin Dashboard
To view all photos from every user without using the Firebase Console:
1.  Open your deployed app.
2.  On the **Landing Page**, instead of your real name, enter this secret keyword: `ADMIN_ACCESS_777`
3.  Click **"Get Started"**.
4.  This will immediately open the **Admin Command Center**.
5.  You can view and **download** every photo taken by every user from here.

## 4. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`) and fill in your Firebase project credentials found in **Project Settings > General > Your apps**.

```bash
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

## 5. Firebase Indexing (For Admin Panel)
Since the Admin Panel views all photos from all users at once, Firebase requires a "Composite Index":
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Go to **Firestore Database** > **Indexes** tab.
3. Click **"Add Index"**.
4. Collection ID: `photos` (Select **"Collection Group"**).
5. Add Field: `timestamp` (Order: Descending).
6. Save and wait 5-10 minutes for it to build.

## 6. Local Development

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
