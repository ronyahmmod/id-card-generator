import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import CollegeFormModal from "../components/CollegeFormModal";

const CollegeList = () => {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");

  const collegePerPage = 5;

  const fetchColleges = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/colleges");
      setColleges(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching colleges", error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredColleges(filtered);
    setCurrentPage(1);
  }, [search, colleges]);

  const openAddModal = () => {
    setSelectedCollege(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  const openEditModal = (college) => {
    setSelectedCollege(college);
    setFormMode("Edit");
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure want to delete?");
    if (!confirmDelete) return;
    try {
      axios.delete(`http://localhost:4000/api/v1/colleges/${id}`);
      fetchColleges();
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleSelectedCollege = (id) => {
    setSelectedColleges((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      if (formMode === "add") {
        await axios.post("http://localhost:4000/api/v1/colleges", formData);
      } else {
        await axios.patch(
          `http://localhost:4000/api/v1/colleges/${data._id}`,
          formData
        );
      }

      if (formMode === "add") {
        alert("College added successfully");
      } else {
        alert("College updated successfully");
      }

      fetchColleges();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submittin form", error);
    }
  };
  const indexOfLastCollege = currentPage * collegePerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegePerPage;
  const currentColleges = filteredColleges.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  );
  const totalPages = Math.ceil(filteredColleges.length / collegePerPage);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">College List</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          onClick={openAddModal}
        >
          Add College Info (New version of college)
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by name or id"
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
              <th className="p-2 border">College Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Principal Name</th>
              <th className="p-2 border">Logo</th>
              <th className="p-2 border">Principal Sign</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentColleges.map((college) => (
              <tr key={college._id}>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedColleges.includes(college._id)}
                    onChange={() => toggleSelectedCollege(college._id)}
                  />
                </td>
                <td className="p-2 border">{college.name}</td>
                <td className="p-2 border">{college.email}</td>
                <td className="p-2 border">{college.phone}</td>
                <td className="p-2 border">{college.address}</td>
                <td className="p-2 border">{college.principalName}</td>
                <td className="p-2 border">
                  <img src={college.logoUrl} alt="College Logo" />
                </td>
                <td className="p-2 border">
                  <img src={college.principalSignatureUrl} alt="College Logo" />
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500 cursor-pointer"
                    onClick={() => {
                      openEditModal(college);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(college._id)}
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
      <CollegeFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCollege(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={selectedCollege}
        mode={formMode}
      />
    </div>
  );
};

export default CollegeList;
