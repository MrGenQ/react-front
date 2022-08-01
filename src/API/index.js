import { toast } from "react-toastify";
import axios from "axios";
const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    //baseURL: "https://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
API.interceptors.response.use(
    (response) => {
        if (response.data.warning) {
            toast.warn(response.data.warning, { theme: "colored" });
        } else if (response.data.success) {
            toast.success(response.data.success, { theme: "colored" });
        } else if (response.data.error) {
            toast.error(response.data.error, { theme: "colored" });
        }
        return response;
    },
    function (error) {
        return error.response.data;
    }
);
export default API;
