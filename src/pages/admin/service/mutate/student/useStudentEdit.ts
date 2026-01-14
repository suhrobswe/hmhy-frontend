import { request } from "@/config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: { id: string; data: object }) =>
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
