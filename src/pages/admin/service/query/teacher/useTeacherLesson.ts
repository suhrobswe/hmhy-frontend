import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, Lesson, PaginationData } from "@/types/admin-type";

interface UseTeacherLessonsParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    status?: string;
}

export const useTeacherLessons = (
    teacherId: string,
    params: UseTeacherLessonsParams = {}
) => {
    return useQuery({
        queryKey: ["teacherLessons", teacherId, params],

        queryFn: async () => {
            const res = await request.get<
                ApiResponse<Lesson[] & PaginationData>
            >(`/lessons/${teacherId}/lessons`, {
                params,
            });
            return res.data;
        },
    });
};
