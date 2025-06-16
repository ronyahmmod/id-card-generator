export const initialState = {
  fullName: "",
  fatherName: "",
  motherName: "",
  address: "",
  mobile: "",
  guardianMobile: "",
  previousEducation: [],
  quota: [],
  skills: [],
  awards: [],
  className: "",
  session: "",
  dateOfBirth: "",
  bloodGroup: "",
  photo: "",
  photoPreview: "",
  documents: [],
};

export function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_DOCUMENTS":
      return {
        ...state,
        documents: Array.isArray(action.value) ? action.value : [],
      };

    case "SET_PHOTO":
      return {
        ...state,
        photo: action.value,
        photoPreview: action.value ? URL.createObjectURL(action.value) : null,
      };
    case "ADD_EDUCATION": {
      // Prevent duplicate examName + examYear
      const isDuplicate = state.previousEducation.some(
        (edu) =>
          edu.examName === action.payload.examName &&
          edu.examYear === action.payload.examYear
      );
      if (isDuplicate) return state;

      return {
        ...state,
        previousEducation: [...state.previousEducation, action.payload],
      };
    }

    case "UPDATE_EDUCATION": {
      const updatedList = [...state.previousEducation];
      updatedList[action.index] = action.payload;
      return { ...state, previousEducation: updatedList };
    }

    case "REMOVE_EDUCATION":
      return {
        ...state,
        previousEducation: state.previousEducation.filter(
          (_, idx) => idx !== action.index
        ),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
