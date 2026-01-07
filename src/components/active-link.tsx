import type React from "react";
import { Link, useLocation } from "react-router-dom";

export const ActiveLink = ({
    href,
    children,
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href}
            className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${
                    isActive
                        ? "bg-[#353F4D] text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }
                ${className} 
            `}
        >
            {children}
        </Link>
    );
};
