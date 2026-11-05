import { getAuth, type Auth } from "firebase/auth";
import app from "@/lib/firebase";

/**
 * Firebase Auth — email/password login ke liye.
 *
 * Alag file isliye kyunki `lib/firebase.ts` server-side API route se bhi
 * import hoti hai; Auth ko sirf browser (client component) me init karna
 * safe rehta hai. Is file ko import karne wale components `"use client"`
 * hone chahiye.
 */
export const auth: Auth = getAuth(app);

export default auth;
