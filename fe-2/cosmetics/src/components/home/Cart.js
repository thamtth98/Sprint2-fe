import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from 'react-router-dom';



function Cart() {

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);


  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  // useEffect(() => {
  //   setCart(cart);
  // },[]);

  
   

  //tong tam tinh
  const [sum, setSum] = useState(0);
  useEffect(() => {
    if (cart) {
      setCart(cart);
      const totalCount = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setSum(totalCount);
    }
  }, [cart]);

  //tong giam gia
  const [discount, setDiscount] = useState(0);

  const handelIncre = (item) => {
    const index = cart.findIndex((obj) => obj.id === item.id);

    if (index !== -1) {
      const data = [...cart];
      //kiểm tra điều kiện quá số lượng
      data[index].quantity += 1;
      setCart(data);
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
  const handleDel = (item) => {
    const newCart = cart.filter((value) => value !== item);
    setCart(newCart);
  };
  const handleConfirm = (cart) => {
    console.log(cart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    // setCartItemCount(totalCount);
  }, [cart]);

  const formattedPrice = (price) => {
    // Định dạng giá tiền thành VNĐ
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
  }

  return (
    <>
      <Header />
      <div className="container py-2">
        <div className="d-flex">
          <div className="col-8">
            <table class="table">
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
                {cart &&
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <button className="btn" onClick={() => handleDel(item)}>X</button>
                      </td>
                      <td scope="row">
                        <img
                          src={item.imageList.split(",")[0]}
                          height="50px"
                        ></img>
                        {item.product.name} - {item.size.name}
                      </td>
                      <td>{formattedPrice(item.product.price)}</td>
                      <td>
                        <button className="btn btn-custom" onClick={() => handelDecre(item)}>-</button>
                        {item.quantity}
                        <button className="btn btn-custom" onClick={() => handelIncre(item)}>+</button>
                      </td>

                      <td>{formattedPrice(item.product.price * item.quantity)}</td>
                    </tr>
                  ))}
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
              <div className="col-6">{formattedPrice(sum - discount)}</div>
            </div>
            <div className="row">
             <Link to={"/login"}>
             <button className="btn btn-custom">
                Tiến hành thanh toán
              </button>
              </Link> 
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}
export default Cart;
