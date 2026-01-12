import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useBlockStudent = () => {
    return useMutation({
        mutationFn: ({
            studentId,
            reason,
        }: {
            studentId: string;
            reason: string;
        }) => request.post(`/student/${studentId}/toggle-block`, { reason }),
    });
};
