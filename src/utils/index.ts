import Cookies from "js-cookie";

export const getAccessToken = () => {
    return Cookies.get("frontToken");
};

export const setAccessToken = (token: string) => {
    Cookies.set("frontToken", token, { expires: 7 });
};
