export interface LoginResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: {
        data: { role: string; accessToken: string };
    };
}

export interface AdminLoginInput {
    username: string;
    password: string;
}


export type Role = "admin" | "teacher" | "superadmin";
