import { request } from "@/config/request";

export const teacherAuthService = {
    sendOTP: async (data: {
        email: string;
        phoneNumber: string;
        password: string;
    }) => {
        const res = await request.post("/teacher/google/send-otp", data);
        return res.data;
    },
    verifyOTP: async (data: { email: string; otp: string }) => {
        const res = await request.post("/teacher/google/verify-otp", data);
        return res.data;
    },
};
