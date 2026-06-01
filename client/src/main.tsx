import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// App removed: RouterProvider should not receive children
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Shoppage from "./pages/Shoppage.tsx";
import Collectionspage from "./pages/Collectionspage.tsx";
import Aboutpage from "./pages/Aboutpage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/shop",
        element: <Shoppage />,
      },
      {
        path: "/collections",
        element: <Collectionspage />,
      },
      {
        path: "/about",
        element: <Aboutpage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
