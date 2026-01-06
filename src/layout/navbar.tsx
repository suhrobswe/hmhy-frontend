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
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ActiveLink } from "@/components/active-link";
import { links } from "./layout-data";
import type { Role } from "@/types/auth-type";
import Cookies from "js-cookie";

export function AppSidebar({ role }: { role: Role }) {
    const menuLinks = links[role] ?? [];

    const homePath =
        role === "teacher" ? "/teacher/dashboard" : "/admin/dashboard";
    return (
        <Sidebar className="border-r border-[#0e0e0e] bg-linear-to-b from-black via-[#0b0b0b] to-[#020202] shadow-2xl bg-[#1E2939]">
            <SidebarHeader className="flex justify-center py-8 border-b border-[#111]">
                <Link to={homePath} className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <span className="text-xl font-bold capitalize text-cyan-400">
                        {role.replace("_", " ")}
                    </span>
                </Link>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent>
                <SidebarGroupContent className="p-4">
                    <SidebarMenu className="space-y-2">
                        {menuLinks.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <ActiveLink href={item.url}>
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="border-t border-[#111] p-4">
                <Button
                    variant="destructive"
                    className="w-full flex gap-2"
                    onClick={() => {
                        Cookies.remove("token");
                        Cookies.remove("role");
                        window.location.href = "/login/admin";
                    }}
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
