import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const StudentSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  fatherName: Yup.string().required("Father's name is required"),
  motherName: Yup.string().required("Mother's name is required"),
  address: Yup.object().shape({
    village: Yup.string().required("Village name is required"),
    post: Yup.string().required("Post office is required"),
    district: Yup.string().required("District is required"),
  }),
  mobile: Yup.string().required("Mobile is required"),
  guardianMobile: Yup.string().required("Guardian mobile is required"),
  photo: Yup.mixed().required("Photo is required"),
});

const initialValues = {
  fullName: "",
  fatherName: "",
  motherName: "",
  address: { village: "", post: "", maholla: "", district: "" },
  mobile: "",
  guardianMobile: "",
  previousEducation: [
    {
      examName: "",
      examYear: "",
      result: "",
      institutionName: "",
      authority: "",
      resultBase: "",
    },
  ],
  quotas: [{ name: "", description: "" }],
  skills: [{ name: "", description: "" }],
  awards: [{ name: "", description: "", year: "", institutionName: "" }],
  bloodGroup: "",
  dateOfBirth: "",
  photo: null,
  documents: [],
  additionalInfo: "",
  session: "",
  className: "",
  group: "",
  trade: "",
  department: "",
  course: "",
};

export default function DemoForm() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tab, setTab] = useState(0);
  const tabs = [
    "Course & Subject Selection",
    "Basic Info",
    "Education",
    "Other Details",
    "Documents",
    "Payment",
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto text-base dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student Registration Form</h2>
      </div>

      {/* Tab buttons */}
      <div className="tabs tabs-lift mb-6">
        {tabs.map((label, i) => (
          <button
            type="button"
            key={i}
            className={`tab ${tab === i ? "tab-active" : ""}`}
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        onSubmit={async (values, actions) => {
          const formData = new FormData();
          for (const key in values) {
            if (key === "photo") {
              formData.append("photo", values.photo);
            } else {
              formData.append(key, JSON.stringify(values[key]));
            }
          }
          try {
            console.log(values);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form>
            {/* Tab Content */}
            {tab === 0 && (
              <div
                className={`tab-content ${
                  tab === 0 ? "block" : "hidden"
                } bg-base-100 border-base-300 p-6 rounded-xl shadow`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label mb-2">Session *</label>
                    <Field
                      name="session"
                      className="input input-bordered w-full"
                      placeholder="Session"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Select class *</label>
                    <Field
                      name="className"
                      className="input input-bordered w-full"
                      as="select"
                    >
                      <option value="">Select class</option>
                      <option value="hsc">HSC</option>
                      <option value="hsc-bmt">HSC-BMT</option>
                      <option value="degree-pass">DEGREE-PASS</option>
                      <option value="honours">HONOURS</option>
                    </Field>
                  </div>

                  {values.className === "hsc" && (
                    <div>
                      <label className="label mb-2">Group *</label>
                      <Field
                        name="group"
                        className="input input-bordered w-full"
                        as="select"
                      >
                        <option value="">Chose your group</option>
                        <option value="science">SCIENCE</option>
                        <option value="humanities">HUMANITIES</option>
                        <option value="business-studies">
                          BUSINESS STUDIES
                        </option>
                      </Field>
                    </div>
                  )}

                  {/* If You Select HSC-BMT */}
                  {values.className === "hsc-bmt" && (
                    <div>
                      <label className="label mb-2">Trade *</label>
                      <Field
                        name="trade"
                        className="input input-bordered w-full"
                        as="select"
                      >
                        <option value="">Chose your trade</option>
                        <option value="co">Computer Operation</option>
                        <option value="hrd">Human Resource Development</option>
                      </Field>
                    </div>
                  )}

                  {/* If you select DEGREE-PASS */}
                  {values.className === "degree-pass" && (
                    <div>
                      <label className="label mb-2">Course *</label>
                      <Field
                        name="course"
                        className="input input-bordered w-full"
                        as="select"
                      >
                        <option value="">Chose your course</option>
                        <option value="ba">BA</option>
                        <option value="bss">BSS</option>
                        <option value="bbs">BBS</option>
                      </Field>
                    </div>
                  )}

                  {/* If you select honours */}
                  {values.className === "honours" && (
                    <div>
                      <label className="label mb-2">Department *</label>
                      <Field
                        name="department"
                        className="input input-bordered w-full"
                        as="select"
                      >
                        <option value="">Chose your department</option>
                        <option value="bn">BANGLA</option>
                        <option value="ps">POLITICAL SCIENCE</option>
                      </Field>
                    </div>
                  )}
                </div>
              </div>
            )}
            {tab === 1 && (
              <div
                className={`tab-content ${
                  tab === 1 ? "block" : "hidden"
                } bg-base-100 border-base-300 p-6 rounded-xl shadow`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column: 2 Fields */}
                  <div className="md:col-span-2 space-y-4 bg-base-100 p-4 rounded-xl shadow">
                    <label className="label">Full Name *</label>
                    <Field
                      name="fullName"
                      className="input input-bordered w-full"
                      placeholder="Full Name"
                    />
                    <ErrorMessage
                      name="fullName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                    <label className="label">Father's Name *</label>
                    <Field
                      name="fatherName"
                      className="input input-bordered w-full"
                      placeholder="Father's Name"
                    />
                    <ErrorMessage
                      name="fatherName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                    <label className="label">Mother's Name *</label>
                    <Field
                      name="motherName"
                      className="input input-bordered w-full"
                      placeholder="Mother's Name"
                    />
                    <ErrorMessage
                      name="motherName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                    <label className="label">Student Mobile Number *</label>
                    <Field
                      name="mobile"
                      className="input input-bordered w-full"
                      placeholder="Mobile"
                    />
                    <ErrorMessage
                      name="mobile"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  {/* Right column: Photo Upload in Separate Card */}
                  <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
                    <label className="label font-bold">Upload Photo *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("photo", file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setPreviewUrl(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <ErrorMessage
                      name="photo"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                    {/* Preview */}
                    <div className="w-full aspect-square border rounded-lg flex items-center justify-center bg-base-200">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="object-cover rounded-lg w-full h-full"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-100 border-base-300 p-6 rounded-xl shadow mt-4">
                  <div>
                    <label className="label mb-2">Select Blood Group</label>
                    <Field
                      className="input input-bordered w-full"
                      name="bloodGroup"
                      as="select"
                    >
                      <option value="">Select a blood group</option>
                      <option value="a+">A+</option>
                      <option value="a-">A-</option>
                      <option value="b+">B+</option>
                      <option value="b-">B-</option>
                      <option value="o+">O+</option>
                      <option value="o-">O-</option>
                      <option value="ab+">AB+</option>
                      <option value="ab-">AB-</option>
                    </Field>
                    <ErrorMessage
                      name="bloodGroup"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  <div>
                    <label className="label mb-2">
                      Birth Registration Number(17 Digits) *
                    </label>
                    <Field
                      name="brn"
                      className="input input-bordered w-full"
                      placeholder="Student BRN"
                    />
                    <ErrorMessage
                      name="brn"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">NID</label>
                    <Field
                      name="nid"
                      className="input input-bordered w-full"
                      placeholder="Student National ID Number"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Date Of Birth *</label>
                    <Field
                      name="dob"
                      className="input input-bordered w-full"
                      type="date"
                    />
                    <ErrorMessage
                      name="dob"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Father's NID</label>
                    <Field
                      name="fatherNID"
                      className="input input-bordered w-full"
                      placeholder="Father's NID"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Mother's NID</label>
                    <Field
                      name="motherNID"
                      className="input input-bordered w-full"
                      placeholder="Mother's NID"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">
                      Father's Mobile Number *
                    </label>
                    <Field
                      name="fatherMobile"
                      className="input input-bordered w-full"
                      placeholder="Father's Mobile number"
                    />
                    <ErrorMessage
                      name="fatherMobile"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Mother's Mobile Number</label>
                    <Field
                      name="motherMobile"
                      className="input input-bordered w-full"
                      placeholder="Mother's Mobile number"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Village *</label>
                    <Field
                      name="village"
                      className="input input-bordered w-full"
                      placeholder="Village"
                    />
                    <ErrorMessage
                      name="village"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Post Office *</label>
                    <Field
                      name="post"
                      className="input input-bordered w-full"
                      placeholder="Post Office"
                    />
                    <ErrorMessage
                      name="post"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Upazila *</label>
                    <Field
                      name="upazila"
                      className="input input-bordered w-full"
                      placeholder="Upazila"
                    />
                    <ErrorMessage
                      name="upazila"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">District *</label>
                    <Field
                      name="district"
                      className="input input-bordered w-full"
                      placeholder="District"
                    />
                    <ErrorMessage
                      name="district"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-100 border-base-300 p-6 rounded-xl shadow mt-4">
                  <div>
                    <label className="label mb-2">Who is the guardian? *</label>
                    <Field
                      className="input input-bordered w-full"
                      as="select"
                      name="guardianType"
                    >
                      <option value="">Who is the guardian?</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="guardianType"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">Guardian Name *</label>
                    <Field
                      name="guardianName"
                      className="input input-bordered w-full"
                      placeholder="Guardian Name"
                    />
                    <ErrorMessage
                      name="guardianName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className="label mb-2">
                      Relationship with student *
                    </label>
                    <Field
                      name="relationshipWith"
                      className="input input-bordered w-full"
                      placeholder="Relation"
                    />
                    <ErrorMessage
                      name="relationshipWith"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  <div>
                    <label className="label mb-2">
                      Guardian Mobile Number *
                    </label>
                    <Field
                      name="guardianMobile"
                      className="input input-bordered w-full"
                      placeholder="Guardian Mobile"
                    />
                    <ErrorMessage
                      name="guardianMobile"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label mb-2">Guardian NID *</label>
                    <Field
                      name="guardianNID"
                      className="input input-bordered w-full"
                      placeholder="Guardian NID"
                    />
                    <ErrorMessage
                      name="guardianNID"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="label mb-2">
                      Guardian Address[Village, Post, Up, District] *
                    </label>
                    <Field
                      name="guardianAddress"
                      className="input input-bordered w-full"
                      placeholder="Guardian Address"
                    />
                    <ErrorMessage
                      name="guardianAddress"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>
                </div>
              </div>
            )}

            {tab === 2 && (
              <div
                className={`tab-content ${
                  tab === 2 ? "block" : "hidden"
                } bg-base-100 border-base-300 p-6 rounded-xl shadow`}
              >
                <FieldArray name="previousEducation">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.previousEducation.map((edu, idx) => (
                        <div
                          key={idx}
                          className="grid md:grid-cols-3 gap-4 border-b pb-2"
                        >
                          <Field
                            name={`previousEducation.${idx}.examName`}
                            placeholder="Exam Name"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.examYear`}
                            placeholder="Year"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.result`}
                            placeholder="Result"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.institutionName`}
                            placeholder="Institution"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.roll`}
                            placeholder="Roll"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.registration`}
                            placeholder="Registration"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.authority`}
                            placeholder="Authority"
                            className="input input-bordered"
                          />
                          <Field
                            name={`previousEducation.${idx}.resultBase`}
                            placeholder="Result Base"
                            className="input input-bordered col-span-2"
                          />
                          <button
                            type="button"
                            className="btn btn-error mt-2"
                            onClick={() => remove(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          push({
                            examName: "",
                            examYear: "",
                            result: "",
                            institutionName: "",
                            authority: "",
                            resultBase: "",
                          })
                        }
                      >
                        Add Education
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            )}

            {tab === 3 && (
              <div
                className={`tab-content ${
                  tab === 3 ? "block" : "hidden"
                } bg-base-100 border-base-300 p-6 rounded-xl shadow`}
              >
                <h3 className="mb-2">
                  If you add quota add supporting documents on documents upload
                  section
                </h3>
                <FieldArray name="skills">
                  {({ push, remove }) => (
                    <div className="space-y-4 mb-4">
                      {values.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="grid md:grid-cols-3 gap-4 border-b pb-2"
                        >
                          <Field
                            name={`skills.${idx}.name`}
                            placeholder="Skill Name"
                            className="input input-bordered w-full"
                          />
                          <Field
                            name={`skills.${idx}.description`}
                            className="input input-bordered w-full"
                            placeholder="Description"
                          />
                          <button
                            type="button"
                            className="btn btn-error"
                            onClick={() => remove(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          push({
                            name: "",
                            description: "",
                          })
                        }
                      >
                        Add Skill
                      </button>
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="quotas">
                  {({ remove, push }) => (
                    <div className="space-y-4 mb-4">
                      {values.quotas.map((quota, idx) => (
                        <div
                          key={idx}
                          className="grid md:grid-cols-3 gap-4 border-b pb-2"
                        >
                          <Field
                            name={`quotas.${idx}.name`}
                            className="input input-bordered w-full"
                            placeholder="Quota Name"
                          />
                          <Field
                            name={`quotas.${idx}.description`}
                            className="input input-bordered w-full"
                            placeholder="Quota Description"
                          />
                          <button
                            type="button"
                            className="btn btn-error"
                            onClick={() => remove(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          push({
                            name: "",
                            description: "",
                          })
                        }
                      >
                        Add Quota
                      </button>
                    </div>
                  )}
                </FieldArray>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3">
                    <label className="label">Additional Info</label>
                    <Field
                      as="textarea"
                      name="additionalInfo"
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {tab === 4 && (
              <div
                className={`tab-content ${
                  tab === 4 ? "block" : "hidden"
                } bg-base-100 border-base-300 p-6 rounded-xl shadow`}
              >
                <label className="label font-bold">
                  Upload Supporting Documents
                </label>
                <input
                  type="file"
                  multiple
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const allFiles = [...values.documents, ...files];
                    setFieldValue("documents", allFiles);
                  }}
                />
                {/* File List */}
                <ul className="space-y-2">
                  {values.documents?.map((file, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center p-2 border rounded-md bg-base-200"
                    >
                      <span className="truncate text-sm">{file.name}</span>
                      <div className="space-x-2">
                        {/* Preview Button */}
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline btn-info"
                        >
                          Preview
                        </a>
                        {/* Remove Button */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => {
                            const newFiles = values.documents.filter(
                              (_, i) => i !== idx
                            );
                            setFieldValue("documents", newFiles);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation + Submit */}
            <div className="mt-6 flex justify-between">
              {tab > 0 && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setTab(tab - 1)}
                >
                  ← Previous
                </button>
              )}
              {tab < tabs.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setTab(tab + 1)}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isValid || !dirty}
                >
                  Submit Form
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
