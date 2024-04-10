import * as httpRequest from "../../utils/httpRequest";

export const getProductDetail = async (categoryId: string) => {
    try {
        const res = await httpRequest.get(`/product/category/${categoryId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};