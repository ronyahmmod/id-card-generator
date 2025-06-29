import React from "react";
import FieldRenderer from "./FieldRenderer";

const LayoutManager = ({ schema = [], state, dispatch, errors }) => {
  return (
    <div className="w-full">
      {schema.map((block, i) => {
        // Divider / Section Title Support
        if (block.type === "divider") {
          return (
            <hr key={i} className="my-6 border-gray-300 dark:border-gray-600" />
          );
        }
        if (block.type === "section") {
          return (
            <h2
              key={i}
              className="text-xl font-bold text-gray-800 dark:text-white mb-4 mt-8 border-b pb-1"
            >
              {block.label}
            </h2>
          );
        }

        // Normal Field or Group
        const widthClass =
          block.width ||
          (block.sideBySide ? "w-full md:w-1/2 px-2" : "w-full px-1");

        return (
          <div
            key={block.name || i}
            className={`mb-4 ${block.sideBySide ? "flex flex-wrap -mx-2" : ""}`}
          >
            <div className={widthClass}>
              <FieldRenderer
                field={block}
                value={state[block.name]}
                onChange={(name, value) =>
                  dispatch({ type: "UPDATE_FIELD", name, value })
                }
                dispatch={dispatch}
                error={errors[block.name]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LayoutManager;
