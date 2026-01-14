import { request } from "@/config/request";
import type { CreateAdmin } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdmin = () => {
    return useMutation({
        mutationFn: (data: CreateAdmin) => request.post("/admin", data),
    });
};
