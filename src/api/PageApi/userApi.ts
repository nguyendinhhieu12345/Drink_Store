import axios from "axios";
import * as httpRequest from "../../utils/httpRequest";

export const getProfileUser = async (userId: string) => {
    try {
        const res = await httpRequest.get(`/user/${userId}/view`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateProfileUser = async (userId: string, firstName: string, lastName: string, birthDate: string, gender: string, phoneNumber: string) => {
    try {
        const res = await httpRequest.put(`/user/${userId}`, {
            firstName, lastName, birthDate, gender, phoneNumber
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateAvatarUser = async (userId: string, image: FormData) => {
    try {
        const res = await httpRequest.patch(`/user/${userId}/upload/avatar`, image,
            {
                "Content-Type": "multipart/form-data",
            });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePasswordUser = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const res = await httpRequest.patch(`/auth/user/${userId}/change-password`, {
            oldPassword, newPassword
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllProvince = async () => {
    try {
        const res = await axios.get(`https://vapi.vnappmob.com/api/province`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllDistrict = async (province_id: string) => {
    try {
        const res = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${province_id}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllWard = async (district_id: string) => {
    try {
        const res = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${district_id}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addAddressUser = async (
    userId: string,
    longitude: number,
    latitude: number,
    note: string,
    recipientName: string,
    phoneNumber: string,
    detail: string,
) => {
    try {
        const res = await httpRequest.post(`/address/user/${userId}`, {
            longitude, latitude, note, recipientName, phoneNumber, detail
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllAddresUser = async (userId: string) => {
    try {
        const res = await httpRequest.get(`/address/user/${userId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteAddress = async (addressId: string) => {
    try {
        const res = await httpRequest.deleted(`/address/${addressId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAddressDetail = async (addressId: string) => {
    try {
        const res = await httpRequest.get(`/address/${addressId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateAddressUser = async (
    addressId: string,
    longitude: number,
    latitude: number,
    note: string,
    recipientName: string,
    phoneNumber: string,
    detail: string,
    status: boolean
) => {
    try {
        const res = await httpRequest.put(`/address/${addressId}`, {
            longitude, latitude, note, recipientName, phoneNumber, detail, default: status
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllOrderByUserId = async (
    userId: string,
    pageCurrent?: number,
    order_phases_status?: string
) => {
    try {
        const res = await httpRequest.get(
            `/order/history/user/${userId}?page=${pageCurrent}&size=10&order_phases_status=${order_phases_status}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};