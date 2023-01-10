import * as React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  console.log(token);
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
