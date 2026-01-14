import { request } from "@/config/request";
import type { AdminLoginInput, LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAdminLogin = () => {
    return useMutation<LoginResponse, any, AdminLoginInput>({
        mutationFn: (data: AdminLoginInput) =>
            request.post("/signin/admin", data, { withCredentials: true }),
    });
};
