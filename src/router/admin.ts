import { AdminPage } from "@/pages/admin/admin";
import { DashboardPage } from "@/pages/admin/dashboard";
import { DeletedTeachersPage } from "@/pages/admin/deletedTeacher";
import { PaymentPage } from "@/pages/admin/payment";
import { ProfilePage } from "@/pages/admin/profile";
import { TeacherPage } from "@/pages/admin/teacher";
import { BookOpen, DollarSign, GraduationCap, Users } from "lucide-react";

export const adminRoute = [
    {
        path: "/admin/dashboard",
        page: DashboardPage,
    },
    {
        path: "/admin/admins",
        page: AdminPage,
    },
    {
        path: "/admin/teachers",
        page: TeacherPage,
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
        page: PaymentPage,
    },
    {
        path: "/admin/earnings",
        page: ProfilePage,
    },

    {
        path: "/admin/profile",
        page: ProfilePage,
    },

    {
        path: "/admin/teachers/deleted",
        page: DeletedTeachersPage,
    },
];

export const tezkorHarakatlar = [
    {
        title: "Ustozlar",
        icon: Users,
        color: "bg-blue-100",
        iconColor: "text-blue-600",
        link: "/admin/teachers",
    },
    {
        title: "Talabalar",
        icon: GraduationCap,
        color: "bg-green-100",
        iconColor: "text-green-600",
        link: "/admin/students",
    },
    {
        title: "Darslar",
        icon: BookOpen,
        color: "bg-purple-100",
        iconColor: "text-purple-600",
        link: "/admin/lessons",
    },
    {
        title: "To'lovlar",
        icon: DollarSign,
        color: "bg-yellow-100",
        iconColor: "text-yellow-600",
        link: "/admin/payments",
    },
];
