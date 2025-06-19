import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const StudentFormPreview = ({ state, onSubmit }) => {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${state.fullName || "student"}_admission_preview`,
    removeAfterPrint: true,
    pageStyle: `
      @page { margin: 20mm; }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="space-y-4">
      <div
        ref={printRef}
        className="bg-white shadow rounded p-6 max-w-5xl mx-auto print:shadow-none print:p-0"
      >
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {state.fullName}
            </h2>
            <p>
              <strong>Class:</strong> {state.className}
            </p>
            <p>
              <strong>Session:</strong> {state.session}
            </p>
            <p>
              <strong>Date of Birth:</strong> {state.dateOfBirth}
            </p>
            <p>
              <strong>Blood Group:</strong> {state.bloodGroup}
            </p>
          </div>
          {state.photoPreview && (
            <img
              src={state.photoPreview}
              alt="Student"
              className="w-[120px] h-[150px] object-cover border rounded"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="font-medium">Father's Name:</td>
                  <td>{state.fatherName}</td>
                </tr>
                <tr>
                  <td className="font-medium">Mother's Name:</td>
                  <td>{state.motherName}</td>
                </tr>
                <tr>
                  <td className="font-medium">Mobile:</td>
                  <td>{state.mobile}</td>
                </tr>
                <tr>
                  <td className="font-medium">Guardian Mobile:</td>
                  <td>{state.guardianMobile}</td>
                </tr>
                <tr>
                  <td className="font-medium">Address:</td>
                  <td>{state.address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Other Info</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="font-medium">Skills:</td>
                  <td>{state.skills.join(", ") || "-"}</td>
                </tr>
                <tr>
                  <td className="font-medium">Awards:</td>
                  <td>{state.awards.join(", ") || "-"}</td>
                </tr>
                <tr>
                  <td className="font-medium">Quota:</td>
                  <td>{state.quota.join(", ") || "None"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Previous Education</h3>
          {state.previousEducation.length === 0 ? (
            <p className="text-gray-500">
              No previous education info provided.
            </p>
          ) : (
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Exam Name</th>
                  <th className="border px-2 py-1">Board</th>
                  <th className="border px-2 py-1">Roll</th>
                  <th className="border px-2 py-1">Reg</th>
                  <th className="border px-2 py-1">Year</th>
                  <th className="border px-2 py-1">GPA</th>
                </tr>
              </thead>
              <tbody>
                {state.previousEducation.map((edu, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{edu.examName}</td>
                    <td className="border px-2 py-1">{edu.board}</td>
                    <td className="border px-2 py-1">{edu.roll}</td>
                    <td className="border px-2 py-1">{edu.reg}</td>
                    <td className="border px-2 py-1">{edu.examYear}</td>
                    <td className="border px-2 py-1">{edu.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Uploaded Documents</h3>
          {state.documents.length === 0 ? (
            <p className="text-gray-500">No documents uploaded.</p>
          ) : (
            <ul className="list-disc list-inside text-sm">
              {state.documents.map((doc, i) => (
                <li key={i}>{doc.name || `Document ${i + 1}`}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Submit Application
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default StudentFormPreview;
