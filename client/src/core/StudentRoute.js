import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../core/helpers";

export default function StudentRoute() {
  console.log(isAuth());
  return isAuth() && isAuth().role === "Employee" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
