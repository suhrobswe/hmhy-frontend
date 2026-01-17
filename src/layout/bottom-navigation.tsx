import { Link, useLocation } from "react-router-dom";
import { Users, CalendarDays, History, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        label: "Ustozlar",
        path: "/student/teachers",
        icon: Users,
    },
    {
        label: "Jadval",
        path: "/student/scheldue",
        icon: CalendarDays,
    },
    {
        label: "Tarix",
        path: "/student/history",
        icon: History,
    },
    {
        label: "Profil",
        path: "/student/profile",
        icon: UserCircle,
    },
];

export const BottomNav = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-lg border-t border-slate-200">
            <div className="flex items-center justify-around h-16 mb-safe">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                                isActive
                                    ? "text-emerald-600"
                                    : "text-slate-400",
                            )}
                        >
                            <Icon
                                size={24}
                                className={isActive ? "scale-110" : ""}
                            />
                            <span className="text-[10px] mt-1 font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
