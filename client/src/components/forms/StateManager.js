import { useReducer } from "react";

const initialErrors = (schema) => {
  const err = {};
  const recurse = (fields, prefix = "") => {
    fields.forEach((field) => {
      const name = prefix + field.name;
      if (
        field.type === "group" &&
        field.repeatable &&
        Array.isArray(field.fields)
      ) {
        err[name] = [];
      } else {
        err[name] = null;
      }
    });
  };
  recurse(schema);
  return err;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
          [action.name]: null,
        },
      };
    }

    case "ADD_REPEATER_ITEM": {
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: [...(state.values[action.name] || []), action.newItem],
        },
      };
    }

    case "REMOVE_REPEATER_ITEM": {
      const updated = [...state.values[action.name]];
      updated.splice(action.index, 1);
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: updated,
        },
      };
    }
    case "UPDATE_REPEATER_ITEM": {
      const items = [...state.values[action.name]];
      items[action.index][action.field] = action.value;
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: items,
        },
      };
    }

    case "SET_ERRORS": {
      return {
        ...state,
        errors: action.errors,
      };
    }

    default:
      return state;
  }
};

const getInitialValues = (schema) => {
  const values = {};
  schema.forEach((field) => {
    if (field.type === "group" && field.repeatable) {
      values[field.name] = [];
    } else {
      values[field.name] = field.default || "";
    }
  });
  return values;
};

export const useFormState = (schema) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: getInitialValues(schema),
    errors: initialErrors(schema),
  });

  const handleChange = (name, value) => {
    dispatch({ type: "UPDATE_FIELD", name, value });
  };

  const validateField = (field, value) => {
    if (
      field.required &&
      (value === "" || value === undefined || value === null)
    ) {
      return `${field.label || field.name} is required`;
    }
    return null;
  };

  const validateForm = () => {
    const errors = {};
    schema.forEach((field) => {
      const error = validateField(field, state.values[field.name]);
      errors[field.name] = error;
    });
    dispatch({ type: "SET_ERRORS", errors });
    return errors;
  };
  return {
    values: state.values,
    errors: state.errors,
    dispatch,
    handleChange,
    validateForm,
  };
};
