// AddStudent.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    category: "",
    className: "",
    group: "",
    roll: "",
    session: "",
    contact: "",
    fatherName: "",
    motherName: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post("http://localhost:4000/api/v1/students", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error creating student:", err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          className="w-full border p-2"
          value={formData.className}
          onChange={handleChange}
        />
        <input
          type="text"
          name="group"
          placeholder="Group"
          className="w-full border p-2"
          value={formData.group}
          onChange={handleChange}
        />
        <input
          type="text"
          name="roll"
          placeholder="Class Roll"
          className="w-full border p-2"
          value={formData.roll}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="w-full border p-2"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          name="session"
          placeholder="Session"
          className="w-full border p-2"
          value={formData.session}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact Number"
          className="w-full border p-2"
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          name="fatherName"
          placeholder="Father's Name"
          className="w-full border p-2"
          value={formData.fatherName}
          onChange={handleChange}
        />
        <input
          name="motherName"
          placeholder="Mother's Name"
          className="w-full border p-2"
          value={formData.motherName}
          onChange={handleChange}
        />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
