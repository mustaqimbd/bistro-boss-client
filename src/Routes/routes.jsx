import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Order from "../Pages/Order";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PriveteRoute from "./PriveteRoute";
import Secret from "../Pages/Shared/Secret";
import Dashboard from "../Layout/Dashboard";
import Mycard from "../Pages/dashboard/card/Mycard";
import PaymentHistory from "../Pages/dashboard/payment/PaymentHistory";
import Allusers from "../Pages/dashboard/AllUsers/Allusers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/order/:category',
                element: <Order />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: 'secret',
                element: <PriveteRoute><Secret /></PriveteRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PriveteRoute><Dashboard /></PriveteRoute>,
        children: [
            {
                path: 'mycart',
                element: <Mycard />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            {
                path: 'all-users',
                element: <Allusers />
            }
        ]
    }
])
export default router;