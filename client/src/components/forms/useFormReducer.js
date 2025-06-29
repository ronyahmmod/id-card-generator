import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };

    // Repeater field logic (corrected types)
    case "ADD_REPEATER_ITEM": {
      const updated = [...(state[action.name] || []), action.newItem];
      return {
        ...state,
        [action.name]: updated,
      };
    }

    case "UPDATE_REPEATER_ITEM": {
      const updated = (state[action.name] || []).map((item, idx) =>
        idx === action.index ? { ...item, [action.field]: action.value } : item
      );
      return {
        ...state,
        [action.name]: updated,
      };
    }

    case "REMOVE_REPEATER_ITEM": {
      const updated = (state[action.name] || []).filter(
        (_, idx) => idx !== action.index
      );
      return {
        ...state,
        [action.name]: updated,
      };
    }

    case "RESET_FORM":
      return action.initialState || {};

    default:
      return state;
  }
};

export const useFormReducer = (initialState = {}) => {
  return useReducer(reducer, initialState);
};
