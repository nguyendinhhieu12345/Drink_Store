import * as httpRequest from "../../../utils/httpRequest";

export const addEmployee = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  branchId: string
) => {
  try {
    const res = await httpRequest.post(`/auth/employee`, {
      username,
      password,
      firstName,
      lastName,
      birthDate,
      gender,
      branchId,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllEmployee = async (
  key?: string,
  page?: string,
  status?: string
) => {
  try {
    const res = await httpRequest.get(
      `/employee?page=${page}&size=10${
        status !== "" ? `&status=${status}` : ""
      }${key !== "" ? `&key=${key}` : ""}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    const res = await httpRequest.deleted(`/employee/${employeeId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateEmployee = async (
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  branchId: string,
  employeeId: string
) => {
  try {
    const res = await httpRequest.put(`/employee/${employeeId}`, {
      firstName,
      lastName,
      birthDate,
      gender,
      branchId,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
