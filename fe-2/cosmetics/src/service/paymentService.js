import { axiosCof } from "../config/axiosConfig";

export const createPayment = async (price,id, billDto) => {
    const res = await axiosCof.post(
      `http://localhost:8080/auth/createPay?price=${price}&id=${id}`,billDto
    );
    return res.data;
  };

  export const getInfo = async () => {
    try {
        const res = await axiosCof.get(`http://localhost:8080/auth/getInfo`);
        console.log(res.data)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}