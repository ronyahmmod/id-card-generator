import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeFormModal from "../components/employe/EmployeFormModal";

const EmployeList = () => {
  const [employes, setEmployes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [selectedEmployes, setSelectedEmployes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const employePerPage = 5;

  // Fetch employes
  const fetchEmployes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/employes");
      setEmployes(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  useEffect(() => {
    const filtered = employes.filter((employe) =>
      employe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployes(filtered);
    setCurrentPage(1);
  }, [search, employes]);
  const toggleSelectedEmploye = (id) => {
    setSelectedEmployes((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const openAddModal = () => {
    setSelectedEmploye(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  const openEditModal = (employe) => {
    setSelectedEmploye(employe);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure want to delete?");
    if (!confirmDelete) return;
    try {
      axios.delete(`http://localhost:4000/api/v1/employes/${id}`);
      fetchEmployes();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (data) => {
    try {
      /*--------- 1. flat payload তৈরি ---------*/
      const payload = {
        ...data.personal, // name, email …
        ...data.photo, // file, preview, photoUrl, photoPublicId
      };

      /* education আলাদা কারণ এটা array */
      const hasEducation =
        Array.isArray(data.education) && data.education.length;

      /*--------- 2. FormData build ---------*/
      const formData = new FormData();

      // text / scalar ফিল্ড
      for (const key in payload) {
        if (!payload[key]) continue;

        if (key === "file") {
          formData.append("photoFile", payload.file); // <— Multer expects this
        } else if (key !== "preview") {
          // preview front-end-এর জন্যই
          formData.append(key, payload[key]);
        }
      }

      // education (array) ফিল্ড
      if (hasEducation) {
        formData.append("education", JSON.stringify(data.education));
      }

      /*——— 3. Axios call ———*/
      const url =
        formMode === "add"
          ? "http://localhost:4000/api/v1/employes"
          : `http://localhost:4000/api/v1/employes/${data._id}`;

      await axios({
        method: formMode === "add" ? "post" : "patch",
        url,
        data: formData,
        timeout: 30000, // 30 s timeout; চাইলে বাড়ান
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        formMode === "add"
          ? "Employee added successfully."
          : "Employee updated successfully."
      );
      fetchEmployes(); // list refresh
      setIsFormOpen(false); // modal বন্ধ (থাকলে)
      setSelectedEmploye(false);
    } catch (err) {
      console.error("Submit error ➜", err);
      alert(
        err.response?.data?.message ||
          "Something went wrong while saving the employee."
      );
    }
  };

  const indexOfLastEmploye = currentPage * employePerPage;
  const indexOfFirstEmploye = indexOfLastEmploye - employePerPage;
  const currentEmployes = filteredEmployes.slice(
    indexOfFirstEmploye,
    indexOfLastEmploye
  );
  const totalPages = Math.ceil(filteredEmployes.length / employePerPage);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employe List</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Employ
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by name or mobile"
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p className="text-2xl">Loading</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Select</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Designation</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployes.map((employe) => (
              <tr key={employe._id}>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedEmployes.includes(employe._id)}
                    onChange={() => toggleSelectedEmploye(employe._id)}
                  />
                </td>
                <td className="p-2 border">{employe.name}</td>
                <td className="p-2 border">{employe.designation}</td>
                <td className="p-2 border">{employe.subject}</td>
                <td className="p-2 border">{employe.phone}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500 cursor-pointer"
                    onClick={() => {
                      openEditModal(employe);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(employe._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
      <EmployeFormModal
        open={isFormOpen}
        onSubmit={handleSubmit}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedEmploye(null);
        }}
        initialData={selectedEmploye}
        mode={formMode}
      />
    </div>
  );
};

export default EmployeList;
