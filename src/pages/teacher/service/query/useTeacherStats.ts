import { request } from "@/config/request";
import type { ITeacherStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTeacherStats = () => {
    return useQuery({
        queryKey: ["teacherDashboardStats"],
        queryFn: () =>
            request
                .get<{ data: ITeacherStats }>("/teacher/dashboard-stats")
                .then((res) => res.data.data),
    });
};
