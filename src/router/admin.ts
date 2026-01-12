import { AdminPage } from "@/pages/admin/admin";
import { TeacherLessonsPage } from "@/pages/admin/components/teacher/TeacherLesson";
import { DashboardPage } from "@/pages/admin/dashboard";
import { DeletedTeachersPage } from "@/pages/admin/deletedTeacher";
import { EarningsPage } from "@/pages/admin/earnings";
import { LessonsPage } from "@/pages/admin/lesson";
import { PaymentPage } from "@/pages/admin/payment";
import { ProfilePage } from "@/pages/admin/profile";
import { StudentsPage } from "@/pages/admin/students";
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
        path: "/admin/teachers/deleted",
        page: DeletedTeachersPage,
    },
    {
        path: "/admin/students",
        page: StudentsPage,
    },
    {
        path: "/admin/lessons",
        page: LessonsPage,
    },
    {
        path: "/admin/lesson/:id",
        page: TeacherLessonsPage,
    },
    {
        path: "/admin/payments",
        page: PaymentPage,
    },
    {
        path: "/admin/earnings",
        page: EarningsPage,
    },

    {
        path: "/admin/profile",
        page: ProfilePage,
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
