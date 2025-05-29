import React from "react";

const PersonalInfoForm = ({ data, update }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    update({ [name]: value });
  };

  const fields = [
    ["name", "Full Name"],
    ["designation", "Designation"],
    ["department", "Department"],
    ["subject", "Subject"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["secondaryPhone", "Secondary Phone"],
    ["dob", "Date of Birth", "date"],
    ["nid", "NID Number"],
    ["address", "Address"],
    ["joinDate", "Joining Date", "date"],
    ["mpoDate", "MPO Date", "date"],
    ["indexNo", "Index No"],
    ["retiredOn", "Retirement Date", "date"],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(([key, label, type = "text"]) => (
        <div key={key} className={key === "address" ? "md:col-span-2" : ""}>
          <label className="block font-medium text-sm mb-1">{label}</label>
          {key === "address" ? (
            <textarea
              name={key}
              value={data[key]}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded"
            />
          ) : (
            <input
              type={type}
              name={key}
              value={data[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoForm;
