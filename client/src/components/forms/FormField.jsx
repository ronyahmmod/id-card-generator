export default function FormField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder = "",
  helperText = "",
  options = [], // for select: [{label, value}]
  rows = 4, // for textarea
  children, // for custom input
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {children ? (
        children
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          className="w-full border dark:border-gray-100 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          rows={rows}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border dark:text-gray-100 dark:border-gray-100 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:placeholder-gray-100"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border dark:text-gray-100 dark:border-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:placeholder-gray-100"
        />
      )}

      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
}
