import React from "react";

function TableLayout({ children, className }) {
    return (
        <div
            className={`${className} py-1.5 relative overflow-x-auto shadow-md sm:rounded-lg `}
        >
            {children}
        </div>
    );
}
function Table({ children, className }) {
    return (
        <table
            className={` table-fixed table text-sm text-left text-primary ${className}`}
        >
            {children}
        </table>
    );
}
function Thead({ children, className }) {
    return (
        <thead
            className={`text-xs text-white   bg-primary capitalize  ${className}`}
        >
            {children}
        </thead>
    );
}

function Th({ children, className }) {
    return (
        <th scope="col" className={`${className} px-6 py-3 capitalize`}>
            {children}
        </th>
    );
}

function Td({ children, className = "w-full", ...props }) {
    return (
        <td
            {...props}
            className={`${className} px-6 py-4 capitalize text-black text-base`}
        >
            {children}
        </td>
    );
}
TableLayout.Table = Table;
TableLayout.Thead = Thead;
TableLayout.Th = Th;
TableLayout.Td = Td;
export default TableLayout;
