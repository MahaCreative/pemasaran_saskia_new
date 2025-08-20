import React from "react";

const LoadingOverlay = ({ isLoading, message = "Loading..." }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-700 font-medium">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
