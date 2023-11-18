import { createBrowserRouter } from "react-router-dom";

import Signup from "./signup";

import GuestLayout from "@/components/layouts/guest-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [{ path: "/signup", element: <Signup /> }],
  },
]);
