import * as httpRequest from "../../utils/httpRequest";

export const createOrderRefund = async (orderId: string, dataRefund: FormData) => {
    try {
        const res = await httpRequest.post(`/order-refund/${orderId}`, dataRefund, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getOrderRefundDetail = async (orderId: string) => {
    try {
        const res = await httpRequest.get(`/order-refund/${orderId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};