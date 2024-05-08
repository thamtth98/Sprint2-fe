import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import * as productService from "../../service/productService";

function Cart() {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   // console.log(savedCart);
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });

  const [cart, setCart] = useState();

  useEffect(() => {
    const res = localStorage.getItem("cart");
    if (res) {
      setCart(JSON.parse(res));
    }
  },[]);

  // useEffect(() => {
  //   setCart(cart);
  // },[]);

  //nếu đã đăng nhập
  useEffect(() => {
    const idAccount = localStorage.getItem("id");
    if (idAccount) {
      getListCartFromData(idAccount);
    }
  }, []);

  const getListCartFromData = async (idAccount) => {
    try {
      const res = await productService.getListCartFromData(idAccount);
      console.log(res);
      setCart(res);
    } catch (error) {
      console.log(error);
    }
  };

  //tong tam tinh
  const [sum, setSum] = useState(0);
  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      setCart(cart);
      const totalCount = cart.reduce(
        (total, item) => total + item.cosmeticsSize.price * item.quantity,
        0
      );
      setSum(totalCount);
    }
  }, [cart]);

  //tong giam gia
  const [discount, setDiscount] = useState(0);

  const handelIncre = (item) => {
    const index = cart.findIndex((obj) => obj.id === item.id);
    const product = cart.find((obj) => obj.id === item.id);
    if (index !== -1) {
      const data = [...cart];
      //kiểm tra điều kiện quá số lượng
      if (data[index].quantity < product.cosmeticsSize.quantity) {
        data[index].quantity += 1;
        setCart(data);
      }
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handelDecre = (item) => {
    const index = cart.findIndex((obj) => obj.id === item.id);
    if (index !== -1) {
      const data = [...cart];
      //kieerm tra điều kiện số lượng 0
      if (data[index].quantity > 1) {
        data[index].quantity -= 1;
      }
      setCart(data);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  //nhập số lượng
  //   const handleQuantityChange = (event) => {
  //     const newCount = parseInt(event.target.value);
  //     const product = cart.find((obj) => obj.id === event.id);
  //     if (!isNaN(newCount) && newCount >= 1 && newCount < product.cosmeticsSize.quantity) {
  //       setCart([...cart, { ...event, quantity: newCount }]);

  //     // }
  //   }else{
  //     //thông báo nhập quá số lượng sản phẩm
  //   }
  // };
  const handleDel = (item) => {
    const newCart = cart.filter((value) => value !== item);
    setCart(newCart);
  };
  const handleConfirm = (cart) => {
    console.log(cart);
  };

  useEffect(() => {
    if(cart){
      localStorage.setItem("cart", JSON.stringify(cart));

    }
    // const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    // setCartItemCount(totalCount);
  }, [cart]);

  const formattedPrice = (price) => {
    // Định dạng giá tiền thành VNĐ
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VNĐ");
  };

  return (
    <>
      <Header />
      <div className="container py-2">
        <div className="d-flex">
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {cart && Array.isArray(cart) ? (
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <button className="btn" onClick={() => handleDel(item)}>
                          X
                        </button>
                      </td>
                      <td scope="row">
                        <img
                          src={item.cosmeticsSize.imageList}
                          height="50px"
                        ></img>
                        {item.cosmeticsSize.product.name} -{" "}
                        {item.cosmeticsSize.size.name}
                      </td>
                      <td>{formattedPrice(item.cosmeticsSize.price)}</td>
                      <td className="d-flex">
                        <button
                          className="btn btn-custom"
                          onClick={() => handelDecre(item)}
                        >
                          -
                        </button>
                        {item.quantity}

                        {/* <input
                        type="number"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        style={{ width: "40px" }}
                        min="1"
                      ></input> */}

                        <button
                          className="btn btn-custom"
                          onClick={() => handelIncre(item)}
                        >
                          +
                        </button>
                      </td>

                      <td>
                        {formattedPrice(
                          item.cosmeticsSize.price * item.quantity
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                  <tr>
                    
                    <td>Chưa có gì trong giỏ hàng</td>
                  </tr>
                  <tr>
                    
                    <td><Link to={"/list"}>Tiếp tục mua hàng</Link></td>
                  </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-1"></div>
          <div className="col-3">
            <hr></hr>

            <h4>Hóa đơn của bạn</h4>
            <hr></hr>
            <div>
              <div className="row">
                <div className="col-6">Tạm tính</div>
                <div className="col-6">{formattedPrice(sum)}</div>
              </div>
              <div className="row">
                <div className="col-6">Giảm giá</div>
                <div className="col-6">{formattedPrice(discount)}</div>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-6">Tổng cộng</div>
              {/* <div className="col-6">{formattedPrice(sum - discount)}</div> */}
            </div>
            <br></br>
            <div className="row">
              <Link to={"/checkout"}>
                <button className="btn btn-custom">Tiến hành thanh toán</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
