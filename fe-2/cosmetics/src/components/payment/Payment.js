import { useNavigate } from "react-router-dom";
import { axiosCof } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { getListCartFromData } from "../../service/productService";
import * as paymentService from "../../service/paymentService";

import { useEffect, useState } from "react";

export default function CheckoutSuccessfully() {
  const navigate = useNavigate();
  const [resultPayment, setResultPayment] = useState("");

  
  
  useEffect(() => {
    console.log("Gọi API thanh toán");
    const fetchPaymentInfo = async () => {
      try {
        const res = await paymentService.getInfo();
        const id = parseInt(res.id);
        const searchParams = new URLSearchParams(window.location.search);
        const status = searchParams.get(`vnp_TransactionStatus`);
        const re = await axiosCof.get(`http://localhost:8080/auth/payment_info/${id}`, {
          params: { status: status },
        });
        setResultPayment(re.data);
      } catch (error) {
        console.error("Lỗi khi gọi API thanh toán:", error);
      }
    };
    fetchPaymentInfo();
  }, []);

  useEffect(() => {
    console.log("Xử lý kết quả thanh toán");
    if (resultPayment === "success") {
      navigate(`/`);
      toast("Thanh toán thành công");
    } else if (resultPayment === "error") {
      navigate(`/cart`);
      toast("Thanh toán đã bị gián đoạn hoặc thất bại!Vui lòng thử lại");
    }
  }, [resultPayment]);
}
