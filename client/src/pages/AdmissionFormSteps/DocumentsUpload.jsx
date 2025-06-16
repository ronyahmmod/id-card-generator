import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DocumentsUpload({ state, dispatch }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // file URL
  const [modalIsPdf, setModalIsPdf] = useState(false);

  // On drop files
  const onDrop = useCallback(
    (acceptedFiles) => {
      const validFiles = [];
      for (const file of acceptedFiles) {
        const mime = file.type.toLowerCase();
        if (
          !["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
            mime
          )
        ) {
          alert(`Unsupported file type: ${file.name}`);
          continue;
        }
        if (
          (mime === "application/pdf" && file.size > 2 * 1024 * 1024) ||
          (mime !== "application/pdf" && file.size > 2 * 1024 * 1024)
        ) {
          alert(`File too large: ${file.name}`);
          continue;
        }
        validFiles.push(file);
      }
      dispatch({
        type: "SET_DOCUMENTS",
        value: [...state.documents, ...validFiles],
      });
    },
    [dispatch, state.documents]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: true,
    maxSize: 2 * 1024 * 1024, // 2MB max
  });

  const openPreview = (file) => {
    const url = URL.createObjectURL(file);
    setModalContent(url);
    setModalIsPdf(file.type === "application/pdf");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (modalContent) URL.revokeObjectURL(modalContent);
    setModalContent(null);
  };

  const handleRemove = (index) => {
    const newDocs = [...state.documents];
    newDocs.splice(index, 1);
    dispatch({ type: "SET_DOCUMENTS", value: newDocs });
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here ...</p>
        ) : (
          <p>
            Drag & drop some files here, or click to select files (PDF, JPG,
            JPEG, PNG)
          </p>
        )}
      </div>

      {state.documents?.length > 0 && (
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Size (KB)</th>
              <th className="border border-gray-300 px-4 py-2">Preview</th>
              <th className="border border-gray-300 px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {state.documents.map((file, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">
                  {file.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {(file.size / 1024).toFixed(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => openPreview(file)}
                    className="text-blue-600 underline"
                  >
                    Preview
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="File Preview"
        className={`max-w-[90vw] max-h-[90vh] mx-auto mt-2 bg-white p-4 rounded shadow-lg overflow-auto ${
          modalIsPdf ? "w-[90vw] h-[90vh]" : "w-auto h-auto"
        }`}
        overlayClassName="fixed inset-0 bg-black bg-gray-50/75 flex items-center justify-center z-50"
      >
        <button onClick={closeModal} className="mb-4 text-red-500 underline">
          Close Preview
        </button>

        {modalIsPdf ? (
          <iframe
            src={modalContent}
            title="PDF Preview"
            className="w-full h-full"
            frameBorder="0"
          />
        ) : (
          <img
            src={modalContent}
            alt="Preview"
            className="mx-auto max-h-[80vh] object-contain"
          />
        )}
      </Modal>
    </>
  );
}

export default DocumentsUpload;
