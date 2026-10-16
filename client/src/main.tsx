import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Homepage from "./pages/common/Homepage.tsx";
import Collectionspage from "./pages/common/Collectionspage.tsx";
import Aboutpage from "./pages/common/Aboutpage.tsx";
import Login from "./pages/common/Login.tsx";
import Register from "./pages/common/Register.tsx";
import ProductDetail from "./pages/common/ProductDetail.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Profile from "./pages/common/Profile.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import ResetPasswordForm from "./pages/common/ResetPasswordForm.tsx";
import ExternalForgotPasswordForm from "./components/profile/ExternalForgotPasswordForm.tsx";
import ProductFilter from "./pages/common/ProductFilter.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import ProductCreate from "./pages/admin/ProductCreate.tsx";
import ProductEdit from "./pages/admin/ProductEdit.tsx";
import ProductsPage from "./pages/admin/Products.tsx";

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
        path: "/products",
        element: <ProductFilter />,
      },

      {
        path: "/products/filters",
        element: <ProductFilter />,
      },

      {
        path: "/products/:id",
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
        path: "/forgot-password",
        element: <ExternalForgotPasswordForm />,
      },

      {
        path: "/reset-password/:token",
        element: <ResetPasswordForm />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/create-products",
        element: <ProductCreate />,
      },
      {
        path: "/admin/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/edit-products/:id",
        element: <ProductEdit />,
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
