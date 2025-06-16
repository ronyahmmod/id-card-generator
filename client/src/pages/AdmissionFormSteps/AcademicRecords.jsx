import { useState } from "react";

export default function AcademicRecords({ state, dispatch }) {
  const [formData, setFormData] = useState({
    examName: "",
    instituteName: "",
    examYear: "",
    authority: "",
    result: "",
    resultBase: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!formData.examName || !formData.examYear) {
      alert("Exam name and year are required.");
      return;
    }

    if (editIndex !== null) {
      dispatch({
        type: "UPDATE_EDUCATION",
        index: editIndex,
        payload: formData,
      });
      setEditIndex(null);
    } else {
      dispatch({ type: "ADD_EDUCATION", payload: formData });
    }

    // Reset form
    setFormData({
      examName: "",
      instituteName: "",
      examYear: "",
      authority: "",
      result: "",
      resultBase: "",
    });
  };

  const handleEdit = (record, index) => {
    setFormData(record);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE_EDUCATION", index });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Academic Records</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          placeholder="Exam Name"
          value={formData.examName}
          onChange={(e) =>
            setFormData({ ...formData, examName: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Institute Name"
          value={formData.instituteName}
          onChange={(e) =>
            setFormData({ ...formData, instituteName: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Exam Year"
          value={formData.examYear}
          onChange={(e) =>
            setFormData({ ...formData, examYear: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Authority"
          value={formData.authority}
          onChange={(e) =>
            setFormData({ ...formData, authority: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Result"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Result Base (e.g., GPA)"
          value={formData.resultBase}
          onChange={(e) =>
            setFormData({ ...formData, resultBase: e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleAddOrUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editIndex !== null ? "Update Record" : "Add Record"}
      </button>

      {/* Record List */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Record List</h3>
        {state.previousEducation.length === 0 ? (
          <p className="text-gray-500">No records added yet.</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Exam</th>
                <th className="p-2 border">Institute</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Authority</th>
                <th className="p-2 border">Result</th>
                <th className="p-2 border">Base</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.previousEducation.map((edu, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{edu.examName}</td>
                  <td className="p-2 border">{edu.instituteName}</td>
                  <td className="p-2 border">{edu.examYear}</td>
                  <td className="p-2 border">{edu.authority}</td>
                  <td className="p-2 border">{edu.result}</td>
                  <td className="p-2 border">{edu.resultBase}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(edu, idx)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(idx)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
