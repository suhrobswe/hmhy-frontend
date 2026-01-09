import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useTeacherList = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ["teacherList", page, limit],
        queryFn: () =>
            request
                .get("/teacher", {
                    params: {
                        page,
                        limit,
                    },
                })
                .then((res) => res.data),
    });
};
