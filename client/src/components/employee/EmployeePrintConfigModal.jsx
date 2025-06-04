import React, { useState } from "react";
import ModalComponent from "../ModalComponent";

const allFields = [
  { key: "sl", label: "SL", source: "auto" },
  { key: "name", label: "Name", source: "db" },
  { key: "designation", label: "Designation", source: "db" },
  { key: "subject", label: "Subject", source: "db" },
  { key: "phone", label: "Phone", source: "db" },
  { key: "signature", label: "Signature", source: "custom" },
];

const EmployeePrintConfigModal = ({
  open,
  onClose,
  onSubmit,
  modalTitle,
  configText,
  handleChangeConfig,
}) => {
  const [selectedFields, setSelectedFields] = useState([
    "sl",
    "name",
    "designation",
  ]);

  const [filterType, setFilterType] = useState("all");

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };
  return (
    <ModalComponent
      open={open}
      onClose={onClose}
      onSubmit={onSubmit(selectedFields)}
      modalTitle={modalTitle}
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Title:</label>
        <input
          type="text"
          value={configText.title}
          name="title"
          onChange={handleChangeConfig}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Subtitle:</label>
        <input
          type="text"
          value={configText.subTitle}
          name="subTitle"
          onChange={handleChangeConfig}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Fields:</label>
        <div className="grid grid-cols-2 gap-2">
          {allFields.map((field) => (
            <label key={field.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFields.includes(field.key)}
                onChange={() => toggleField(field.key)}
              />
              <span>{field.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Filter By Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-1/2 border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="teacher">Teacher</option>
          <option value="staff">Staff</option>
          <option value="mpoteacher">All MPO Teacher</option>
          <option value="nonmpoteacher">All Non MPO Teacher</option>
          <option value="allbm">All BM Employee</option>
          <option value="bmstaff">BM Staff</option>
          <option value="bmteacher">BM Teacher</option>
          <option value="honours">Honours Teacher</option>
          <option value="onlyfemale">Only Female Employee</option>
          <option value="onlymale">Only Male Employee</option>
        </select>
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-medium">
          Some predefined template that occationaly used
        </h4>
        <div className="mb-4">
          <button className="btn btn-primary">Landscape List</button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default EmployeePrintConfigModal;
