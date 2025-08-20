import React from "react";

export default function SelectOption({ children, title, errors, ...props }) {
    return (
        <div className="w-full mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
                {title}
            </label>
            <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                {...props}
            >
                {children}
            </select>
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
