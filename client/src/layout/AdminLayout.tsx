import SideBar from "@/pages/admin/SideBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <section>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </section>
  );
}

export default AdminLayout;
