import React, { useRef } from "react";

const PhotoUploadForm = ({ photoUrl, update }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    update({ file, preview: previewUrl });
  };

  const handleRemove = () => {
    update({ file: null, preview: "", photoPublicId: "", photoUrl: "" });
    fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <div>
        <label className="block font-medium text-sm mb-1">
          Upload Photo <span className="text-red-500">*</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="photoFile"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
      </div>

      {(photoUrl?.preview || photoUrl?.photoUrl) && (
        <div className="relative w-40">
          <img
            src={photoUrl.preview || photoUrl.photoUrl}
            alt="Preview"
            className="w-full rounded border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadForm;
