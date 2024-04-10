import * as httpRequest from "../../utils/httpRequest";

export const getCouponsRelease = async (type: string, quantity: number) => {
    try {
        const res = await httpRequest.get(`/coupon/release?quantity=${quantity}${type !== "" ? `&type=${type}` : ""}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCouponDetailRelease = async (couponId: string) => {
    try {
        const res = await httpRequest.get(`/coupon/release/${couponId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};