import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";
import Cookies from "js-cookie";
import type { Role } from "@/types/auth-type";

export const MainLayout = () => {
    const token = Cookies.get("token2");
    const role = Cookies.get("role") as Role | undefined;

    console.log(token, role);

    if (!token || !role) {
        return <Navigate to="/login/admin" replace />;
    }

    return (
        <SidebarProvider>
            <AppSidebar role={role} />

            <main className="grow min-h-screen from-black via-gray-900 to-gray-800 text-gray-100">
                <header className="sticky top-0 z-50 border-b border-gray-800 p-4 flex items-center justify-between backdrop-blur-md">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold capitalize">
                        {role} Dashboard
                    </h1>
                </header>

                <section className="p-6">
                    <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-6">
                        <Outlet />
                    </div>
                </section>
            </main>
        </SidebarProvider>
    );
};
