// pages/PrintIDCards.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

const IDCard = ({ student }) => {
  return (
    <div className="w-[350px] h-[220px] m-2 border shadow-md rounded overflow-hidden text-sm">
      {/* Front side */}
      <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-center">
        <h2>{student.category} STUDENT ID CARD</h2>
      </div>
      <div className="p-2 flex gap-2">
        <img
          src={student.photo}
          alt="student"
          className="w-20 h-20 object-cover border"
        />
        <div>
          <p>
            <strong>Name:</strong> {student.fullName}
          </p>
          <p>
            <strong>ID:</strong> {student.studentId}
          </p>
          <p>
            <strong>Session:</strong> {student.session}
          </p>
          <p>
            <strong>Roll:</strong> {student.roll}
          </p>
          <p>
            <strong>Class:</strong> {student.className}
          </p>
        </div>
      </div>
      {/* Back side (optional) */}
      <div className="text-xs text-center mt-2 italic">
        Issued by College Authority
      </div>
    </div>
  );
};

const PrintIDCards = () => {
  const [students, setStudents] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    // Replace with actual selected studentIds or filters
    axios
      .post("http://localhost:4000/api/v1/id-cards/generate", {
        category: "HSC",
        session: "2024-2025",
      })
      .then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Printable ID Cards</h2>
      <div className="mb-4">
        <ReactToPrint
          trigger={() => (
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Print / Save PDF
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="flex flex-wrap gap-4">
        {students.map((s) => (
          <IDCard key={s._id} student={s} />
        ))}
      </div>
    </div>
  );
};

export default PrintIDCards;
