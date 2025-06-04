import React, { useState, useEffect } from "react";
import Modal from "./steps/Modal";
import PersonalInfoForm from "./steps/PersonalInfoForm";
import EducationForm from "./steps/EducationForm";
import PhotoUploadForm from "./steps/PhotoUpload";
import PreviewForm from "./steps/PreviewForm";

const EmployeeFormModal = ({
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
  useEffect(() => {
    if (open) {
      setStep(0);
    }
    if (
      formMode === "edit" &&
      open &&
      initialData &&
      Object.keys(initialData).length > 0
    ) {
      setFormData({
        personal: {
          name: initialData.name || "",
          designation: initialData.designation || "",
          department: initialData.department || "",
          subject: initialData.subject || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          secondaryPhone: initialData.secondaryPhone || "",
          dob: initialData.dob ? initialData.dob.slice(0, 10) : "",
          nid: initialData.nid || "",
          address: initialData.address || "",
          joinDate: initialData.joinDate
            ? initialData.joinDate.slice(0, 10)
            : "",
          mpoDate: initialData.mpoDate ? initialData.mpoDate.slice(0, 10) : "",
          indexNo: initialData.indexNo || "",
          role: initialData.role || "",
          retiredOn: initialData.retiredOn
            ? initialData.retiredOn.slice(0, 10)
            : "",
        },
        education: initialData.education || [],
        photo: {
          file: null,
          preview: "",
          photoUrl: initialData.photoUrl || "",
          photoPublicId: initialData.photoPublicId || "",
        },
        _id: initialData._id,
      });
    } else if (formMode === "add") {
      setFormData({
        personal: {
          name: "",
          designation: "",
          department: "",
          subject: "",
          email: "",
          phone: "",
          secondaryPhone: "",
          dob: "",
          nid: "",
          address: "",
          joinDate: "",
          mpoDate: "",
          role: "",
          indexNo: "",
          retiredOn: "",
        },
        education: [],
        photo: {
          file: null,
          preview: "",
          photoUrl: "",
          photoPublicId: "",
        },
      });
    }
  }, [initialData, formMode, open]);

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

export default EmployeeFormModal;
