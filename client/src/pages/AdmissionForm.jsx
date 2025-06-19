import React, { useState, useReducer } from "react";
import { formReducer, initialState } from "../reducers/admissionFormReducer";
import PersonalInfo from "./AdmissionFormSteps/PersonalInfo";
import AcademicInfo from "./AdmissionFormSteps/AcademicInfo";
import Upload from "./AdmissionFormSteps/Upload";
import StudentFormPreview from "./AdmissionFormSteps/StudentFormPreview";

const AdmissionForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    // TODO: Implement Later
    console.log(state);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow-md space-y-4">
      {/* Progress Bar: Implement latter */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded ${
              step >= s ? "bg-blue-500" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && <PersonalInfo dispatch={dispatch} state={state} />}
      {step === 2 && <AcademicInfo dispatch={dispatch} state={state} />}
      {step === 3 && <Upload dispatch={dispatch} state={state} />}
      <div className={step === 4 ? "" : "hidden"}>
        <StudentFormPreview state={state} onSubmit={handleSubmit} />
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button onClick={prev} className="btn btn-outline">
            Previous
          </button>
        )}
        {step < 4 ? (
          <button onClick={next} className="btn btn-primary">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AdmissionForm;
