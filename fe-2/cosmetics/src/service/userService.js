import { axiosCof } from "../config/axiosConfig";

export const saveInfo = async (account) => {
  try {
    const res = await axiosCof.post(`http://localhost:8080/info`, account);
    console.log(res.data);
    return res;
  } catch (e) {
    console.log(e);
  }
};