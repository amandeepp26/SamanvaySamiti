import { createBrowserRouter } from "react-router-dom";
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
import ViewBiodata from "../pages/Dashboard/Clients/ViewBiodata";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'biodatas',
                element: <Biodatas />
            },
            {
                path: 'about-us',
                element: <AboutUs />
            },
            {
                path: 'contact-us',
                element: <ContactUs />
            },
            {
                path: '/biodata/:id',
                element: <PrivateRoute> <BiodataDetails /> </PrivateRoute>
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'checkout/:id',
                element: <PrivateRoute> <Payment /> </PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [


            // Admin routes 
            {
                path: 'admin',
                element: <AdminRoutes> <AdminDashboard /> </AdminRoutes>
            },
            {
                path: 'users',
                element: <AdminRoutes> <ManageUsers/> </AdminRoutes>
            },
            {
                path: 'premium',
                element: <AdminRoutes> <ApprovedPremium /> </AdminRoutes> 
            },
            {
                path: 'requested',
                element: <AdminRoutes> <ApprovedContactRequest /> </AdminRoutes>
            },
            {
                path: 'stories',
                element: <AdminRoutes> <SuccessStory /> </AdminRoutes>
            },





            // Clients Routes
            {
                path: 'client',
                element: <ClientsDashboard />
            },
            {
                path: 'add',
                element: <EditBiodata />
            },
            {
                path: 'view',
                element: <ViewBiodata />
            },
            {
                path: 'request',
                element: <ContactRequest />
            },
            {
                path: 'favourite',
                element: <MyFavourites />
            },
            {
                path:'got-married',
                element:<GotMarried/>
            },
            {
                path: 'logout',
                element: <Logout />
            }

        ]
    }
])

export default router;