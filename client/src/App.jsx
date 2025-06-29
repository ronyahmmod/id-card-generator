import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import CollegeInfoForm from "./pages/CollegeInfoForm";
import IDCardDownload from "./pages/IDCardDownload";
import CollegeList from "./pages/CollegeList";
import AppLayout from "./components/AppLayout";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import OauthSuccess from "./pages/OAuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import AdmissionForm from "./pages/AdmissionForm";
import SampleGrid from "./pages/SampleGrid";
import AboutMe from "./pages/AboutMe";
import Unauthorized from "./pages/UnAuthorized";
import FormDemoPage from "./pages/FormDemoPage";
import DemoForm from "./pages/DemoForm";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Testing Routes */}
          <Route path="/employees-test" element={<EmployeeList />} />
          <Route path="/demo-form" element={<FormDemoPage />} />
          <Route path="/demo-form1" element={<DemoForm />} />
          <Route path="/data-grid" element={<SampleGrid />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/students-demo" element={<StudentList />} />

          {/* Protected for All Authenticated Roles (student, teacher, staff, admin) */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "teacher", "staff", "student"]}
              >
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about-me" element={<AboutMe />} />
          </Route>

          {/* Admin-only Route Group */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/college-info" element={<CollegeInfoForm />} />
            <Route path="/download-id-cards" element={<IDCardDownload />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Route>

          {/* Student-only */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admission-form" element={<AdmissionForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
