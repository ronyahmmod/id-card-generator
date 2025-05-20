import React, { useEffect, useState } from "react";
import axios from "axios";

const IDCardDownload = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/students").then((res) => {
      setStudents(res.data.data);
    });
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const downloadPDF = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/v1/id-cards/generate-id-cards",
      { studentIds: selectedIds },
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "student-id-cards.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2>Select Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(student._id)}
              onChange={() => toggleSelect(student._id)}
            />
            {student.fullName} ({student.studentId})
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={downloadPDF}
        disabled={selectedIds.length === 0}
      >
        Download ID Cards PDF
      </button>
    </div>
  );
};

export default IDCardDownload;
