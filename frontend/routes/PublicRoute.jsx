import React, { useContext } from "react";
import { AppContext } from "../src/context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  return user ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
