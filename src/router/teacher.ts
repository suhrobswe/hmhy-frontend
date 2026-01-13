import { TeacherLessons } from "@/pages/teacher/lessons";
import { Payments } from "@/pages/teacher/payments";
import { TeacherProfile } from "@/pages/teacher/profile";
import { Schedule } from "@/pages/teacher/schedule";

export const teacherRoute = [
    {
        path: "/teacher/lessons",
        page: TeacherLessons,
    },

    {
        path: "/teacher/schedule",
        page: Schedule,
    },

    {
        path: "/teacher/payments",
        page: Payments,
    },
    {
        path: "/teacher/profile",
        page: TeacherProfile,
    },
];
