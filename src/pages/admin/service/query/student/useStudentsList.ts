import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
export const useStudentsList = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["studentsList", page, limit],
        queryFn: () =>
            request
                .get("/student", {
                    params: {
                        page,
                        limit,
                    },
                })
                .then((res) => res.data),
    });
};
