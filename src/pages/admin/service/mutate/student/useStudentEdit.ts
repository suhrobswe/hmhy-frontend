import { request } from "@/config/request";
import type { UpdateStudentData } from "@/types/admin-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: UpdateStudentData) =>
            request.patch(`/student/${id}`, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studentList"],
            });
            queryClient.invalidateQueries({
                queryKey: ["student"],
            });
            queryClient.invalidateQueries({
                queryKey: ["studentStats"],
            });
        },
    });
};
