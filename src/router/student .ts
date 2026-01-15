import { HistoryPage } from "@/pages/student/history";
import { ProfilePage } from "@/pages/student/profile";
import { SchelduePage } from "@/pages/student/scheldue";
import { TeacherPage } from "@/pages/student/teachers";

export const studentRoute = [
    {
        path: "/teachers",
        page: TeacherPage,
    },
    {
        path: "/profile",
        page: ProfilePage,
    },
    {
        path: "/history",
        page: HistoryPage,
    },
    {
        path: "/scheldue",
        page: SchelduePage,
    },
];
