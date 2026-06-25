import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Shoppage from "./pages/Shoppage.tsx";
import Collectionspage from "./pages/Collectionspage.tsx";
import Aboutpage from "./pages/Aboutpage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import ResetPasswordForm from "./pages/ResetPasswordForm.tsx";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop/123",
        element: <ProductDetail />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/reset-password",
        element: <ResetPasswordForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
