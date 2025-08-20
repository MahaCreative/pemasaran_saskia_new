import React, { useState } from "react";

export default function Colapse({ title, message }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-md focus:outline-none"
            >
                <span>{title}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="px-4 py-3 text-gray-700 bg-white border-t border-gray-300">
                    {message}
                </div>
            )}
        </div>
    );
}
