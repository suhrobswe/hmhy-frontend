import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useLessonsStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => request.get("/lessons/stats").then((res) => res.data),
    });
};
