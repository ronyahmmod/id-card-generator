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
    path: "/dashboard",
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
    label: "Teachers/Stuff",
    icon: FaChalkboardTeacher,
    children: [
      { label: "Teacher/Stuff List", path: "/teachers" },
      { label: "Add Teacher/Stuff", path: "/teachers/add" },
    ],
  },
  {
    label: "About",
    path: "/about",
    icon: MdInfo,
  },
];
