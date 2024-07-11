import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/employer/profile",
    icon: <FaIcons.FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Jobs Posted",
    path: "/employer/all-jobs",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Post Jobs",
    path: "/employer/post-job",
    icon: <FaIcons.FaRegAddressCard />,
    cName: "nav-text",
  },
  {
    title: "Applicants",
    path: "/employer/applicants",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];

export const AdminSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FiIcons.FiUsers />,
    cName: "nav-text",
  },

  {
    title: "Categories",
    path: "/admin/categories",
    icon: <AiIcons.AiOutlineAppstore />,
    cName: "nav-text",
  },
  {
    title: "Types",
    path: "/admin/types",
    icon: <RiIcons.RiMenuFill />,
    cName: "nav-text",
  },
  {
    title: "Skills",
    path: "/admin/skills",
    icon: <BsIcons.BsColumnsGap />,
    cName: "nav-text",
  },
  {
    title: "Perks",
    path: "/admin/perks",
    icon: <AiIcons.AiFillBuild />,
    cName: "nav-text",
  },
  //This is added by me @Subodh
  {
    title: "Company",
    path: "/register-company",
    icon: <AiIcons.AiOutlineGift />,
    cName: "nav-text",
  },
];

export const StudentSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Resume",
    path: "/employee/resume-upload",
    icon: <BsIcons.BsNewspaper />,
    cName: "nav-text",
  },
  {
    title: "Applied Jobs",
    path: "/employee/applied-jobs",
    icon: <CgIcons.CgWorkAlt />,
    cName: "nav-text",
  },
];
