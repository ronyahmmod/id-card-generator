import React, { useState } from "react";
import Modal from "./steps/Modal";
import PersonalInfoForm from "./steps/PersonalInfoForm";
import EducationForm from "./steps/EducationForm";
import PhotoUploadForm from "./steps/PhotoUpload";
import PreviewForm from "./steps/PreviewForm";

const EmployeFormModal = ({
  formMode = "add",
  initialData = {},
  open,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    personal: initialData || {},
    education: initialData?.education || [],
    photo: {
      file: null,
      preview: "",
      photoUrl: initialData?.photoUrl || "",
      photoPublicId: initialData?.photoPublicId || "",
    },
  });

  const updateSection = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleFinalSubmit = () => {
    onSubmit(formData);
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <PersonalInfoForm
          data={formData.personal}
          update={(data) =>
            updateSection("personal", { ...formData.personal, ...data })
          }
        />
      ),
    },
    {
      title: "Educational Qualification",
      content: (
        <EducationForm
          data={formData.education}
          update={(data) => updateSection("education", data)}
        />
      ),
    },
    {
      title: "Photo Upload",
      content: (
        <PhotoUploadForm
          photoUrl={formData.photo}
          update={(data) =>
            updateSection("photo", { ...formData.photo, ...data })
          }
        />
      ),
    },
    {
      title: "Preview & Submit",
      content: (
        <PreviewForm
          formData={formData}
          onBack={handleBack}
          onSubmit={handleFinalSubmit}
          formMode={formMode}
        />
      ),
    },
  ];

  return (
    <Modal isOpen={open} onClose={onClose} title={steps[step].title}>
      <div className="space-y-6">
        {steps[step].content}

        {step < steps.length - 1 && (
          <div className="flex justify-between pt-6">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                ⬅ Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EmployeFormModal;
