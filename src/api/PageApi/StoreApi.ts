import * as httpRequest from "../../utils/httpRequest";

export const getStores = async (lat: number, lng: number, key?: string) => {
    try {
        const res = await httpRequest.get(`/branch/active?all=true&lat=${lat}&lng=${lng}&page=1&size=999${key !== "" ? `&key=${key}` : ""}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getStoreDetail = async (branchId: string) => {
    try {
        const res = await httpRequest.get(`/branch/${branchId}/view`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};