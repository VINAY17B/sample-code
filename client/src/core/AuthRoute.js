import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../core/helpers";

export default function AuthRoute() {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
}
