import * as httpRequest from "../../../utils/httpRequest";

export const addCategory = async (formData: FormData) => {
  try {
    const res = await httpRequest.post(`/category`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (
  formData: FormData,
  categoryId: string
) => {
  try {
    const res = await httpRequest.put(`/category/${categoryId}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategory = async () => {
  try {
    const res = await httpRequest.get(`/category`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryById = async (cateId: string) => {
  try {
    const res = await httpRequest.get(`/category/${cateId}/details`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await httpRequest.deleted(`/category/${categoryId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
