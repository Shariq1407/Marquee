/**
 * Admin panel ke liye demo/mock data.
 * (Website me abhi koi database nahi hai — signups sirf email me jaate hain,
 * isliye yahaan sample data show hota hai. Baad me isko real API se replace kar sakte ho.)
 */

export type Status = "active" | "pending" | "invited" | "inactive";

export type Signup = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Team";
  status: Status;
  source: "Landing" | "Referral" | "App Store" | "X / Twitter";
  joined: string; // relative label
  message?: string; // optional message from waitlist form
  joinedAt: string; // sortable date
};

export const kpis = [
  {
    key: "signups",
    label: "Total signups",
    value: "4,812",
    delta: "+12.4%",
    up: true,
    note: "vs pichle 30 din",
    spark: [18, 24, 21, 30, 27, 35, 33, 42, 47, 44, 52, 58],
  },
  {
    key: "active",
    label: "Active users",
    value: "2,347",
    delta: "+6.1%",
    up: true,
    note: "last 7 days",
    spark: [30, 28, 33, 31, 36, 34, 39, 41, 38, 44, 46, 49],
  },
  {
    key: "waitlist",
    label: "Waitlist",
    value: "918",
    delta: "+38",
    up: true,
    note: "is hafte naye",
    spark: [12, 15, 14, 19, 22, 20, 26, 25, 31, 34, 33, 39],
  },
  {
    key: "churn",
    label: "Unsubscribes",
    value: "1.8%",
    delta: "-0.4%",
    up: false,
    good: true,
    note: "churn kam hua",
    spark: [26, 24, 25, 21, 22, 19, 18, 20, 16, 15, 14, 12],
  },
] as const;

/** Last 14 din ka signups + activations trend. */
export const trend = [
  { label: "11 Oct", signups: 46, activated: 28 },
  { label: "12 Oct", signups: 52, activated: 31 },
  { label: "13 Oct", signups: 41, activated: 26 },
  { label: "14 Oct", signups: 63, activated: 39 },
  { label: "15 Oct", signups: 58, activated: 42 },
  { label: "16 Oct", signups: 72, activated: 47 },
  { label: "17 Oct", signups: 69, activated: 44 },
  { label: "18 Oct", signups: 84, activated: 55 },
  { label: "19 Oct", signups: 77, activated: 51 },
  { label: "20 Oct", signups: 96, activated: 63 },
  { label: "21 Oct", signups: 88, activated: 59 },
  { label: "22 Oct", signups: 104, activated: 71 },
  { label: "23 Oct", signups: 118, activated: 79 },
  { label: "24 Oct", signups: 131, activated: 88 },
];

export const sources = [
  { label: "Direct / Landing", value: 41, color: "#f19c29" },
  { label: "Referral", value: 24, color: "#38bdf8" },
  { label: "X / Twitter", value: 19, color: "#a78bfa" },
  { label: "App Store", value: 11, color: "#34d399" },
  { label: "Other", value: 5, color: "#52525b" },
];

export const platforms = [
  { label: "iOS 18", value: 54 },
  { label: "iOS 17", value: 31 },
  { label: "iPadOS", value: 10 },
  { label: "Older", value: 5 },
];

export const signups: Signup[] = [
  { id: "u-1042", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", plan: "Pro", status: "active", source: "Landing", joined: "2 min pehle", joinedAt: "2026-10-24" },
  { id: "u-1041", name: "Sofia Ramos", email: "sofia.ramos@icloud.com", plan: "Free", status: "pending", source: "Referral", joined: "26 min pehle", joinedAt: "2026-10-24" },
  { id: "u-1040", name: "Dev Sharma", email: "dev.sharma@outlook.com", plan: "Team", status: "active", source: "X / Twitter", joined: "1 hr pehle", joinedAt: "2026-10-24" },
  { id: "u-1039", name: "Mia Kalani", email: "mia.kalani@gmail.com", plan: "Pro", status: "invited", source: "Landing", joined: "3 hrs pehle", joinedAt: "2026-10-24" },
  { id: "u-1038", name: "Rohan Verma", email: "rohan.v@proton.me", plan: "Free", status: "active", source: "App Store", joined: "5 hrs pehle", joinedAt: "2026-10-24" },
  { id: "u-1037", name: "Elena Fischer", email: "elena.f@web.de", plan: "Pro", status: "active", source: "Referral", joined: "9 hrs pehle", joinedAt: "2026-10-24" },
  { id: "u-1036", name: "Kabir Singh", email: "kabir.singh@gmail.com", plan: "Free", status: "pending", source: "Landing", joined: "1 din pehle", joinedAt: "2026-10-23" },
  { id: "u-1035", name: "Yuki Tanaka", email: "yuki.tanaka@gmail.com", plan: "Team", status: "active", source: "X / Twitter", joined: "1 din pehle", joinedAt: "2026-10-23" },
  { id: "u-1034", name: "Noah Williams", email: "noah.w@hey.com", plan: "Pro", status: "invited", source: "Landing", joined: "2 din pehle", joinedAt: "2026-10-23" },
  { id: "u-1033", name: "Ananya Iyer", email: "ananya.iyer@gmail.com", plan: "Free", status: "active", source: "Referral", joined: "2 din pehle", joinedAt: "2026-10-23" },
  { id: "u-1032", name: "Lucas Moreau", email: "lucas.moreau@gmail.com", plan: "Pro", status: "pending", source: "App Store", joined: "3 din pehle", joinedAt: "2026-10-22" },
  { id: "u-1031", name: "Priya Nair", email: "priya.nair@gmail.com", plan: "Free", status: "active", source: "Landing", joined: "4 din pehle", joinedAt: "2026-10-21" },
];

/* ------------------------------ Requests ---------------------------- */

export type RequestType =
  | "Waitlist access"
  | "Feature request"
  | "Bug report"
  | "Partnership";export type RequestStatus = "pending" | "approved" | "rejected";
export type AdminRequest = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  option?: string;
  type: RequestType;
  message: string;
  received: string;
  status: RequestStatus;
};

/** Requests ab Firestore ke `requests` collection se live aati hain
 *  (dekho: admin/store.ts → useRequests). */

/** Demo requests — panel me show hote hain. */
export const initialRequests: AdminRequest[] = [
  { id: "r-001", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", type: "Waitlist access", message: "Main apne doston ke saath use karna chahta hoon.", received: "2 min pehle", status: "pending" },
  { id: "r-002", name: "Sofia Ramos", email: "sofia.ramos@icloud.com", type: "Feature request", message: "Dark mode option add karo please.", received: "1 hr pehle", status: "pending" },
  { id: "r-003", name: "Dev Sharma", email: "dev.sharma@outlook.com", type: "Bug report", message: "Video play hote hi crash ho raha hai.", received: "2 hr pehle", status: "approved" },
  { id: "r-004", name: "Mia Kalani", email: "mia.kalani@gmail.com", type: "Partnership", message: "Humara platform aapke saath collaborate kar sakta hai.", received: "5 hr pehle", status: "pending" },
  { id: "r-005", name: "Rohan Verma", email: "rohan.v@proton.me", type: "Waitlist access", message: "Early access chahiye.", received: "1 din pehle", status: "rejected" },
];

export const activity = [
  { icon: "user-plus", text: "Aarav Mehta waitlist me join hue", time: "2 min" },
  { icon: "credit-card", text: "Dev Sharma ne Pro plan upgrade kiya", time: "1 hr" },
  { icon: "mail", text: "Weekly digest 2,347 users ko bheja gaya", time: "4 hrs" },
  { icon: "sparkles", text: "v1.4.0 build App Store par live hai", time: "8 hrs" },
  { icon: "shield", text: "iCloud sync service healthy — 99.98% uptime", time: "1 din" },
] as const;
