import { axiosCof } from "../config/axiosConfig";

export const delToCart = async (id) => {
    try {
        const res = await axiosCof.delete(`http://localhost:8080/cart/delete/${id}`);
        console.log(res.data)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const getBill = async (email) => {
    try {
        const res = await axiosCof.post(`http://localhost:8080/cart/getAllPayment`,email);
        console.log(res.data)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const detailBill = async (idAccount,idBill) => {
    try {
        const res = await axiosCof.get(`http://localhost:8080/cart/detailBill/${idAccount}/${idBill}`);
        console.log(res.data);
        console.log("hi");
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
