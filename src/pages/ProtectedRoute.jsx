import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userState.user);

  if (!user) {
    return <Navigate to="/landing" replace />;
  }
  return children;
};

export default ProtectedRoute;
