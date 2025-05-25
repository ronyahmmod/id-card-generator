import React, { useState, useEffect } from "react";

const emptyForm = {
  fullName: "",
  fatherName: "",
  motherName: "",
  className: "",
  session: "",
  group: "",
  roll: "",
  bloodGroup: "",
  category: "",
  photo: "",
  photoFile: null,
};

const StudentFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode = "add", //"add" or "edit"
}) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      if (initialData && Object.keys(initialData).length > 0) {
        setFormData({ ...emptyForm, ...initialData, photoFile: null });
      } else {
        setFormData(emptyForm);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, photoFile: files[0] }));
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
          {mode === "add" ? "Add New Student" : "Edit Student"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-x-6 gap-y-4"
        >
          {/* Field Pair */}
          {[
            ["Full Name", "fullName", true],
            ["Father's Name", "fatherName", true],
            ["Mother's Name", "motherName", true],
            ["Class Name", "className", true],
            ["Group", "group", true],
            ["Class Roll", "roll", true],
            ["Blood Group", "bloodGroup", false],
            ["Category", "category", false],
            ["Session", "session", false],
          ].map(([label, name, required]) => (
            <div key={name} className="flex items-center w-[48%]">
              <label className="w-40 text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="flex-1 border p-2 rounded"
              />
            </div>
          ))}

          {/* Photo section */}
          {formData.photo && (
            <div className="flex items-center w-[48%]">
              <label className="w-40 text-sm font-medium">Current Photo</label>
              <img
                src={formData.photo}
                alt="Current"
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          )}
          <div className="flex items-center w-[48%]">
            <label className="w-40 text-sm font-medium">Upload Photo</label>
            <input
              type="file"
              name="photoFile"
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
              {mode === "add" ? "Add Student" : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
