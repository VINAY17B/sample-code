import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../core/helpers";

export default function PrivateRoute() {
  return isAuth() &&
    isAuth().role === "Employer" &&
    isAuth().isVerified === false ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
