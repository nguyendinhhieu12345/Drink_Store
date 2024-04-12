import * as httpRequest from "../../utils/httpRequest";

export const getProductDetail = async (productId: string) => {
    try {
        const res = await httpRequest.get(`/product/${productId}/view`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getReviewProduct = async (productId: string, currentPage: number) => {
    try {
        const res = await httpRequest.get(`/review/product/${productId}?page=${currentPage}&size=5`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getStatisticProduct = async (productId: string) => {
    try {
        const res = await httpRequest.get(`/review/statistic/product/${productId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};