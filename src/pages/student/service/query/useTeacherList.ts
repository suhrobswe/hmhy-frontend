import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["teacherListForStudent"],
        queryFn: () => request.get("/teacher").then((res) => res.data),
    });
};
