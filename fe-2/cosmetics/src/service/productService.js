import { axiosCof } from "../config/axiosConfig";
export const getAll = async (pageContract) => {
  try {
    const res = await axiosCof.post(`http://localhost:8080/home`, pageContract);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllProducer = async () => {
  try {
    const res = await axiosCof.get("http://localhost:8080/producer");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getProductAddToCart = async (id) => {
  try {
    const res = await axiosCof.get(`http://localhost:8080/product/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    
  }
};

export const getProductSameType = async (id) => {
  try {
    const res = await axiosCof.get(`http://localhost:8080/product/type/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const saveListCart = async (productListDto) => {
  console.log(productListDto);
  try {
    const res = await axiosCof.post(
      `http://localhost:8080/cart/addToCart`,
      productListDto
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const loginConfirm = async (account) => {
  try {
    const res = await axiosCof.post(
      "http://localhost:8080/auth/login",
      account
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllSize = async () => {
  try {
    const res = await axiosCof.get("http://localhost:8080/size");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getListCartFromData = async (idAccount) => {
  try {
    const res = await axiosCof.get(
      `http://localhost:8080/cart/getAllList?id= ${idAccount}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const logout = async () => {
  try {
      const res = await axiosCof.get(`http://localhost:8080/auth/logout`);
      console.log(res.data)
      return res.data;
  } catch (e) {
      console.log(e);
  }
}

export const saveQuantity = async (idCosmeticsSize,quantity) => {
  console.log(idCosmeticsSize,quantity);
  try {
    const res = await axiosCof.post(
      `http://localhost:8080/product/${idCosmeticsSize}/${quantity}`      
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};