import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase config — ye aapki asli project (marquee-6602f) ki values hain.
 * Ye values client-side par public hoti hain (har Firebase web app me aisa
 * hota hai), isliye inhein code me rakhna safe hai. Asli secrets (Service
 * Account, Admin SDK key) kabhi yahan nahi aate.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyAZSP4SW7i_5jbo9gqzw_KiajBLVXO4xOs",
  authDomain: "marquee-6602f.firebaseapp.com",
  projectId: "marquee-6602f",
  storageBucket: "marquee-6602f.firebasestorage.app",
  messagingSenderId: "347811499910",
  appId: "1:347811499910:web:7a1af572168082b78e2607",
};

/**
 * Next.js dev mode me module hot-reload ke baare me hai, isliye app ko
 * bar-bar dobara initialize mat karo — warna "Firebase App already exists"
 * warning aati hai.
 */
const app: FirebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

/** Firestore database — yahan waitlist signups store hote hain. */
export const db: Firestore = getFirestore(app);

export default app;

/*
 * NOTE: `auth` yahan export nahi kiya jaata — wo `lib/firebase-auth.ts` me hai.
 * Ye file server-side API route (app/api/waitlist) se bhi import hoti hai,
 * aur Firebase Auth ko sirf browser (client component) me init karna safe hai.
 */
