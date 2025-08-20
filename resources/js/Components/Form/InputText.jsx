import React from "react";

export default function InputText({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    placeholder,
}) {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-gray-700 font-semibold mb-1"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
