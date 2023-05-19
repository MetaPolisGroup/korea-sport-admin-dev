import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import Components from "../components";

const PrivateRoutes = () => {
  const { isLogging, auth } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLogging) return <Components.Loading />;

  return auth.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
