import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyotpPage from "@/pages/auth/VerifyOtpPage";
import CategoryPage from "@/pages/category/CategoryPage";
import ContactPage from "@/pages/contact/ContactPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import SubscriberPage from "@/pages/subscriber/SubscriberPage";
import FaqsPage from "@/pages/help/FaqsPage";
import HelpPage from "@/pages/help/HelpPage";
import OrdersPage from "@/pages/order/OrdersPage";
import AboutPage from "@/pages/settings/AboutPage";
import ChangePasswordPage from "@/pages/settings/ChangePasswordPage";
import PrivacyPage from "@/pages/settings/PrivacyPage";
import ProfilePage from "@/pages/settings/ProfilePage";
import TermsPage from "@/pages/settings/TermsPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CarBrandPage from "@/pages/CardBrand/CarBrandPage";
import CreateBrandPage from "@/pages/CardBrand/CreateBrandPage";
import ProductsPage from "@/pages/product/ProductsPage";
import CreateProductPage from "@/pages/product/CreateProductPage";
import BuyerPage from "@/pages/user/BuyerPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
       <PrivateRoute>
         <DashboardLayout />
       </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "buyers",
        element: <BuyerPage />,
      },
      {
        path: "categories",
        element: <CategoryPage />,
      },
      {
        path: "car-brands",
        element: <CarBrandPage />,
      },
      {
        path: "add-brand",
        element: <CreateBrandPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "add-product",
        element: <CreateProductPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPage />,
      },
      {
        path: "terms-condition",
        element: <TermsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "faqs",
        element: <FaqsPage />,
      },
      {
        path: "contacts",
        element: <ContactPage />,
      },
      {
        path: "subscribers",
        element: <SubscriberPage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
       <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/signin" replace />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verify-otp",
        element: <VerifyotpPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>This is Not Found Page</h1>
    // element: <NotFoundRoute/>,
  },
]);

export default router;
