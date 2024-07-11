import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../core/helpers";

export default function AdminRoute() {
  console.log(isAuth());
  return isAuth() && isAuth().role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
