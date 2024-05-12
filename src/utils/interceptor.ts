import { AxiosError } from "axios";
import * as httpRequest from "./httpRequest";
import jwtDecode from "jwt-decode";
import { Store } from "@reduxjs/toolkit";
import { logoutThunk, refetchTokenStore, resetStoreAuth } from "@/features/auth/authSlice";
import { User } from "@/type";
import { AppDispatch } from "@/redux/store";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

interface IAccessToken {
    exp: number;
    iat: number;
    userId: string;
    username: string;
    role: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    phone: string;
    email: string;
    accessToken: string;
}
const getTimeNow = (): number => {
    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
    });

    const convertedDate = new Date(formattedDate);
    return convertedDate.getTime() / 1000;
};
// api call to get access token new
const refetchToken = async () => {
    try {
        const data = await httpRequest.post("/auth/user/refresh-token", {
            headers: {
                withCredentials: true,
            },
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

// interceptor setup
export const setupInterceptor = (store: Store, dispatch: AppDispatch): void => {
    let isRefreshing: boolean = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let refreshPromise: Promise<any> | null = null;
    //           isRefreshing = true;
    refreshPromise = null;
    isRefreshing = false;
    // handle request call aceess token
    httpRequest.default.interceptors.request.use(
        async (config) => {
            if (config.url?.includes("/auth/user/login")) {
                return config;
            }

            if (config.url?.includes("/auth/user/register")) {
                return config;
            }

            if (config.url?.includes("/auth/user/change-password")) {
                return config;
            }

            if (config.url?.includes("/auth/user/reset-password")) {
                return config;
            }

            const user: User = store.getState().authSlice?.currentUser;
            // store.dispatch(refetchTokenStore(accessToken));
            if (user?.data?.accessToken) {
                const accessToken: IAccessToken = jwtDecode(user?.data?.accessToken);
                if (accessToken?.exp < getTimeNow()) {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        if (!refreshPromise) {
                            refreshPromise = refetchToken();
                        }
                        // call refresh token => sau dos set lai access token
                        const data = await refreshPromise;
                        const dataTemplate: User = {
                            ...user,
                            data: {
                                userId: user?.data?.userId,
                                accessToken: user?.data?.accessToken,
                            },
                        };
                        dispatch(refetchTokenStore(dataTemplate));
                        config.headers.Authorization = "Bearer " + data.accessToken;
                        isRefreshing = false;
                        refreshPromise = null;
                        return config;
                    }
                }
                config.headers.Authorization = "Bearer " + user?.data?.accessToken;
            }

            isRefreshing = false;
            refreshPromise = null;
            return config;
        },
        (error: AxiosError): Promise<AxiosError> => {
            return Promise.reject(error);
        }
    );
    httpRequest.default.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            // logout system
            if (
                error.response?.status === 401 &&
                error.config?.url?.includes("/auth/user/refresh-token")
            ) {
                dispatch(resetStoreAuth())
                const data = await dispatch(logoutThunk(localStorage.getItem("fcmTokenId") as string));
                if (data?.type === "auth/logout/fulfilled") {
                    localStorage.removeItem("profile")
                    redirect("/login");
                    toast.error("The login session has expired!");
                    localStorage.removeItem("orderId")
                }
                else {
                    toast.error(
                        (data as { error: { message: string } }).error?.message
                    );
                }
            }
            return Promise.reject(error);
        }
    );
};
