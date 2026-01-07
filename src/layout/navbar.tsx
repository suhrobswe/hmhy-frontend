import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";
import { links } from "./layout-data";
import type { Role } from "@/types/auth-type";

export function AppSidebar({ role }: { role: Role }) {
    const menuLinks = links[role] ?? [];
    const homePath =
        role === "teacher" ? "/teacher/dashboard" : "/admin/dashboard";

    return (
        <Sidebar className="bg-[#1E2939]!">
            <SidebarHeader className="bg-[#1E2939]! border-b border-gray-700/50">
                <Link
                    to={homePath}
                    className="flex items-center gap-2 px-4 py-3"
                >
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                </Link>
            </SidebarHeader>

            {/* MENU */}
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

            {/* FOOTER */}
            <SidebarFooter className="bg-[#1E2939]! border-t border-gray-700/50 p-4"></SidebarFooter>
        </Sidebar>
    );
}
