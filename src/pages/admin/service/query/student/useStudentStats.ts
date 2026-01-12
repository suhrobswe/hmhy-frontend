import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useStudentStats = () => {
    return useQuery({
        queryKey: ["studentStats"],
        queryFn: () => request.get("/student/stats").then((res) => res.data),
    });
};
