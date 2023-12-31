import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Success from "./components/common/Success";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/success",
        element: <Success />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
