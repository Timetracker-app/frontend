import { Navigate } from "react-router-dom";
import useToken from "../features/useToken";

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
