import { request } from "@/config/request";
import type { ChangePassword, EditProfile } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useEditProfile = (_p0: { username: string; phone: string; }) => {
    return useMutation({
        mutationFn: (data: EditProfile) => request.patch("/admin/update", data),
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePassword) =>
            request.patch("/admin/changePassword", data),
    });
};
