import React, { useRef, useState } from "react";
import PhotoCropperModal from "./PhotoCropperModal";

const PhotoUpload = ({ state, dispatch }) => {
  const fileInputRef = useRef();
  const [cropSrc, setCropSrc] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG or PNG images are allowed");
      return;
    }
    if (file.size > 200 * 1024) {
      alert("Photo must be less than 200 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result); // Opens modal
    };
    reader.readAsDataURL(file);
  };

  const handleCropDone = (croppedBlob) => {
    dispatch({ type: "SET_PHOTO", value: croppedBlob });
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">
        Passport Size Photo <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handlePhotoChange}
        ref={fileInputRef}
        className="block w-full border p-2 rounded"
      />
      {state.photoPreview && (
        <div className="mt-2">
          <img
            src={state.photoPreview}
            alt="Preview"
            className="border rounded shadow w-[120px] h-[150px] object-cover"
          />
          <button
            onClick={() => {
              fileInputRef.current.value = "";
              dispatch({ type: "SET_PHOTO", value: null });
            }}
            className="text-red-500 text-sm mt-1 underline"
          >
            Remove
          </button>
        </div>
      )}
      {cropSrc && (
        <PhotoCropperModal
          imageSrc={cropSrc}
          onClose={() => setCropSrc(null)}
          onCropDone={handleCropDone}
        />
      )}
    </div>
  );
};

export default PhotoUpload;
