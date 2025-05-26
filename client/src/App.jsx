import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import CollegeInfoForm from "./pages/CollegeInfoForm";
import IDCardDownload from "./pages/IDCardDownload";
import CollegeList from "./pages/CollegeList";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route element={<AppLayout />}>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/college-info" element={<CollegeInfoForm />} />
          <Route path="/download-id-cards" element={<IDCardDownload />} />
          <Route path="/colleges" element={<CollegeList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
