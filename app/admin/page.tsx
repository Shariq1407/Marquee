import AdminApp from "@/admin/AdminApp";
import AdminGate from "@/admin/AdminGate";

/**
 * Route shim — Next.js ko `/admin` route ke liye ye file chahiye.
 * Poora admin panel code `admin/` folder me hai (AdminApp, AdminShell,
 * views, ui atoms aur data).
 *
 * AdminGate server component hai, jisme AdminApp client component ko
 * children ke roop me render kiya gaya hai — isliye login wall bas
 * portal se hi dikhta hai.
 */
export default function AdminPage() {
  return <AdminGate><AdminApp /></AdminGate>;
}
