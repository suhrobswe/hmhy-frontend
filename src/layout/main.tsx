import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";
import Cookies from "js-cookie";
import type { Role } from "@/types/auth-type";
import { AppHeader } from "./header";

export const MainLayout = () => {
    const location = useLocation(); 
    const token = Cookies.get("token2");
    const role = Cookies.get("role") as Role | undefined;
    const isActive = Cookies.get("isActive") === "true"; 
    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    if (role === "teacher" && !isActive) {
        const isOnProfilePage = location.pathname === "/teacher/profile";

        if (!isOnProfilePage) {
            return <Navigate to="/teacher/profile" replace />;
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar role={role} />

            <main className="flex-1 w-full min-h-screen text-gray-100 bg-[#E0E0E0]">
                <AppHeader role={role} />

                <section className="p-6">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
};
