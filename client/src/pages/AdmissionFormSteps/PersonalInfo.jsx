import React from "react";
import BloodGroupGrid from "./BloodGroupGrid";
import FormField from "../../components/forms/FormField";

const PersonalInfo = ({ state, dispatch }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-gray-700">
          Please fill in all required fields marked with{" "}
          <span className="text-red-500">*</span>. Your information will be
          reviewed after submission.
        </p>
      </div>
      {/* Full Name */}
      <FormField
        label="Student's full name"
        name="fullName"
        required
        value={state.fullName}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "fullName",
            value: e.target.value,
          })
        }
        placeholder="Enter your full name"
      />

      {/* Father Name */}
      <FormField
        label="Student's father name"
        name="fatherName"
        required
        value={state.fatherName}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "fatherName",
            value: e.target.value,
          })
        }
        placeholder="Enter your father's name"
      />
      {/* Mother Name */}
      <FormField
        label="Student's mother name"
        name="motherName"
        required
        value={state.motherName}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "motherName",
            value: e.target.value,
          })
        }
        placeholder="Enter your mother's name"
      />
      {/* Address */}
      <FormField
        label="Present address of student"
        type="textarea"
        name="address"
        rows={3}
        required
        value={state.address}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "address",
            value: e.target.value,
          })
        }
        helperText="Clearly write your address. Like- Village, Post Office, Upazila, Word, Union/Pourosova, Para/Moholla, District"
      />

      {/* Mobile and Guardian Mobile Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Student's mobile number"
          name="mobile"
          value={state.mobile}
          required
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "mobile",
              value: e.target.value,
            })
          }
        />
        <FormField
          label="Guardian mobile number"
          name="guardianMobile"
          value={state.guardianMobile}
          required
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "guardianMobile",
              value: e.target.value,
            })
          }
        />
      </div>
      {/* Class Name and Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="className"
          label="Class name"
          type="select"
          required
          value={state.className}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "className",
              value: e.target.value,
            })
          }
          options={[
            { label: "HSC", value: "hsc" },
            { label: "HSC BMT", value: "hscbmt" },
            { label: "DEGREE PASS", value: "degree-pass" },
            { label: "HONOURS", value: "honours" },
            { label: "HSC - BOU", value: "hscbou" },
            { label: "DEGREE PASS - BOU", value: "degree-pass-bou" },
          ]}
        />
        <FormField
          name="session"
          value={state.session}
          label="Session"
          required
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "session",
              value: e.target.value,
            })
          }
        />
      </div>
      {/* DOB and Blood Group */}
      <FormField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        required
        value={state.dateOfBirth}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "dateOfBirth",
            value: e.target.value,
          })
        }
        helperText="Please select your birth date."
      />

      {/* Blood Group */}
      <div>
        <BloodGroupGrid selected={state.bloodGroup} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default PersonalInfo;
