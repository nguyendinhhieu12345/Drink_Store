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
        const res = await httpRequest.get(`/review/product/${productId}?page=${currentPage}&size=3`);
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

export const likeProduct = async (productReviewId: string, interaction: string, userId: string) => {
    try {
        const res = await httpRequest.post(`/review/product-review/${productReviewId}`, {
            interaction, userId
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getProductsRecommend = async (userId: string, quantity: number) => {
    try {
        const res = await httpRequest.get(`/product/recommend?user_id=${userId}&quantity=${quantity}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};