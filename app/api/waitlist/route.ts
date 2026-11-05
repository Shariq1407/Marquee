import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { emailHtml, escapeHtml } from "@/lib/email-template";

/**
 * Waitlist/Log In form ka data do jagah jaata hai:
 *   1. Firestore (`waitlist` collection) — asli database, admin panel yahi
 *      padhta hai. Ye step zaroori hai: fail ho to 500 jayega.
 *   2. Email (Nodemailer) — sirf notification hai, best-effort. SMTP set na
 *      ho ya send fail ho, tab bhi signup save rehta hai (data Firebase me
 *      already aa chuka hota hai).
 *
 * Do emails jati hain:
 *   1. Owner ko (NOTIFY_EMAIL) — naye signup ka data
 *   2. User ko (jo email form me bhara hai) — uska apna data + confirmation
 * SMTP settings .env file se aati hain.
 */

/** Firestore me signup save karta hai — yahi database ka asli write hai. */
async function saveToFirestore(data: {
  name: string;
  email: string;
  mobile: string;
  option: string;
  message: string;
}) {
  await addDoc(collection(db, "waitlist"), {
    ...data,
    // Har naya signup pending se shuru hota hai — admin panel ke Waitlist
    // tab se Accept (active) ya Invite karke status badal sakte ho.
    status: "pending",
    createdAt: serverTimestamp(),
    joinedAt: new Date().toISOString().slice(0, 10),
  });
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    mobile?: string;
    option?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const mobile = (body.mobile ?? "").trim();
  const option = (body.option ?? "").trim();
  // Message optional hai — client se aata hua text 1000 chars me cap karke
  // Firestore aur emails dono me yahi store hota hai.
  const message = (body.message ?? "").trim().slice(0, 1000);

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name and email." },
      { status: 400 }
    );
  }

  // 1) Pehle database me save — ye zaroori hai.
  try {
    await saveToFirestore({ name, email, mobile, option, message });
  } catch (err) {
    console.error("Firestore write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your signup. Please try again." },
      { status: 500 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    // Database me save ho chuka hai — email sirf notification hai, isliye
    // SMTP missing hone par bhi signup successful maana jaata hai.
    console.warn("SMTP env missing — signup Firestore me save ho gaya, email nahi gaya.");
    return NextResponse.json({ ok: true });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const from = `"Marquee Website" <${SMTP_USER}>`;
  const details = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Mobile No: ${mobile || "-"}`,
    `Option: ${option || "-"}`,
    `Message: ${message || "-"}`,
  ].join("\n");
  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Mobile No", value: mobile },
    { label: "Option", value: option },
    { label: "Message", value: message },
  ];

  try {
    // 1) Owner ko naye signup ka data
    await transporter.sendMail({
      from,
      to: NOTIFY_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `New Log In signup — ${name}`,
      text: details,
      html: emailHtml({
        title: `New Log In signup — ${name}`,
        intro: "Aapki website par kisi naye user ne Log In form bhara hai. Details neeche hain:",
        rows,
        note: `Reply karne ke liye seedha is email ka use karo — Reply-To me user ka address (${escapeHtml(email)}) hai.`,
      }),
    });

    // 2) User ko uski Gmail par — uska data + confirmation
    await transporter.sendMail({
      from,
      to: email,
      replyTo: NOTIFY_EMAIL || SMTP_USER,
      subject: `You're on the list, ${name}!`,
      text: [
        `Hi ${name},`,
        "",
        "Thanks for signing up! Here's the details we received:",
        "",
        details,
        "",
        "We'll reach out soon. 🎬",
      ].join("\n"),
      html: emailHtml({
        title: `You're on the list, ${name}!`,
        intro: "Thanks for signing up! Here are the details we received from you:",
        rows,
        note: "We'll reach out soon. 🎬",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Signup database me already save hai — email fail hone par bhi
    // user ko error dikhana sahi nahi, isliye sirf log karte hain.
    console.warn("Signup saved in Firestore, but email could not be sent:", err);
    return NextResponse.json({ ok: true });
  }
}


