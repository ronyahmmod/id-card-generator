import React, { useState } from "react";

const defaultEdu = {
  examName: "",
  examYear: "",
  institutionName: "",
  authority: "",
  result: "",
  base: "",
};

const EducationForm = ({ data, update }) => {
  const [education, setEducation] = useState(data);

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    update(updated);
  };

  const handleAdd = () => {
    const updated = [...education, { ...defaultEdu }];
    setEducation(updated);
    update(updated);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    update(updated);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(defaultEdu).map((key) => (
                <th key={key} className="p-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </th>
              ))}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu, index) => (
              <tr key={index} className="even:bg-gray-50">
                {Object.entries(defaultEdu).map(([key, _]) => (
                  <td key={key} className="p-1">
                    <input
                      type="text"
                      value={edu[key]}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </td>
                ))}
                <td className="p-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ➕ Add Education
      </button>
    </div>
  );
};

export default EducationForm;
