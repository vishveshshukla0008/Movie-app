import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // if the backend uses cookies
});

export const loginRequest = async (credentials) => {
    const { data } = await api.post("/login", credentials);
    return data;
};

export const registerRequest = async (userInfo) => {
    const { data } = await api.post("/register", userInfo);
    return data;
};

export const getMeRequest = async () => {
    const { data } = await api.get("/getme");
    return data;
};

export const logoutRequest = async () => {
    const { data } = await api.get("/logout");
    return data;
};
