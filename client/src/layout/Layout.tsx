import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

function Layout() {
  return (
    <section>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default Layout;
