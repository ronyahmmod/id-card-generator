import React from "react";
import FieldRenderer from "./FieldRenderer";
import { useFormReducer } from "./useFormReducer";

const FormBuilder = ({ schema, onSubmit }) => {
  const initialState = schema.reduce((acc, field) => {
    if (field.repeatable) {
      acc[field.name] = [];
    } else if (field.type === "checkbox" && field.options) {
      acc[field.name] = [];
    } else if (field.type === "file") {
      acc[field.name] = field.multiple ? [] : null;
    } else {
      acc[field.name] = "";
    }
    return acc;
  }, {});

  const [state, dispatch] = useFormReducer(initialState);

  const handleChange = (name, value) => {
    dispatch({ type: "UPDATE_FIELD", name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-md"
    >
      <div className="flex flex-wrap -mx-2">
        {schema.map((field) => (
          <div
            key={field.name}
            className={`px-2 mb-4 ${
              field.width === "full" ? "w-full" : "w-full md:w-1/2"
            }`}
          >
            <FieldRenderer
              field={field}
              value={state[field.name]}
              onChange={handleChange}
              dispatch={dispatch}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
