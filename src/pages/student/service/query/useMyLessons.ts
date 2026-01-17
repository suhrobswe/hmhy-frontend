import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useMyLessons = () => {
    return useQuery({
        queryKey: ["myLessons"],
        queryFn: () =>
            request.get("/lessons/my-lessons").then((res) => res.data),
    });
};
