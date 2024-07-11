import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../core/helpers";

export default function EmployerRoute() {
  console.log(isAuth());
  return isAuth() &&
    isAuth().role === "Employer" &&
    isAuth().isVerified === true ? (
    <Outlet />
  ) : (
    <Navigate to="/employer-reg" />
  );
}
