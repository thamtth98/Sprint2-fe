import { useEffect, useState } from "react";
import { getListCartFromData } from "../../service/productService";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../../service/paymentService";
import * as paymentService from "../../service/paymentService";
import * as productService from "../../service/productService";
import { toast } from "react-toastify";
import Header from "../home/Header";

const initPaymentValue = {
  paymentStatusId: 2,
};
function Checkout() {
  const [carts, setCarts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const [userInfo, setUserInfo] = useState();
  const [paymentValue, setPaymentValue] = useState(initPaymentValue);

  useEffect(() => {
    loadUserLogin();
  }, []);
  const loadUserLogin = async () => {
    try {
      const res = await paymentService.getInfo();
      setUserInfo(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (userInfo) {
      const idAccount = userInfo.id;
      if (idAccount) {
        getListCartFromData(idAccount);
      }
    }
  }, [userInfo]);

  const getListCartFromData = async (idAccount) => {
    try {
      const res = await productService.getListCartFromData(idAccount);
      setCarts(res);
    } catch (error) {
      console.log(error);
    }
  };
  //lấy thông tin khách hàng
  const [userData, setUserData] = useState({
    fullname: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (carts) {
      const totalPrice = carts.reduce((total, order) => {
        return total + order.cosmeticsSize.price * order.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [carts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentValue({ ...paymentValue, [name]: value });
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePayment = () => {
    //tao
    const billDto = {
      username: userData.username,
      address: userData.address
    };
    console.log(billDto);
    createPayment(totalPrice, userInfo.id,billDto)
      .then((res) => {
        window.location.href = res;
      })
      .catch((error) => {
        if (error.response.data === "error") {
          toast.error("Thanh toán thất bại!!", {
            className: "custom-toast-success",
          });
        } else if (error.response.data === "success") {
          toast.success("Thành toán thành công!!", {
            className: "custom-toast-success",
          });
        }
      });
  };

  if (!carts) return <div>loading...</div>;

  return (
    <>
      <div className=" p-5 shadow-0 col-12 row">
        <div className="col-8 row border mb-5">
          <div className="col-12">
            <h3>Thông tin đơn hàng</h3>
          </div>
          <div className="col-12 row">
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Họ và tên</small>
                <input
                  name="fullname"
                  // value={userData.fullname}
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="Nguyen Van A"
                  className="form-control"
                  defaultValue={userInfo.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Số điện thoại</small>
                <input
                  name="phoneNumber"
                  // value={userData.phoneNumber}
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="09xxxxxxxx"
                  className="form-control"
                  defaultValue={userInfo.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Địa chỉ nhận hàng</small>
                <input
                  type="text"
                  style={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    resize: "none",
                  }}
                  placeholder="Số nhà, địa chỉ"
                  className="form-control"
                  defaultValue={userInfo.address}
                  name="address"
                  // value={userData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Email</small>
                <input
                  type="email"
                  style={{ fontWeight: "bold" }}
                  placeholder="abc@gmail.com"
                  className="form-control"
                  defaultValue={userInfo.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr className="mt-3" />
            <div className="col-12">
              <h4>Ghi chú cho đơn hàng</h4>
              <div className="mt-3">
                <div className="form p-2">
                  
                  <input
                    className="form-control"
                    id="textAreaExample1"
                    style={{ overflow: "hidden", resize: "none" }}
                    onChange={handleChange}
                    name="note"
                    value={userData.note}
                  ></input>
                </div>
              </div>
            </div>

            <div className="col-8"></div>
            <div className="button-group col-4 p-3">
              <button
                className="btn btn-light border me-2"
                onClick={() => navigate("/cart")}
              >
                Hủy
              </button>
              <button
                className="btn btn-custom shadow-0 border"
                onClick={handlePayment}
                style={{backgroundColor:'red'}}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-4 "
          style={{ overflowY: "auto", maxHeight: "470px" }}
        >
          <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: "320px" }}>
            <h6 className="mb-3">Tổng</h6>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Tổng tiền sản phẩm</p>
              <p className="mb-2">
                {totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Phí vận chuyển</p>
              <p className="mb-2">+ 30.000 VND</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="mb-2">Tổng tiền</p>
              <p className="mb-2 fw-bold" style={{ color: "red" }}>
                {(totalPrice + 30000).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            <hr />
            <h6 className="text-dark my-4">Sản phẩm đã chọn</h6>

            {carts.map((cart, index) => (
              <div className="d-flex align-items-center mb-4" key={index}>
                <div className="me-3 position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                    {cart.quantity}
                  </span>
                  {/* <img
                    src={`data:image/jpeg;base64,${cart.product.image}`}
                    style={{ width: "96px", height: "96px" }}
                    className="img-sm rounded border"
                  /> */}
                </div>
                <div className="">
                  <a href="#" className="nav-link">
                    {cart.cosmeticsSize.product.name} <br />
                    <small className="text-muted text-nowrap">
                      {cart.cosmeticsSize.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </small>
                  </a>
                  <div className="price text-muted">
                    Tổng tiền:{" "}
                    {(cart.cosmeticsSize.price * cart.quantity).toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Checkout;
