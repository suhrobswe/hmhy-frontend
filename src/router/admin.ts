import { AdminPage } from "@/pages/admin/admin";
import { ProfilePage } from "@/pages/admin/profile";

export const adminRoute = [
    {
        path: "/admin/dashboard",
        page: ProfilePage,
    },
    {
        path: "/admin/admins",
        page: AdminPage,
    },
    {
        path: "/admin/teachers",
        page: ProfilePage,
    },
    {
        path: "/admin/students",
        page: ProfilePage,
    },
    {
        path: "/admin/lessons",
        page: ProfilePage,
    },
    {
        path: "/admin/payments",
        page: ProfilePage,
    },
    {
        path: "/admin/earnings",
        page: ProfilePage,
    },

    {
        path: "/admin/profile",
        page: ProfilePage,
    },
];
