"use client";

import { useState } from "react";
import AdminShell, { type NavKey } from "@/admin/AdminShell";
import Overview from "@/admin/Overview";
import RequestView from "@/admin/RequestView";
import WaitlistView from "@/admin/WaitlistView";
import TitlesView from "@/admin/TitlesView";
import SettingsView from "@/admin/SettingsView";

/**
 * Admin panel ka main app — saara admin code isi `admin/` folder me hai.
 * Taaki isse `/admin` route ke server component ke children ke roop
 * me render kiya ja sake (AdminGate server component hai).
 */
export default function AdminApp() {
  const [view, setView] = useState<NavKey>("overview");

  return (
    <AdminShell active={view} onNavigate={setView}>
      {view === "overview" && <Overview />}
      {view === "request" && <RequestView />}
      {view === "waitlist" && <WaitlistView />}
      {view === "titles" && <TitlesView />}
      {view === "settings" && <SettingsView />}
    </AdminShell>
  );
}
