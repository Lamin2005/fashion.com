import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <section>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-400">
            &copy; 2023 FASHION. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

export default Layout;
