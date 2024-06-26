import { toast } from "react-toastify";
import { Auth, signupState } from "../../type";
import * as httpRequest from "../../utils/httpRequest";
import { AxiosError } from "axios";

export const loginPass = async (params: Auth) => {
    try {
        const res = await httpRequest.post("/auth/user/login", {
            email: params.email,
            password: params.password,
            fcmTokenId: params.fcmTokenId
        });
        return res;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            if (error?.response?.data?.error?.errorCode === 13) {
                error?.response?.data?.devResponse?.details?.map((err: {
                    field: string,
                    valueReject: string,
                    validate: string
                }) => (
                    toast.error(err?.field + " " + err?.validate)
                ))
            }
            toast.error(`${error?.response?.data?.error?.errorMessage}${error?.response?.data?.error?.subErrorMessage ? ` - ${error?.response?.data?.error?.subErrorMessage}` : ""} `)
            return Promise.reject(error);
        }
    }
};

export const sendCodeRegister = async (email: string) => {
    try {
        const res = await httpRequest.post("/auth/user/register/send-code", {
            email
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const checkExistAccount = async (email: string) => {
    try {
        const res = await httpRequest.get(`/user/registered?email=${email}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const verifyCode = async (email: string, code: string) => {
    try {
        const res = await httpRequest.post("/auth/user/verify", {
            email,
            code
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const sendNotifyUser = async (userId: string | null, token: string) => {
    try {
        const res = await httpRequest.post("/notification/user", {
            userId,
            token
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const signupPass = async (params: signupState) => {
    try {
        const res = await httpRequest.post("/auth/user/register", {
            email: params.email,
            code: params.code,
            password: params.password,
            firstName: params.firstName,
            lastName: params.lastName,
            fcmTokenId: params?.fcmTokenId
        });

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const signupWithFirebase = async (fcmTokenId: string, idToken: string) => {
    try {
        const res = await httpRequest.post("/auth/user/firebase/register", {
            fcmTokenId
        }, {
            "Id-token": idToken,
        });

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const loginWithFirebase = async (fcmTokenId: string, idToken: string) => {
    try {
        const res = await httpRequest.post("/auth/user/firebase/login", {
            fcmTokenId
        }, {
            "Id-token": idToken,
        });

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = async (fcmTokenId: string) => {
    try {
        const res = await httpRequest.post("/auth/user/logout", {
            fcmTokenId
        });
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const forgetPassword = async (email: string) => {
    try {
        const res = await httpRequest.post("/auth/user/password/send-code", {
            email: email,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const resetPassword = async (email: string, code: string, password: string) => {
    try {
        const res = await httpRequest.patch("/auth/user/change-password", {
            email,
            code,
            password
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const res = await httpRequest.patch(`/auth/user/${userId}/change-password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};