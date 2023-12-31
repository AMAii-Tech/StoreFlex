import axios from "axios";
const baseUrl = "http://localhost:5000";
axios.defaults.baseURL = baseUrl;
export const apiList = {
    loginAPI: "/auth/login",
    registerAPI: "/auth/register",
    profileAPI: "/auth/profile",
};

export const makeRequest = ({ controller, body, method }) => {
    const url = baseUrl + controller;
    return axios({ url, method, data: body }).catch(console.error);
};
