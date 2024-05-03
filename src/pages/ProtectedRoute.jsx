import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (false) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
