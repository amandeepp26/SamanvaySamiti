import { createBrowserRouter, createHashRouter } from "react-router-dom";
import MainLayout from "../pages/Layouts/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../pages/Layouts/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import ClientsDashboard from "../pages/Dashboard/Clients/ClientsDashboard";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApprovedContactRequest from "../pages/Dashboard/Admin/ApprovedContactRequest";
import EditBiodata from "../pages/Dashboard/Clients/EditBiodata";
import ContactRequest from "../pages/Dashboard/Clients/ContactRequest";
import MyFavourites from "../pages/Dashboard/Clients/MyFavourites";
import Logout from "../pages/Dashboard/Clients/Logout";
import Biodatas from "../pages/Biodatas/Biodatas";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import BiodataDetails from "../pages/Biodatas/BiodataDetails";
import AdminRoutes from "../PrivateRoute/AdminRoutes";
import Payment from "../pages/Dashboard/Payment/Payment";
import SuccessStory from "../pages/Dashboard/Admin/SuccessStory";
import GotMarried from "../pages/Dashboard/Clients/GotMarried";
import Blogs from "../pages/Blogs/Blogs";
import OurTeam from "../pages/OurTeam/OurTeam";
import PrivacyPolicy from "../pages/Privacy policy/PrivacyPolicy";
import Users from "../pages/Users/Users";
import CookiesPolicy from "../pages/Cookies Policy/CookiesPolicy";
import TermsConditions from "../pages/Terms & Conditions/TermsConditions";
import ForgotPassword from "../pages/Forgot Password/ForgotPassword";
import ResetPassword from "../pages/Reset Password/ResetPassword";
import MyProfile from "../pages/Dashboard/Clients/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "biodatas",
        element: <Biodatas />,
      },
      {
        path: "/माहिती",
        element: <Blogs />,
      },
      {
        path: "/समिती",
        element: <OurTeam />,
      },
      {
        path: "/वधु-वर",
        // element: <Users />,
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "/आमच्या-बद्दल",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/संपर्क",
        element: <ContactUs />,
      },
      {
        path: "/cookies-policy",
        element: <CookiesPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/biodata/:id",
        // element: <BiodataDetails />,
        element: (
          <PrivateRoute>
            {" "}
            <BiodataDetails />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "register/:id",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            {" "}
            <Payment />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Admin routes
      {
        path: "admin",
        element: (
          <AdminRoutes>
            {" "}
            <AdminDashboard />{" "}
          </AdminRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoutes>
            {" "}
            <ManageUsers />{" "}
          </AdminRoutes>
        ),
      },
      {
        path: "premium",
        element: (
          <AdminRoutes>
            {" "}
            <ApprovedPremium />{" "}
          </AdminRoutes>
        ),
      },
      {
        path: "requested",
        element: (
          <AdminRoutes>
            {" "}
            <ApprovedContactRequest />{" "}
          </AdminRoutes>
        ),
      },
      {
        path: "stories",
        element: (
          <AdminRoutes>
            {" "}
            <SuccessStory />{" "}
          </AdminRoutes>
        ),
      },

      // Clients Routes
      {
        path: "client",
        element: <ClientsDashboard />,
      },
      {
        path: "add",
        element: <EditBiodata />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "request",
        element: <ContactRequest />,
      },
      {
        path: "favourite",
        element: <MyFavourites />,
      },
      {
        path: "got-married",
        element: <GotMarried />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
