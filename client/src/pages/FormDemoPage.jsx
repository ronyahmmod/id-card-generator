// src/pages/FormDemoPage.jsx
import React from "react";
import FormBuilder from "../components/forms/FormBuilder";

const formSchema = [
  { name: "fullName", label: "Student Name", type: "text", required: true },
  { name: "fatherName", label: "Father Name", type: "text" },
  { name: "motherName", label: "Mother Name", type: "text" },
  { name: "address", label: "Student Address", type: "textarea" },
  { name: "email", label: "Email", type: "email" },
  { name: "mobile", label: "Student Mobile", type: "text" },
  { name: "guardianMobile", label: "Guardian Mobile", type: "text" },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "className",
    label: "Class Name",
    type: "text",
  },
  {
    name: "session",
    label: "Session",
    type: "text",
  },
  { name: "bloodGroup", label: "Blood Group", type: "text" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  {
    name: "photo",
    label: "Please attach your passport size photo",
    type: "file",
    width: "half",
  },
  {
    name: "skills",
    label: "Skills",
    type: "group",
    repeatable: true,
    sideBySide: true,

    fields: [
      {
        name: "name",
        label: "Skill Name",
        type: "text",
      },
      { name: "description", label: "Description", type: "text" },
    ],
  },
  {
    name: "quota",
    label: "Quota",
    type: "group",
    repeatable: true,
    sideBySide: true,

    fields: [
      { name: "name", label: "Quota Name", type: "text" },
      { name: "description", label: "Description", type: "text" },
    ],
  },
  {
    name: "awards",
    label: "Awards",
    type: "group",
    repeatable: true,
    sideBySide: true,
    fields: [
      { name: "name", label: "Award Name", type: "text" },
      { name: "description", label: "Description", type: "text" },
      { name: "year", label: "Year", type: "text" },
    ],
  },
  {
    name: "hobbies",
    label: "Hobbies",
    type: "checkbox",
    options: [
      { label: "Music", value: "music" },
      { label: "Reading", value: "reading" },
      { label: "Traveling", value: "traveling" },
    ],
  },
  {
    name: "documents",
    label: "Please attach your supporting documents",
    type: "file",
    multiple: true,
    width: "half",
  },
  {
    name: "education",
    label: "Previous educational information",
    type: "group",
    repeatable: true,
    sideBySide: true,
    width: "full",
    fields: [
      { name: "examName", label: "Exam Name", type: "text" },
      { name: "examYear", label: "Exam Year", type: "text" },
      { name: "result", label: "Result", type: "text" },
      { name: "institutionName", label: "Institution Name", type: "text" },
      {
        name: "authority",
        label: "Authority (Board/University name)",
        type: "text",
      },
      { name: "resultBase", label: "Result Base (Like: 5, 4)", type: "text" },
    ],
  },
];

const FormDemoPage = () => {
  const handleSubmit = (data) => {
    console.log("ফর্ম সাবমিশন ডাটা:", data);
    alert("ফর্ম সফলভাবে জমা হয়েছে!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Student Admission Form
      </h1>
      <FormBuilder schema={formSchema} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormDemoPage;
