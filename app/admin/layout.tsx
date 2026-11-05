import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Marquee",
  description: "Marquee ka internal admin panel — signups, catalog aur settings.",
  robots: { index: false, follow: false },
};

/** /admin route ko search engines se hide rakhte hain. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
