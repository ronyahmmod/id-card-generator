// CollegeInfoForm.jsx
import React, { useState } from "react";
import axios from "axios";

const CollegeInfoForm = () => {
  const [info, setInfo] = useState({
    name: "",
    address: "",
    principalName: "",
  });
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(info).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (logo) data.append("logo", logo);
    if (signature) data.append("signature", signature);

    try {
      await axios.post("http://localhost:4000/api/v1/colleges", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("College Info Saved!");
    } catch (err) {
      console.error("Error saving college info:", err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">College Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="College Name"
          value={info.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={info.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="principalName"
          placeholder="Principal Name"
          value={info.principalName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <label className="block">College Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="border p-2 w-full"
        />
        <label className="block">Principal Signature:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSignature(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Info
        </button>
      </form>
    </div>
  );
};

export default CollegeInfoForm;
