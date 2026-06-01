import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

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
