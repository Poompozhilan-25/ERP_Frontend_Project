import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found — redirecting to sign-in");
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
