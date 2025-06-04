import React from "react";

const ModalComponent = ({ open, onClose, onSubmit, modalTitle, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full sm:w-[90vw] lg:w-[70vw] max-h-[90vh] rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">{modalTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-4 overflow-y-auto grow text-gray-700">
          {children}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3 bg-gray-50 shrink-0">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
