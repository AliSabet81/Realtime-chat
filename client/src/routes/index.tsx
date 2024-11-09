/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

// Pages
const LoginPage = React.lazy(() => import("../Pages/login"));
const HomePage = React.lazy(() => import("../Pages/home"));
const RegisterPage = React.lazy(() => import("../Pages/register"));

// Routes
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
};

export const mainRouter = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Navigate to={ROUTES.login} />,
  },
  {
    path: ROUTES.login,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.register,
    element: (
      <Suspense>
        <RegisterPage />
      </Suspense>
    ),
  },
]);
export const userRouter = createBrowserRouter([
  {
    path: ROUTES.home,
    element: (
      <Suspense>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.login,
    element: <Navigate to={ROUTES.home} />,
  },
  {
    path: ROUTES.register,
    element: <Navigate to={ROUTES.home} />,
  },
]);
