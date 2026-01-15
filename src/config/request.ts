import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1",
});

request.interceptors.request.use((config) => {
    const token = Cookies.get("frontToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/refresh`
                );

                const newAccessToken = response.data.data.token;
                Cookies.set("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return request(originalRequest);
            } catch (refreshError) {
                Cookies.remove("frontToken");
                Cookies.remove("role");

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { request };

export const BASE_URL =
    import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";
