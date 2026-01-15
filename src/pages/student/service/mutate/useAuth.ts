import { request } from "@/config/request";
import { setAccessToken } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
    return useMutation({
        mutationFn: (initData: string) =>
            request.post("/telegram/login", { initData }),
        onSuccess: (res) => {
            setAccessToken(res.data.data.accessToken);
        },
    });
};
