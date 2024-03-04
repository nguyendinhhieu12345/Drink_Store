import * as httpRequest from "../../../utils/httpRequest";

export const addBranch = async (
  province: string,
  district: string,
  ward: string,
  detail: string,
  longitude: number,
  latitude: number,
  phoneNumber: number
) => {
  try {
    const res = await httpRequest.post(`/branch`, {
      province,
      district,
      ward,
      detail,
      longitude,
      latitude,
      phoneNumber,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllBranch = async () => {
  try {
    const res = await httpRequest.get(`/branch`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBranch = async (branchId: string) => {
  try {
    const res = await httpRequest.deleted(`/branch/${branchId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBranch = async (
  province: string,
  district: string,
  ward: string,
  detail: string,
  branchId: string
) => {
  try {
    const res = await httpRequest.put(`/branch/${branchId}`, {
      province,
      district,
      ward,
      detail,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
