import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Login from "./pages/Login/Login";
import Home from './pages/Home';
import SideBar from './components/SideBar';
import "./index.css";

const isAuthenticated = () => {
  return true;
};

const ProtectedRoute = ({ element }) => {
  if (isAuthenticated()) {
    return (
        <div>
            <SideBar element={element}/>
        </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
    path: '/home',
    element: (
      <ProtectedRoute
        element={Home}
      />
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);