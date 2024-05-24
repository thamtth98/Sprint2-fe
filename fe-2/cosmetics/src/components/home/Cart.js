import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import * as productService from "../../service/productService";
import * as cartService from "../../service/cartService";
import { delToCart } from "../../service/cartService";

function Cart() {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

 

  const [cart, setCart] = useState();

  useEffect(() => {
    const res = localStorage.getItem("cart");
    if (res) {
      setCart(JSON.parse(res));
    }
  }, []);

  // useEffect(() => {
  //   setCart(cart);
  // },[]);

  const [idAccount, setIdAccount] = useState();
  //nếu đã đăng nhập
  useEffect(() => {
    const idAccount = localStorage.getItem("id");
    setIdAccount(idAccount);
    const token = localStorage.getItem("token");
    if (idAccount && token) {
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

  const handleDel = async (item) => {
    const idAccount = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const delToCart = async (id) => {
      try {
        const res = await cartService.delToCart(id);
        getListCartFromData(idAccount);
      } catch (error) {
        console.log(error);
      }
    };

    if (idAccount && token) {
      console.log(item);
      await delToCart(item.cosmeticsSize.id);
      const updatedCart = cart.filter(
        (value) => value.id !== item.cosmeticsSize.id
      );
      setCart(updatedCart);
    } else {
      const newCart = cart.filter((value) => value !== item);
      setCart(newCart);
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

  const handelIncre = async (item) => {
    console.log(item);
    const index = cart.findIndex((obj) => obj.id === item.id);
    const product = cart.find((obj) => obj.id === item.id);

    if(idAccount){
      try {
        if (index !== -1) {
          const data = [...cart];
          //kiểm tra điều kiện quá số lượng
          if (data[index].quantity < product.cosmeticsSize.quantity) {
            data[index].quantity += 1;
            setCart(data);
            await productService.saveQuantity(item.cosmeticsSize.id,data[index].quantity)
            console.log(item.cosmeticsSize.id,data[index].quantity);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }else{
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
    }
    
  };
  

  const handelDecre = async (item) => {
    const index = cart.findIndex((obj) => obj.id === item.id);

    if(idAccount){
      if (index !== -1) {
        const data = [...cart];
        //kieerm tra điều kiện số lượng 0
        if (data[index].quantity > 1) {
          data[index].quantity -= 1;
        }
        setCart(data);
        await productService.saveQuantity(item.cosmeticsSize.id,data[index].quantity);
        console.log(item.cosmeticsSize.id,data[index].quantity);

      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    }else{
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

  const handleConfirm = (cart) => {
    console.log(cart);
  };

  useEffect(() => {
    if (cart) {
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
                      <td>
                        <Link to={"/list"}>Tiếp tục mua hàng</Link>
                      </td>
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
              <div className="col-6">{formattedPrice(sum - discount)}</div>
            </div>
            <br></br>
            <div className="row">
              {idAccount ? (
                <Link to={"/checkout"}>
                  <button className="btn btn-custom">
                    Tiến hành thanh toán
                  </button>
                </Link>
              ) : (
                <Link to={"/auth/login"}>
                  <button className="btn btn-custom">
                    Tiến hành thanh toán
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
