import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link
        to="/add-student"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add New Student
      </Link>
      <Link
        to="/student-list"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4"
      >
        + List of Students
      </Link>
    </div>
  );
}
