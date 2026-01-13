import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";
import { links } from "./layout-data";
import type { Role } from "@/types/auth-type";
import Cookies from "js-cookie";

export function AppSidebar({ role }: { role: Role }) {
    const isActive = Cookies.get("isActive") === "true";

    let menuLinks = links[role] ?? [];

    if (role === "teacher" && !isActive) {
        menuLinks = menuLinks.filter(
            (item) =>
                item.url.includes("profile") ||
                item.title.toLowerCase().includes("profile")
        );
    }

    const homePath =
        role === "teacher" ? "/teacher/dashboard" : "/admin/dashboard";

    return (
        <Sidebar className="bg-[#1E2939]! border-none">
            <SidebarHeader className="bg-[#1E2939]! border-b border-gray-700/50">
                <Link
                    to={
                        isActive || role === "admin"
                            ? homePath
                            : "/teacher/profile"
                    }
                    className="flex items-center justify-center px-4 py-5"
                >
                    <div className="inline-flex items-center justify-center">
                        <span className="text-4xl font-bold tracking-wide">
                            <span className="text-white italic">HM</span>
                            <span className="text-teal-500 italic">H</span>
                            <span className="text-gray-400 italic">Y</span>
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="bg-[#1E2939]! px-2 py-4">
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuLinks.map((item) => (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton
                                    asChild
                                    className="text-gray-300 hover:text-white hover:bg-gray-700/50! data-[active=true]:text-white! data-[active=true]:bg-[#353F4D]!"
                                >
                                    <ActiveLink
                                        href={item.url}
                                        className="flex items-center gap-3 px-3 py-2 data-[active=true]:bg-[#353F4D]! aria-[current=page]:bg-[#353F4D]!"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
        </Sidebar>
    );
}
