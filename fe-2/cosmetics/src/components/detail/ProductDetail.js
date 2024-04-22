import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as productService from "../../service/productService";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { Carousel, Card, Button } from "react-bootstrap";
import { storage } from "../../config/fireBaseConfig";
import { ref, uploadBytes, listAll,getDownloadURL } from "firebase/storage";

function ProductDetail() {
  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
  }, []);
  //tìm theo id
  const { id } = useParams();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const totalCount = parsedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartItemCount(totalCount);
    }
  }, [cartItemCount]);

  const addToCart = (product) => {
    console.log(product);
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const data = [...cart];
      data[index].quantity += count;
      console.log(count);
      setCart(data);
    } else {
      setCart([...cart, { ...product, quantity: count }]);
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalCount);
  }, [cart]);

  const [product, setProduct] = useState();

  useEffect(() => {
    getProductAddToCart();
  }, []);

  const getProductAddToCart = async () => {
    const res = await productService.getProductAddToCart(id);
    console.log(res);
    setProduct(res);
  };

  let [count, setCount] = useState(1);
  const increCount = () => {
    setCount(count + 1);
  };
  const decreaseQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleQuantityChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount) && newCount >= 1) {
      setCount(newCount);
    }
  };
  //format tiền
  const formattedPrice = (price) => {
    // Định dạng giá tiền thành VNĐ
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VNĐ");
  };

  //firebase
  const [productImages, setProductImages] = useState([]);
  const imageListRef = ref(storage, `images/${id}`);

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setProductImages((prev)=>[...prev,url]);
        })
      })
    });
  },[]);

  return (
    <>
      <Header></Header>
      <div className="container py-2">
        <div>
          <h2>Chi tiết sản phẩm</h2>
          <div className="d-flex">
            {product && (
              <>
                <div className="col-4">
                  <section id="banner">
                    <div className="container">
                      <Carousel>
                        {productImages.map((image, index) => (
                          <Carousel.Item>
                            <img
                              src={image}
                              alt={`Product ${id} Image ${index + 1}`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </section>
                </div>
                <div className="col-5 ms-3">
                  <h4>{product.product.name}</h4>
                  <div>{product.product.description}</div>
                  {/* <h3 style={{ color: "red" }}>
                    {formattedPrice(product.product.price)}
                  </h3> */}
                  <span className="me-3">Số lượng: </span>
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={count}
                    onChange={handleQuantityChange}
                    style={{ width: "40px" }}
                    min="1"
                  ></input>
                  {/* <span style={{ margin: "0 10px" }}>1</span> */}
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                    onClick={increCount}
                  >
                    +
                  </button>

                  <div className="mt-3">
                    <button
                      className="btn btn-custom"
                      onClick={() => addToCart(product)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                <div className="col-3">quảng cáo</div>
              </>
            )}
          </div>
          <p>Total Items: {cartItemCount}</p>
          <ul>
            {/* {cart.map((item, index) => (
            <li key={index}>{item.name} - Quantity: {item.quantity}</li>
          ))} */}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default ProductDetail;
