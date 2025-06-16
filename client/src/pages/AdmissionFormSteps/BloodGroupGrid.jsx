// BloodGroupGrid.jsx

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodGroupGrid({ selected, dispatch }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Blood Group <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-4 gap-3">
        {bloodGroups.map((group) => (
          <button
            type="button"
            key={group}
            onClick={() =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "bloodGroup",
                value: group,
              })
            }
            className={`border rounded py-2 text-sm font-medium text-center transition ${
              selected === group
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Select your correct blood group.
      </p>
    </div>
  );
}
