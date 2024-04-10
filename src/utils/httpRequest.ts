import { BASE_URL } from "@/configs/environment";
import axios from "axios";
import { AxiosRequestHeaders } from "axios";
const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const get = async (path: string, options = {}) => {
    try {
        const response = await instance.get(path, options);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const post = async (
    path: string,
    options = {},
    headers?: AxiosRequestHeaders["headers"]
) => {
    try {
        const response = await instance.post(path, options, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const put = async (
    path: string,
    options = {},
    header?: AxiosRequestHeaders["headers"]
) => {
    try {
        const response = await instance.put(path, options, {
            headers: header,
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const deleted = async (path: string, options = {}) => {
    try {
        const response = await instance.delete(path, options);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const patch = async (path: string, options = {}, header?: AxiosRequestHeaders["headers"]) => {
    try {
        const response = await instance.patch(path, options, {
            headers: header,
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export default instance;
