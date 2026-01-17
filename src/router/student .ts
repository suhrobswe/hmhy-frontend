import { HistoryPage } from "@/pages/student/history";
import { ProfilePage } from "@/pages/student/profile";
import { SchelduePage } from "@/pages/student/scheldue";
import { TeacherPage } from "@/pages/student/teachers";

export const studentRoute = [
    {
        path: "/student/teachers",
        page: TeacherPage,
    },
    {
        path: "/student/profile",
        page: ProfilePage,
    },
    {
        path: "/student/history",
        page: HistoryPage,
    },
    {
        path: "/student/scheldue",
        page: SchelduePage,
    },
];
