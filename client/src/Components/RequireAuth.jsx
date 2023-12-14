import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
