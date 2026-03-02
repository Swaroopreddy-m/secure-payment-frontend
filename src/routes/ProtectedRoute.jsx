import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = sessionStorage.getItem("isAuthenticated");
  return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;