import {
  FaUserGraduate,
  FaSchool,
  FaHome,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdExpandMore, MdInfo } from "react-icons/md";

export const sidebarConfig = [
  {
    label: "Dashboard",
    path: "/",
    icon: FaHome,
  },
  {
    label: "Students",
    icon: FaUserGraduate,
    children: [
      { label: "All Students", path: "/students" },
      { label: "Add Student", path: "/students/add" },
    ],
  },
  {
    label: "College Info",
    icon: FaSchool,
    children: [
      { label: "College List", path: "/colleges" },
      { label: "Add College", path: "/colleges/add" },
    ],
  },
  {
    label: "Employes",
    icon: FaChalkboardTeacher,
    children: [
      { label: "Employe List", path: "/employes" },
      { label: "Add Employef", path: "/employes/add" },
    ],
  },
  {
    label: "About",
    path: "/about",
    icon: MdInfo,
  },
];
