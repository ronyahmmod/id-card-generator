import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editStudent, setEditStudent] = useState(null);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/students");
      setStudents(res.data.data);
      setFilteredStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.studentId.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [search, students]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:4000/api/v1/students/${editStudent._id}`,
        editStudent
      );
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Students List</h2>
        <button
          onClick={() => navigate("/add-student")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Student
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {editStudent && (
        <form
          onSubmit={handleEditSubmit}
          className="bg-yellow-100 p-4 mb-4 rounded"
        >
          <h3 className="font-bold mb-2">Edit Student</h3>
          <input
            type="text"
            name="fullName"
            value={editStudent.fullName}
            onChange={handleEditChange}
            placeholder="Full Name"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="studentId"
            value={editStudent.studentId}
            onChange={handleEditChange}
            placeholder="Student ID"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            value={editStudent.category}
            onChange={handleEditChange}
            placeholder="Category"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="session"
            value={editStudent.session}
            onChange={handleEditChange}
            placeholder="Session"
            className="border p-2 mb-2 w-full"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditStudent(null)}
              className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mb-4">
        <button
          disabled={selectedStudents.length === 0}
          onClick={() =>
            navigate("/generate-id", { state: { ids: selectedStudents } })
          }
          className={`px-4 py-2 rounded text-white ${
            selectedStudents.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Generate ID for Selected
        </button>
      </div>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Select</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Session</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student._id}>
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => toggleSelectStudent(student._id)}
                />
              </td>
              <td className="p-2 border">{student.fullName}</td>
              <td className="p-2 border">{student.studentId}</td>
              <td className="p-2 border">{student.category}</td>
              <td className="p-2 border">{student.session}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => setEditStudent(student)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsList;
