import React, { useContext } from "react";
import { AppContext } from "../src/context/AppContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/home" replace />;

  return children;
};

export default AdminRoute;
