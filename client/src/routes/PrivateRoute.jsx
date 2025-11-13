import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
