import React from "react";
import axios from "axios";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import RootLayout from "./components/RootLayout/RootLayout";
import HomePage from "./components/HomePage/HomePage";
import AuthProvider from "./store/AuthProvider";

axios.defaults.baseURL = "http://localhost:4000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/homepage",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
