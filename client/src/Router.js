import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";
import AdminCategory from "./admin/AdminCategory";
import AdminType from "./admin/AdminType";
import App from "./App";
import AdminRoute from "./core/AdminRoute";
import EmployerRoute from "./core/EmployerRoute";
import PrivateRoute from "./core/PrivateRoute";

import StudentRoute from "./core/StudentRoute";
import Employer from "./pages/Employer/Employer";
import EmployerProfile from "./pages/Employer/EmployerProfile";
import EmployerReg from "./pages/Employer/EmployerReg";
import Email from "./pages/forgot password/Email";
import ResetPassword from "./pages/forgot password/ResetPassword";
import VerifyOtp from "./pages/forgot password/VerifyOtp";
import Login from "./pages/Login";
import Postjob from "./pages/Employer/Postjob";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Cvupload from "./pages/Employee/Cvupload";
import AdminUsers from "./admin/AdminUsers";
import AdminUserDetails from "./admin/AdminUserDetails";
import Company from "./pages/company/Company";
import CompanyReg from "./pages/company/CompanyReg";
import AdminSkills from "./admin/AdminSkills";
import AdminPerks from "./admin/AdminPerks";
import EmployerMyjobs from "./pages/Employer/EmployerMyjobs";
import EditJob from "./pages/Employer/EditJob";
import ViewJob from "./pages/Job/ViewJob";
import AuthRoute from "./core/AuthRoute";
import Appliedjobs from "./pages/Employee/Appliedjobs";
import Applicants from "./pages/Employer/Applicants";
import ApplicantCV from "./pages/Employer/ApplicantCV";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" exact element={<App />} />
        <Route path="home" exact element={<App />} />
        <Route path="register" exact element={<Register />} />
        <Route path="login" exact element={<Login />} />
        <Route path="/forgot-password" exact element={<Email />} />
        <Route path="/otp-verification/:userId" exact element={<VerifyOtp />} />
        <Route path="/reset-password" exact element={<ResetPassword />} />
        <Route path="/:id" exact element={<Company />} />
        <Route path="job/:id" exact element={<ViewJob />} />
        <Route element={<AuthRoute />}>
          <Route path="register-company" exact element={<CompanyReg />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="employer-reg" exact element={<EmployerReg />} />
        </Route>
        <Route element={<EmployerRoute />}>
          <Route path="/employer" exact element={<Employer />} />
          <Route path="/employer/profile" exact element={<EmployerProfile />} />
          <Route path="/employer/post-job" exact element={<Postjob />} />
          <Route path="/employer/all-jobs" exact element={<EmployerMyjobs />} />
          <Route path="/employer/jobs/:id" exact element={<EditJob />} />
          <Route path="/employer/applicants" exact element={<Applicants />} />
          <Route
            path="/employer/applicant/:jobid/:id"
            exact
            element={<ApplicantCV />}
          />
        </Route>
        <Route element={<StudentRoute />}>
          <Route path="/employee" exact element={<Student />} />
          <Route path="/employee/resume-upload" exact element={<Cvupload />} />
          <Route
            path="/employee/applied-jobs"
            exact
            element={<Appliedjobs />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/admin/categories" exact element={<AdminCategory />} />
          <Route path="/admin/types" exact element={<AdminType />} />
          <Route path="/admin/users" exact element={<AdminUsers />} />
          <Route path="/admin/skills" exact element={<AdminSkills />} />
          <Route path="/admin/perks" exact element={<AdminPerks />} />
          <Route path="/admin/users/:id" exact element={<AdminUserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
