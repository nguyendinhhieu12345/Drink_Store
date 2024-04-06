import { Auth, signupState } from "../../type";
import * as httpRequest from "../../utils/httpRequest";

export const loginPass = async (params: Auth) => {
    try {
        const res = await httpRequest.post("/auth/user/login", {
            email: params.email,
            password: params.password,
            fcmTokenId: params.fcmTokenId
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
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

export const test = async () => {
    try {
        const res = await httpRequest.get("/user/listServerOfUser");
        return res?.result;
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
        const res = await httpRequest.post("/user/forgetpassword", {
            email: email,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const resetPassword = async (newPass: string, token: string) => {
    try {
        const res = await httpRequest.post("/user/reset-password", {
            newPassword: newPass,
            token: token,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePassword = async (username: string, password: string) => {
    try {
        const res = await httpRequest.post("/user/change-password", {
            username: username,
            password: password,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};