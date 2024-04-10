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