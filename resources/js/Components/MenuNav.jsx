import React from "react";
import { Link } from "@inertiajs/react";

export default function MenuNav({ menu, href, active, method }) {
    const isActive = route().current(active);
    const className = isActive
        ? "text-green-500 font-semibold"
        : "text-gray-600 hover:text-green-500";

    if (method === "POST") {
        return (
            <Link
                href={href}
                method="post"
                as="button"
                className={`cursor-pointer ${className} px-3 py-2 rounded-md text-sm font-medium`}
            >
                {menu}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-medium ${className}`}
        >
            {menu}
        </Link>
    );
}
