// components/PhotoCropperModal.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Modal from "react-modal";
import getCroppedImg from "../../utils/cropImageHelper"; // We'll create this helper

const PhotoCropperModal = ({ imageSrc, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropDone(croppedImageBlob);
    onClose();
  };

  return (
    <Modal
      isOpen={!!imageSrc}
      onRequestClose={onClose}
      contentLabel="Crop Photo"
      className="p-4 bg-white rounded max-w-lg mx-auto mt-20 shadow"
    >
      <h2 className="text-lg font-semibold mb-2">Crop Your Photo</h2>
      <div className="relative w-full h-[300px] bg-gray-100">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 5}
          cropShape="rect"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="text-sm text-gray-600">
          Cancel
        </button>
        <button
          onClick={handleDone}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default PhotoCropperModal;
