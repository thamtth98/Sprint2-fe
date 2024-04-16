import axios from "axios";
export const getAll = async (pageContract) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/home`,pageContract
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllProducer = async ()=>{
    try{
        const res = await axios.get("http://localhost:8080/producer");
        return res.data;
    }catch(e){
        console.log(e);
    }
}
export const getProductAddToCart = async (id)=>{
  try{
      const res = await axios.get(`http://localhost:8080//product/${id}`);
      return res.data;
  }catch(e){
      console.log(e);
  }
}