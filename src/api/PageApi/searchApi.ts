import * as httpRequest from "../../utils/httpRequest";

export const getProductDetail = async (categoryId: string) => {
    try {
        const res = await httpRequest.get(`/product/category/${categoryId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCategory = async () => {
    try {
        const res = await httpRequest.get(`/category/visible`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getProductByCategoryId = async (categoryId: string, pageCurrent: number, min_price?: number, max_price?: number, min_star?: number, sort_type?: string) => {
    try {
        const res = await httpRequest.get(
            `/product/category/${categoryId}?page=${pageCurrent}&size=8
            ${min_price !== 0 ? `&min_price=${min_price}` : ""
            }${max_price !== 0 ? `&max_price=${max_price}` : ""}
            ${min_star !== 0 ? `&min_star=${min_star}` : ""}
            ${sort_type !== "" ? `&sort_type=${sort_type}` : ""}
            `
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getProductByKeyName = async (pageCurrent: number, key?: string, min_price?: number, max_price?: number, min_star?: number, sort_type?: string) => {
    try {
        const queryParams = [
            `page=${pageCurrent}`,
            `size=8`,
            min_price !== 0 ? `min_price=${min_price}` : '',
            max_price !== 0 ? `max_price=${max_price}` : '',
            min_star !== 0 ? `min_star=${min_star}` : '',
            sort_type !== '' ? `sort_type=${sort_type}` : '',
            key !== '' ? `key=${key}` : ''
        ];

        // Lọc ra các phần tử rỗng hoặc chuỗi trống
        const filteredQueryParams = queryParams.filter(param => param !== '');

        // Nối các phần tử lại với nhau bằng dấu &
        const url = `/product/visible?${filteredQueryParams.join('&')}`;

        console.log(url);
        const res = await httpRequest.get(url);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getProductByAutoComplete = async (key: string) => {
    try {
        const res = await httpRequest.get(
            `/product/autocomplete?key=${key}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};