"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Signup, Status } from "@/admin/data";

/* ------------------------------------------------------------------ *
 * Firestore se admin panel ka data.
 *
 * Waitlist signups `waitlist` collection me jama hote hain (website ka
 * form /api/waitlist route se likhta hai). Yahan onSnapshot se live
 * padha jaata hai — naya signup aate hi table me dikh jaata hai.
 *
 * Firestore rules me `waitlist` ka read admin tak seemit hona chahiye
 * (admin login ke bina panel khulta hi nahi, isliye gate upar hai).
 * ------------------------------------------------------------------ */

/** Firestore document ka shape — jo route.ts likhta hai. */
export type WaitlistDoc = {
  name?: string;
  email?: string;
  mobile?: string;
  option?: string;
  /** Form ka optional message — route.ts isi naam se likhta hai. */
  message?: string;
  joinedAt?: string;
  /** Firestore me yeh field panel ke Accept/Invite button se badalti hai. */
  status?: string;
};

/** Doc ke status ko panel ke known values me map karta hai. */
function parseStatus(s?: string): Status {
  return s === "active" || s === "invited" || s === "inactive"
    ? s
    : "pending";
}

/** Document ko panel ke `Signup` type me badalta hai. */
function toSignup(id: string, d: WaitlistDoc): Signup {
  return {
    id,
    name: d.name?.trim() || "Unnamed",
    email: d.email?.trim() || "",
    plan: "Free",
    status: parseStatus(d.status),
    source: "Landing",
    joined: relativeLabel(d.joinedAt),
    joinedAt: d.joinedAt ?? "",
  };
}

/** "2 min pehle" jaisa label banata hai, warna date wapas. */
function relativeLabel(iso?: string): string {
  if (!iso) return "abhi";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;

  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "abhi";
  if (mins < 60) return `${mins} min pehle`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr pehle`;
  const days = Math.round(hrs / 24);
  if (days === 1) return "1 din pehle";
  if (days < 30) return `${days} din pehle`;
  return new Date(then).toLocaleDateString("en-GB");
}

function mapDoc(snap: QueryDocumentSnapshot): Signup {
  return toSignup(snap.id, (snap.data() ?? {}) as WaitlistDoc);
}

/**
 * Kisi waitlist signup ka status badalta hai (Firestore me `status` field).
 * Panel ke Accept/Invite buttons yahi call karte hain — live onSnapshot se
 * table turant update ho jaata hai.
 */
export async function updateWaitlistStatus(id: string, status: Status) {
  await updateDoc(doc(db, "waitlist", id), { status });
}

export type WaitlistState = {
  signups: Signup[];
  loading: boolean;
  error: string | null;
};

/**
 * `waitlist` collection ko live subscribe karta hai.
 * Newest pehle. Error aane par `error` set hota hai (panel khali nahi
 * hang hota).
 */
export function useWaitlist(): WaitlistState {
  const [state, setState] = useState<WaitlistState>({
    signups: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const q = query(collection(db, "waitlist"), orderBy("joinedAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setState({
          signups: snap.docs.map(mapDoc),
          loading: false,
          error: null,
        });
      },
      (err) => {
        console.error("Firestore listen failed:", err);
        setState({
          signups: [],
          loading: false,
          error:
            "Firestore se data nahi mila — rules ya network check karo.",
        });
      }
    );

    return () => unsub();
  }, []);

  return state;
}
