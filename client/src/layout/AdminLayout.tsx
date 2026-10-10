import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import SideBar from "@/components/admin/SideBar";

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      <SideBar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <Menu size={22} />
          </button>

          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-serif text-sm font-bold text-zinc-950">
              P
            </div>
            <span className="truncate font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Fashion.com
            </span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="ml-auto rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <Bell size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
}

export default AdminLayout;
