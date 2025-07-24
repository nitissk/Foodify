import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Layout from "../features/restaurants/components/layout/Layout";

import RestaurantManagerLanding from "../features/restrauntManager/LandingPage/RestaurantManagerLanding";

import ErrorPage from "../features/auth/components/ErrorPage";

import OrderManagmentPage from "../features/admin/orders/OrderManagmentPage";
import Dashboard from "../features/admin/dashboard/Dashboard";

import Home from "../features/restaurants/pages/Home";
import Menu from "../features/restaurants/pages/Menu";
import Orders from "../features/restaurants/pages/Orders";
import RestaurantInfo from "../features/restaurants/pages/RestaurantInfo";
import Notifications from "../features/restaurants/pages/Notifications";

import ManagerLoginPage from "../features/manager/Login";
import ManagerSignupPage from "../features/manager/Register";
import ForgotPassword from "../features/manager/ForgotPassword";
import ResetPasswordPage from "../features/manager/ResetPassword";
import CreateRestaurantPage from "../features/manager/CreateRestaurantPage";

import ProtectedRoute from "../routes/ProtectedRoute"; // Adjust the path as necessary
import ManagerProfile from "../features/restaurants/pages/ManagerProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/restaurant-manager" replace /> },
    ],
  },
  // Public Auth-related routes for managers
  {
    path: "/manager",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ManagerLoginPage /> },
      { path: "register", element: <ManagerSignupPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/reset-password/:token", element: <ResetPasswordPage />
  },

  {
    path: "/restaurant-manager",
    element: <RestaurantManagerLanding />,
  },


  // PROTECTED ROUTES BELOW THIS POINT
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />, 
        children: [
          { index: true, element: <Dashboard /> },
          { path: "orders", element: <OrderManagmentPage /> },
        ],
      },
    ],
  },

  {
    path: "/create-restaurant",
    element: <ProtectedRoute />, 
    children: [
      { index: true, element: <CreateRestaurantPage /> },
    ]
  },

  {
    path: "/restaurant",
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ), // Layout is rendered if authenticated
        children: [
          { index: true, element: <Home /> },
          { path: "menu", element: <Menu /> },
          { path: "orders", element: <Orders /> },
          { path: "restaurant-info", element: <RestaurantInfo /> },
          { path: "restaurant-info", element: <RestaurantInfo /> },
          { path: "notifications", element: <Notifications /> },
          { path: "manager-info", element: <ManagerProfile /> },
        ],
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;





/* 

//!  unprotected route

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Layout from "../features/restaurants/components/layout/Layout";

import RestaurantManagerLanding from "../features/restrauntManager/LandingPage/RestaurantManagerLanding";

import ErrorPage from "../features/auth/components/ErrorPage";

import OrderManagmentPage from "../features/admin/orders/OrderManagmentPage";
import Dashboard from "../features/admin/dashboard/Dashboard";

import Home from "../features/restaurants/pages/Home";
import Menu from "../features/restaurants/pages/Menu";
import Orders from "../features/restaurants/pages/Orders";
import RestaurantInfo from "../features/restaurants/pages/RestaurantInfo";
import Notifications from "../features/restaurants/pages/Notifications";

import ManagerLoginPage from "../features/manager/Login";
import ManagerSignupPage from "../features/manager/Register";
import ForgotPassword from "../features/manager/ForgotPassword";
import ResetPasswordPage from "../features/manager/ResetPassword";
import CreateRestaurantPage from "../features/manager/CreateRestaurantPage";

// ProtectedRoute is no longer needed as all routes will be unprotected
// import ProtectedRoute from "../routes/ProtectedRoute"; 
import ManagerProfile from "../features/restaurants/pages/ManagerProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/restaurant-manager" replace /> },
    ],
  },
  // Public Auth-related routes for managers
  {
    path: "/manager",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ManagerLoginPage /> },
      { path: "register", element: <ManagerSignupPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/reset-password/:token", element: <ResetPasswordPage />
  },

  {
    path: "/restaurant-manager",
    element: <RestaurantManagerLanding />,
  },


  // All routes below this point are now unprotected
  {
    path: "/admin",
    // Replaced ProtectedRoute with Outlet to allow direct access
    element: <Outlet />, 
    children: [
      {
        element: <AdminLayout />, 
        children: [
          { index: true, element: <Dashboard /> },
          { path: "orders", element: <OrderManagmentPage /> },
        ],
      },
    ],
  },

  {
    path: "/create-restaurant",
    // Replaced ProtectedRoute with Outlet to allow direct access
    element: <Outlet />, 
    children: [
      { index: true, element: <CreateRestaurantPage /> },
    ]
  },

  {
    path: "/restaurant",
    // Replaced ProtectedRoute with the Layout component directly
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ), 
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "orders", element: <Orders /> },
      { path: "restaurant-info", element: <RestaurantInfo /> },
      { path: "notifications", element: <Notifications /> },
      { path: "manager-info", element: <ManagerProfile /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;



*/