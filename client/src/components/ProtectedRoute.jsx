// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;
  const user = jwtDecode(token);
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
}
