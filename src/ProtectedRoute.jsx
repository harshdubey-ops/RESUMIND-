import { Navigate } from "react-router-dom";

function hasExpiredToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token || hasExpiredToken(token)) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;