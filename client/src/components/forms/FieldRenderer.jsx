import React from "react";
import { useRef } from "react";

const FieldRenderer = ({ field, value, onChange, dispatch }) => {
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    const { type, checked, files, value: val, multiple } = e.target;

    if (type === "checkbox" && field.options) {
      const updated = checked
        ? [...value, e.target.value]
        : value.filter((v) => v !== e.target.value);
      onChange(field.name, updated);
    } else if (type === "file") {
      const fileValue = multiple ? Array.from(files) : files[0];
      onChange(field.name, fileValue);
    } else {
      onChange(field.name, val);
    }
  };

  if (field.type === "group" && field.repeatable) {
    const handleAdd = () => {
      const initial = field.fields.reduce((acc, f) => {
        acc[f.name] = "";
        return acc;
      }, {});
      dispatch({
        type: "ADD_REPEATER_ITEM",
        name: field.name,
        newItem: initial,
      });
    };

    const handleUpdate = (index, subField, subValue) => {
      dispatch({
        type: "UPDATE_REPEATER_ITEM",
        name: field.name,
        index,
        field: subField,
        value: subValue,
      });
    };

    const handleRemove = (index) => {
      dispatch({ type: "REMOVE_REPEATER_ITEM", name: field.name, index });
    };

    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          {field.label}
          {field.required && (
            <span className="text-red-500 dark:text-gray-100 ml-1">*</span>
          )}
        </label>
        {value.map((item, idx) => (
          <div
            key={idx}
            className="mb-4 border p-3 rounded bg-gray-50 dark:bg-gray-800"
          >
            <div
              className={`flex ${
                field.sideBySide ? "flex-wrap -mx-2" : "flex-col"
              }`}
            >
              {field.fields.map((subField) => (
                <div
                  key={subField.name}
                  className={`mb-2 px-2 ${
                    field.sideBySide ? "w-full md:w-1/2" : "w-full"
                  }`}
                >
                  <input
                    type={subField.type}
                    placeholder={subField.label}
                    value={item[subField.name]}
                    onChange={(e) =>
                      handleUpdate(idx, subField.name, e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-red-600 text-sm mt-2 ml-5 border rounded px-3 py-2 cursor-pointer hover:bg-gray-100 hover:text-gray-700"
            >
              Delete
            </button>
            {field.error && (
              <p className="text-sm text-red-500 mt-1">{field.error}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
        >
          Add New
        </button>
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "radio" && field.options) {
    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          {field.label}
          {field.required && (
            <span className="text-red-500 dark:text-gray-100 ml-1">*</span>
          )}
        </label>
        {field.options.map((opt) => (
          <label
            key={opt.value}
            className="mr-4 text-gray-800 dark:text-gray-100"
          >
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={handleInputChange}
              className="mr-1"
            />
            {opt.label}
          </label>
        ))}
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          name={field.name}
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white ${
            field.className || ""
          }`}
        />
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          name={field.name}
          value={value || (field.multiple ? [] : "")}
          onChange={(e) =>
            onChange(
              field.name,
              field.multiple
                ? Array.from(e.target.selectedOptions).map((o) => o.value)
                : e.target.value
            )
          }
          multiple={field.multiple}
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white ${
            field.className || ""
          }`}
        >
          {!field.multiple && <option value="">Select...</option>}
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "fieldlist" && field.options) {
    const filtered = field.options.filter((opt) =>
      opt.label.toLowerCase().includes((value || "").toLowerCase())
    );
    return (
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white ${
            field.className || ""
          }`}
          placeholder="Start typing..."
        />
        {filtered.length > 0 && (
          <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border rounded mt-1 shadow">
            {filtered.map((opt) => (
              <li
                key={opt.value}
                className="px-3 py-1 hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => onChange(field.name, opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "checkbox" && field.options) {
    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          {field.label}
          {field.required && (
            <span className="text-red-500 dark:text-gray-100 ml-1">*</span>
          )}
        </label>
        {field.options.map((opt) => (
          <label
            key={opt.value}
            className="block text-gray-800 dark:text-gray-100"
          >
            <input
              type="checkbox"
              name={field.name}
              value={opt.value}
              checked={value.includes(opt.value)}
              onChange={handleInputChange}
              className="mr-2"
            />
            {opt.label}
          </label>
        ))}
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }

  if (field.type === "file") {
    const files = Array.isArray(value) ? value : value ? [value] : [];

    const showToast = (msg) => {
      if (typeof window !== "undefined") {
        alert(msg); // Replace with toast library later
      }
    };

    const handleDelete = (indexToDelete) => {
      const updated = files.filter((_, idx) => idx !== indexToDelete);
      onChange(field.name, field.multiple ? updated : null);
      if (inputRef.current) inputRef.current.value = "";
    };

    const handleInputChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = [];

      selectedFiles.forEach((file) => {
        const isValidType =
          file.type.startsWith("image/") || file.type === "application/pdf";
        const isValidSize = file.size <= 2 * 1024 * 1024;

        if (!isValidType) {
          showToast(`❌ ${file.name} is not an image or PDF.`);
        } else if (!isValidSize) {
          showToast(`⚠️ ${file.name} is larger than 2MB.`);
        } else {
          validFiles.push(file);
        }
      });

      if (field.multiple) {
        onChange(field.name, [...files, ...validFiles]);
      } else {
        onChange(field.name, validFiles[0] || null);
      }

      if (inputRef.current) inputRef.current.value = "";
    };

    const formatSize = (bytes) => {
      return bytes >= 1024 * 1024
        ? (bytes / (1024 * 1024)).toFixed(2) + " MB"
        : (bytes / 1024).toFixed(2) + " KB";
    };

    return (
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          {field.label}
          {field.required && (
            <span className="text-red-500 dark:text-gray-100 ml-1">*</span>
          )}
        </label>

        {/* Custom File Input */}
        <div className="relative w-full">
          <input
            type="file"
            ref={inputRef}
            multiple={field.multiple}
            accept="image/*,application/pdf"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center px-4 py-2 border border-dashed rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 cursor-pointer hover:border-blue-500 hover:text-blue-600 transition">
            Click or drag files to upload (Max 2MB, Image or PDF)
          </div>
        </div>

        {/* File Previews */}
        <div className="flex flex-wrap gap-4 mt-3">
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const isPdf = file.type === "application/pdf";
            const url = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative w-28 md:w-36 flex flex-col items-center gap-1 text-center"
              >
                <div className="w-full h-24 md:h-32 border rounded overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center">
                  {isImage ? (
                    <img
                      src={url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : isPdf ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      PDF Preview
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500">Unsupported</span>
                  )}
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-200 break-words w-full px-1">
                  {file.name}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {formatSize(file.size)}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-xs text-white bg-red-600 hover:bg-red-700 rounded px-2 py-0.5"
                >
                  ✕ Remove
                </button>
              </div>
            );
          })}
        </div>
        {field.error && (
          <p className="text-sm text-red-500 mt-1">{field.error}</p>
        )}
      </div>
    );
  }
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={field.type || "text"}
        name={field.name}
        placeholder={field.placeholder || ""}
        value={value || ""}
        onChange={handleInputChange}
        className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white ${
          field.className || ""
        }`}
      />
      {field.error && (
        <p className="text-sm text-red-500 mt-1">{field.error}</p>
      )}
    </div>
  );
};

export default FieldRenderer;
