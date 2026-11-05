/**
 * AdminGate — `/admin` ke liye server component.
 *
 * `AdminApp` (client component) ko server component ke children ke roop me
 * render karne ke liye istemal hota hai. Login wall andar client-compo-
 * nent(h) hai, taaki wahan `auth` + `onAuthStateChanged` browser me hi
 * chal sake. Server par `auth` ka koi use nahi hai.
 */

import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AdminGate({ children }: Props) {
  return <>{children}</>;
}
