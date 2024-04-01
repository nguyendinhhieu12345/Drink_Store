import * as httpRequest from "../../utils/httpRequest";

export const getBannerHome = async () => {
    try {
        const res = await httpRequest.get(`/banner/visible`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCategoryHome = async () => {
    try {
        const res = await httpRequest.get(`/category/visible`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getTopRatingProduct = async (quantity: number) => {
    try {
        const res = await httpRequest.get(`/product/top-rating/${quantity}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getTopSellingProduct = async (quantity: number) => {
    try {
        const res = await httpRequest.get(`/product/top-selling/${quantity}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
