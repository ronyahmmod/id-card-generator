import {
  FaUserGraduate,
  FaSchool,
  FaHome,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { MdExpandMore, MdInfo } from "react-icons/md";

export const sidebarConfig = {
  student: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      label: "Admission Form",
      path: "/admission-form",
      icon: FaWpforms,
    },
    {
      label: "About Me",
      path: "/about-me",
      icon: FaUser,
    },
  ],
};

// export const sidebarConfig = [
//   {
//     label: "Dashboard",
//     path: "/",
//     icon: FaHome,
//   },
//   {
//     label: "Students",
//     icon: FaUserGraduate,
//     children: [
//       { label: "All Students", path: "/students" },
//       { label: "Add Student", path: "/students/add" },
//     ],
//   },
//   {
//     label: "College Info",
//     icon: FaSchool,
//     children: [
//       { label: "College List", path: "/colleges" },
//       { label: "Add College", path: "/colleges/add" },
//     ],
//   },
//   {
//     label: "Employes",
//     icon: FaChalkboardTeacher,
//     children: [
//       { label: "Employe List", path: "/employes" },
//       { label: "Add Employef", path: "/employes/add" },
//     ],
//   },
//   {
//     label: "About",
//     path: "/about",
//     icon: MdInfo,
//   },
// ];
