import { createBrowserRouter } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Signup from "./signup";

import GuestLayout from "@/components/layouts/guest-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
