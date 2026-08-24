import SideBar from "@/pages/admin/SideBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <section className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <SideBar />

      <main className="flex-1 min-w-0 overflow-y-auto bg-zinc-900 p-6 md:p-8">
        <Outlet />
      </main>
    </section>
  );
}

export default AdminLayout;
