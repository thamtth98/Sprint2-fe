import { useNavigate } from "react-router-dom";
import { axiosCof } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { getListCartFromData } from "../../service/productService";
import * as paymentService from "../../service/paymentService";

import { useEffect, useState } from "react";

export default function CheckoutSuccessfully() {
  const navigate = useNavigate();
  const [resultPayment, setResultPayment] = useState("");

  // useEffect(() => {
  //   console.log(userInfo.id);
  //   if (userInfo.username) {
  //     getListCartFromData().then((res) => {
  //       const size = res.reduce((c, cart) => {
  //         return c + cart.quantity;
  //       }, 0);
  //       dispatch(cartActions.setCartSize(size));
  //     });
  //   }
  // }, [userInfo.username]);
  useEffect(() => {
    console.log("tham khung");
    const setPaymentOk = async () => {
      paymentService.getInfo().then((res) => {
        const id = parseInt(res.id);
        const searchParams = new URLSearchParams(window.location.search);
        const status = searchParams.get(`vnp_TransactionStatus`);
        axiosCof
          .get(`http://localhost:8080/auth/payment_info/${id}`, {
            params: { status: status },
          })
          .then((re) => {
            setResultPayment(re.data);
            if (resultPayment === "success") {
              navigate(`/`);
              toast("Thanh toán thành công");
            } else {
              if (re.data === "error") {
                navigate(`/cart`);
                toast(
                  "Thanh toán đã bị gián đoạn hoặc thất bại!Vui lòng thử lại"
                );
              }
            }
          });
      });
    };

    setPaymentOk();
  }, [resultPayment]);
}
