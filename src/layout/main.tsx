import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";
import { AppHeader } from "./header";
import { BottomNav } from "./bottom-navigation";
import type { Role } from "@/types";

export const MainLayout = () => {
    const location = useLocation();

    const token = Cookies.get("frontToken");

    const storedRole = Cookies.get("role") as Role | undefined;

    const isStudentPath = location.pathname.startsWith("/student");

    const role = isStudentPath ? ("student" as Role) : storedRole;

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (role === "student") {
        return (
            <div className="relative min-h-dvh bg-slate-50 flex flex-col">
                <main className="flex-1 w-full pb-20">
                    <Outlet />
                </main>
                <BottomNav />
            </div>
        );
    }

    if (!role) {
        return <Navigate to="/" replace />;
    }

    return (
        <SidebarProvider>
            {/* Endi role aniq 'Role' tipida, TypeScript xato bermaydi */}
            <AppSidebar role={role} />
            <main className="flex-1 w-full min-h-screen bg-[#F5F5F7]">
                <AppHeader role={role} />
                <section className="p-4 md:p-6">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
};
