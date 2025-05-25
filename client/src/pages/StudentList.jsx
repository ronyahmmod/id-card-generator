import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentFormModal from "../components/StudentFormModal";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentsPerPage = 5;

  // Open Add Modal
  const openAddModal = () => {
    setSelectedStudent(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormMode("Edit");
    setIsFormOpen(true);
  };
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
    console.log(id);
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

  // const handleEditChange = (e) => {
  //   setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
  // };

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.patch(
  //       `http://localhost:4000/api/v1/students/${editStudent._id}`,
  //       editStudent
  //     );
  //     setEditStudent(null);
  //     fetchStudents();
  //   } catch (error) {
  //     console.error("Error updating student:", error);
  //   }
  // };

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      if (formMode === "add") {
        await axios.post("http://localhost:4000/api/v1/students", formData);
      } else {
        await axios.patch(
          `http://localhost:4000/api/v1/students/${data._id}`,
          formData
        );
      }
      if (formMode == "add") {
        alert("Student added successfully");
      } else {
        alert("Student update successfully");
      }
      fetchStudents();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const downloadPDF = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/id-cards/generate-id-cards",
        { selectedStudents: selectedStudents },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student-id-cards.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error.message);
    }
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
          onClick={openAddModal}
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

      <div className="mb-4">
        <button
          disabled={selectedStudents.length === 0}
          onClick={() => downloadPDF()}
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
            <th className="p-2 border">Photo</th>
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
              <td className="p-2 border">
                <img
                  src={student.photo}
                  alt="Student"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEditModal(student)}
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
      <StudentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedStudent(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={selectedStudent}
        mode={formMode}
      />
    </div>
  );
};

export default StudentsList;
