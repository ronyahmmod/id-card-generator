import React, { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  address: "",
  logoUrl: "",
  principalName: "",
  principalSignatureUrl: "",
  email: "",
  phone: "",
};

const CollegeFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode = "add",
}) => {
  console.log(isOpen);
  const [formData, setFormData] = useState(emptyForm);
  useEffect(() => {
    if (isOpen) {
      if (initialData && Object.keys(initialData).length > 0) {
        setFormData({
          ...formData,
          ...initialData,
          logoFile: null,
          signFile: null,
        });
      } else {
        setFormData(emptyForm);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 max-h-[90vh] overflow-y-auto rounded shadow-lg w-full max-w-6xl relative">
        <h2 className="text-xl font-semibold mb-6">
          {mode === "add"
            ? "Add New Version Of College"
            : "Edit Current College"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-x-6 gap-y-4"
        >
          {/* Field Pair */}
          {[
            ["College Name", "name", true],
            ["College Address", "address", true],
            ["Email", "email", true],
            ["Phone", "phone", true],
          ].map(([label, name, required]) => (
            <div key={name} className="flex items-center w-[48%]">
              <label className="w-40 text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="flex-1 border p-2 rounded-"
              />
            </div>
          ))}

          {formData.logoUrl && (
            <div className="flex items-center w-[48%]">
              <label className="w-40 text-sm font-medium">College Logo</label>
              <img
                src={formData.logoUrl}
                alt="Current Logo"
                className="w-30 h-30 object-cover rounded"
              />
            </div>
          )}
          <div className="flex items-center w-[48%]">
            <label className="w-40 text-sm font-medium">
              Upload College Logo
            </label>
            <input
              type="file"
              name="logoFile"
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {formData.principalSignatureUrl && (
            <div className="flex items-center w-[48%]">
              <label className="w-40 text-sm font-medium">
                Principal Signature
              </label>
              <img
                src={formData.principalSignatureUrl}
                alt="Principal Signature"
                className="w-30 h-30 object-cover rounded"
              />
            </div>
          )}
          <div className="flex items-center w-[48%]">
            <label className="w-40 text-sm font-medium">
              Upload Principal Signature
            </label>
            <input
              type="file"
              name="signFile"
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {mode === "add" ? "Add New Version" : "Edit College Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeFormModal;
