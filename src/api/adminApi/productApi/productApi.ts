import * as httpRequest from "../../../utils/httpRequest";

export const addProduct = async (formData: FormData, type: string) => {
  try {
    const res = await httpRequest.post(`/product?type=${type}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllProduct = async (
  key?: string,
  pageCurrent?: number,
  productStatus?: string,
  categoryId?: string
) => {
  try {
    const res = await httpRequest.get(
      `/product?page=${pageCurrent}&size=10${
        productStatus !== "" ? `&productStatus=${productStatus}` : ""
      }${key !== "" ? `&key=${key}` : ""}${
        categoryId !== "" ? `&categoryId=${categoryId}` : ""
      } `
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (ProductId: string) => {
  try {
    const res = await httpRequest.deleted(`/product/${ProductId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (formData: FormData, ProductId: string) => {
  try {
    const res = await httpRequest.put(`/product/${ProductId}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await httpRequest.get(`/product/${productId}/details`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
