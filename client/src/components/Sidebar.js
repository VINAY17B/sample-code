import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  AdminSidebarData,
  SidebarData,
  StudentSidebarData,
} from "./SidebarData";
import "./Navbar.css";
import { isAuth } from "../core/helpers";
export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const sidedata = () => {
    if (isAuth() && isAuth().role === "Employer") {
      SidebarData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      });
    } else if (isAuth() && isAuth().role === "admin") {
      AdminSidebarData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      });
    } else if (isAuth() && isAuth().role === "Employee") {
      StudentSidebarData.map((item, index) => {
        alert("asdkaskdaskdka");
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      });
    }
  };
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="">
        <Link to="#">
          <div className="menu-hamburger" onClick={showSidebar}>
            <FaIcons.FaBars />
          </div>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <p className="fs-4 mt-4">
            <span className="fw-bold">Job</span>Search
          </p>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              Close <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {isAuth() && isAuth().role === "Employer"
            ? SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })
            : isAuth() && isAuth().role === "admin"
            ? AdminSidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })
            : isAuth() && isAuth().role === "Employee"
            ? StudentSidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
      </nav>
    </>
  );
}
