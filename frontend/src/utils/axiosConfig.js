import { BASE_URL } from "./apiEndpoints";
import axios from "axios";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

//list of endpounts that do not require authorizatin header
const excludeEndpoints = ["/login", "/register", "/activate"];
//request intereptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    };
    return config;
}
    , (error) => { return Promise.reject(error); });

//response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error.Please try again later");
        }
    } else if (error.code === "ECONNABORTED") {
        console.error('Request timeout.PLease try again');
    }
    return Promise.reject(error)
})
export default axiosConfig;