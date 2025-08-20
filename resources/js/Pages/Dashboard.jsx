import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Dashboard({ auth }) {
    return (
        <AuthLayout title="Dashboard" auth={auth}>
            <div className="px-4 md:px-8 lg:px-16 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Welcome Back!
                        </h3>
                        <p className="text-gray-600">
                            Hello {auth.user.name}, welcome to your dashboard.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Quick Stats
                        </h3>
                        <p className="text-gray-600">
                            View your account statistics and recent activity.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Recent Activity
                        </h3>
                        <p className="text-gray-600">
                            Check your recent actions and notifications.
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Dashboard Overview
                    </h2>
                    <p className="text-gray-600">
                        This is your main dashboard where you can access all the
                        features and tools according to your role. Use the
                        sidebar navigation to explore different sections of the
                        application.
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
