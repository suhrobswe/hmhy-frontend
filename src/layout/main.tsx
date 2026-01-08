import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";
import Cookies from "js-cookie";
import type { Role } from "@/types/auth-type";
import { AppHeader } from "./header";

export const MainLayout = () => {
    const token = Cookies.get("token2");
    const role = Cookies.get("role") as Role | undefined;

    if (!token || !role) {
        return <Navigate to="/login/admin" replace />;
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
