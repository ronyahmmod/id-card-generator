import React, { useRef } from "react";

const PreviewForm = ({ formData, onBack, onSubmit, formMode }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWin = window.open("", "_blank");
    newWin.document.write(`
      <html>
        <head><title>Draft Print</title></head>
        <body>${printContents}</body>
      </html>
    `);
    newWin.document.close();
    newWin.print();
  };

  const { personal, education, photo } = formData;

  return (
    <div className="space-y-6">
      <div ref={printRef} className="p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">Preview Employee Details</h2>

        <section className="mb-6">
          <h3 className="text-lg font-semibold">Personal Info</h3>
          {Object.entries(personal).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
              {value}
            </p>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold">Educational Info</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-1">Exam</th>
                <th className="p-1">Year</th>
                <th className="p-1">Institution</th>
                <th className="p-1">Authority</th>
                <th className="p-1">Result</th>
                <th className="p-1">Base</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="p-1">{edu.examName}</td>
                  <td className="p-1">{edu.examYear}</td>
                  <td className="p-1">{edu.institutionName}</td>
                  <td className="p-1">{edu.authority}</td>
                  <td className="p-1">{edu.result}</td>
                  <td className="p-1">{edu.base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Photo</h3>
          {photo?.preview || photo?.photoUrl ? (
            <img
              src={photo.preview || photo.photoUrl}
              alt="Employee"
              className="w-40 border rounded"
            />
          ) : (
            <p className="text-sm text-gray-500">No photo uploaded.</p>
          )}
        </section>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          ⬅ Back
        </button>

        <div className="space-x-2">
          <button
            onClick={handlePrint}
            type="button"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
          >
            🖨 Print Draft
          </button>
          <button
            onClick={onSubmit}
            type="button"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            {formMode === "edit" ? "Update Employe" : "Add Employe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
