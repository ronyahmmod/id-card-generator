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

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/data-grid" element={<SampleGrid />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="/admission-form" element={<AdmissionForm />} />
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
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/college-info" element={<CollegeInfoForm />} />
            <Route path="/download-id-cards" element={<IDCardDownload />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
