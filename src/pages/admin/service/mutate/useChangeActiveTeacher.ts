import { request } from "@/config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeTeacherStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => request.patch(`/teacher/activate/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacherList"] });
        },
    });
};
