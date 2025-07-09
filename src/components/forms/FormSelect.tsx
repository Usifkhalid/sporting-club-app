import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
  className = "",
}: FormSelectProps) {
  const baseClasses =
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900";
  const errorClasses = error ? "border-red-500" : "border-gray-300";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && "*"}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
