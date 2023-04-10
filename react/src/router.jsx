import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import App from "./App";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserEdit from "./views/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <UserEdit />,
      },
      {
        path: "/users/new",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
