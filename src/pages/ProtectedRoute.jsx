import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useToken from "../features/useToken";

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();

  if (token) {
    const decodedToken = jwtDecode(JSON.stringify(token));
    if (decodedToken.role === "admin") {
      return children;
    }
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
