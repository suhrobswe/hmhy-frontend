import {
    Users,
    User,
    Wallet,
    CreditCard,
    BookOpen,
    GraduationCap,
    CalendarDays,
    HomeIcon,
    Shield,
} from "lucide-react";

export const links = {
    superadmin: [
        { title: "Dashboard", url: "/admin/dashboard", icon: HomeIcon },
        { title: "Admins", url: "/admin/admins", icon: Shield },
        { title: "Teachers", url: "/admin/teachers", icon: Users },
        { title: "Students", url: "/admin/students", icon: GraduationCap },
        { title: "Lessons", url: "/admin/lessons", icon: BookOpen },
        { title: "Payments", url: "/admin/payments", icon: Wallet },
        { title: "Earnings", url: "/admin/earnings", icon: CreditCard },
        { title: "Profile", url: "/admin/profile", icon: User },
    ],

    admin: [
        { title: "Dashboard", url: "/admin/dashboard", icon: HomeIcon },
        { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
        { title: "Students", url: "/admin/students", icon: Users },
        { title: "Lessons", url: "/admin/lessons", icon: BookOpen },
        { title: "Payments", url: "/admin/payments", icon: Wallet },
        { title: "Profile", url: "/admin/profile", icon: User },
    ],

    teacher: [
        { title: "Dashboard", url: "/teacher/dashboard", icon: BookOpen },
        { title: "Students", url: "/teacher/students", icon: CalendarDays },
        { title: "Payments", url: "/teacher/payments", icon: Wallet },
        { title: "Profile", url: "/teacher/profile", icon: User },
    ],
};
