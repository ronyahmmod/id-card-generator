import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeFormModal from "../components/employee/EmployeeFormModal";
import EmployeePrintConfigModal from "../components/employee/EmployeePrintConfigModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [configText, setConfigText] = useState({ title: "", subTitle: "" });
  //   State for exporting employee list [like pdf, xl, csv ets]
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const employeePerPage = 5;

  // Fetch employes
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/employees");
      setEmployees(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employe) =>
      employe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [search, employees]);

  const toggleSelectedEmployee = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const handleChangeConfig = (e) => {
    const { name, value } = e.target;
    setConfigText((prev) => ({ ...prev, [name]: value }));
  };
  const downloadEmployeeList = (selectedFields) => {
    return async function () {
      const res = await fetch(
        "http://localhost:4000/api/v1/employees/generate-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            configText: configText,
            selectedFields: selectedFields,
          }),
        }
      );

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "teacher_list.pdf";
      link.click();
    };
  };
  const openAddModal = () => {
    setSelectedEmployee(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const generateIdCards = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/employees/generate-id-cards",
        {
          selectedEmployees,
        },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student-id-cards.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure want to delete?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/employees/${id}`);
      alert("Employee delete successfully");
      fetchEmployees();
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
          ? "http://localhost:4000/api/v1/employees"
          : `http://localhost:4000/api/v1/employees/${data._id}`;

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
      fetchEmployees(); // list refresh
      setIsFormOpen(false); // modal বন্ধ (থাকলে)
      setSelectedEmployee(false);
    } catch (err) {
      console.error("Submit error ➜", err);
      alert(
        err.response?.data?.message ||
          "Something went wrong while saving the employee."
      );
    }
  };

  const indexOfLastEmployee = currentPage * employeePerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeePerPage);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Employe List</h2>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add Employ
          </button>
          <button
            onClick={() => {
              setIsConfigModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Employee Print Configuaration
          </button>
          <button
            onClick={generateIdCards}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Generate ID Cards
          </button>
        </div>
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
            {currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee._id)}
                    onChange={() => toggleSelectedEmployee(employee._id)}
                  />
                </td>
                <td className="p-2 border">{employee.name}</td>
                <td className="p-2 border">{employee.designation}</td>
                <td className="p-2 border">{employee.subject}</td>
                <td className="p-2 border">{employee.phone}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500 cursor-pointer"
                    onClick={() => {
                      openEditModal(employee);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(employee._id)}
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
      <EmployeeFormModal
        open={isFormOpen}
        onSubmit={handleSubmit}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedEmployee(null);
        }}
        initialData={selectedEmployee}
        formMode={formMode}
      />

      {/* Employe Config Modal */}
      <EmployeePrintConfigModal
        open={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
        }}
        modalTitle="Controll your employees exports."
        onSubmit={downloadEmployeeList}
        configText={configText}
        handleChangeConfig={handleChangeConfig}
      />
    </div>
  );
};

export default EmployeeList;
