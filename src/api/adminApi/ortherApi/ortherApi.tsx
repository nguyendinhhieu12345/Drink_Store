import axios from "axios";

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
