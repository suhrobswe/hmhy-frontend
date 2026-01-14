import { request } from "@/config/request";
import type { DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
    return useQuery<DashboardStats>({
        queryKey: ["dashboard-stats"],
        queryFn: () => request.get("/admin/stats").then((res) => res.data),
        refetchInterval: 30000,
    });
};
