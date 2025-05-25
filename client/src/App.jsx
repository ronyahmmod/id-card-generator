import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import CollegeInfoForm from "./pages/CollegeInfoForm";
import IDCardDownload from "./pages/IDCardDownload";
import CollegeList from "./pages/CollegeList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/college-info" element={<CollegeInfoForm />} />
        <Route path="/download-id-cards" element={<IDCardDownload />} />
        <Route path="/college-list" element={<CollegeList />} />
      </Routes>
    </Router>
  );
}

export default App;
