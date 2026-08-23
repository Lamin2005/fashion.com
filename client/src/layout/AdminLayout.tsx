import SideBar from "@/components/SideBar";
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
