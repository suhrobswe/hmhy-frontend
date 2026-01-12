import { request } from "@/config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            request.delete(`/student/${id}`).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studentList"],
            });
            queryClient.invalidateQueries({
                queryKey: ["studentStats"],
            });
        },
    });
};
