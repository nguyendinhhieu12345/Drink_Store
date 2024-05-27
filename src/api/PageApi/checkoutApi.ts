import { Cart } from "@/features/cart/cartSlice";
import * as httpRequest from "../../utils/httpRequest";
import { ICheckout } from "@/components/PageComponents/Checkout/CheckoutDetail";

export interface IValidateCouponRequest {
    orderItemList: Cart[],
    shippingFee: number,
    productCouponCode?: string,
    orderCouponCode?: string,
    shippingCouponCode?: string,
    totalPayment: number,
    totalItemPrice: number
}

export const getShippingFee = async (orderItemList: Cart[], addressId: string) => {
    try {
        const res = await httpRequest.post(`/order/check-shipping-item`, {
            orderItemList, addressId
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getValidateListCoupon = async (data: IValidateCouponRequest) => {
    try {
        const res = await httpRequest.post(`/coupon/get-validate-list`, data);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const checkCouponIncart = async (data: IValidateCouponRequest) => {
    try {
        const res = await httpRequest.post(`/coupon/check-coupon-in-cart`, data);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const orderShipping = async (data: ICheckout) => {
    try {
        const res = await httpRequest.post(`/order/shipping`, data);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};


export const orderOnsite = async (data: ICheckout) => {
    try {
        const res = await httpRequest.post(`/order/onsite`, data);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getOrderDetail = async (orderId: string) => {
    try {
        const res = await httpRequest.get(`/order/${orderId}/details`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getOrderStatusLine = async (orderId: string) => {
    try {
        const res = await httpRequest.get(`/order/${orderId}/status-line`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const reviewProductOrder = async (orderItemId: string, star: number, content: string) => {
    try {
        const res = await httpRequest.post(`/review`, {
            orderItemId, star, content
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getReviewOrderDetail = async (orderId: string) => {
    try {
        const res = await httpRequest.get(`/order/${orderId}/order-item`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateTransaction = async (transactionId: string) => {
    try {
        const res = await httpRequest.patch(`/transaction/${transactionId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getBranchNearest = async (lat: number, lng: number, time: string) => {
    try {
        const res = await httpRequest.get(`/branch/nearest?lat=${lat}&lng=${lng}&time=${time}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const requestCancelOrder = async (orderId: string, note: string) => {
    try {
        const res = await httpRequest.patch(`/order/${orderId}/user/cancel`, {
            note
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const cancellationRequestOrder = async (orderId: string, note: string) => {
    try {
        const res = await httpRequest.post(`/order/${orderId}/cancellation-request`, {
            note
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};