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
    return axios({ url, method, data: body })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

export const setBearerToken = (accessToken) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
};
