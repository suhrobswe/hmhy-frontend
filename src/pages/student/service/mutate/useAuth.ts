import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useAuth = () => {
    return useMutation({
        mutationFn: (initData: string) =>
            request.post("/telegram/login", { initData }),

        onSuccess: (res) => {
            const token =
                res?.data?.data?.accessToken || res?.data?.accessToken;
            if (token) {
                Cookies.set("frontToken", token);

                const role = "student";
                Cookies.set("role", role);
                localStorage.setItem("role", role);

                window.location.replace("/student/profile");
            }
        },
    });
};
