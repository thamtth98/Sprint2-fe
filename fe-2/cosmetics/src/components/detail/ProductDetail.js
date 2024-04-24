import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productService from "../../service/productService";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { Carousel, Card, Button, Col } from "react-bootstrap";
import { storage } from "../../config/fireBaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import "../../css/product.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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

  //lấy product theo id
  useEffect(() => {
    getProductAddToCart();
  }, [id]);

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

  //lấy product cùng loại
  const [productSameType, setProductSameType] = useState([]);
  useEffect(() => {
    getProductSameType();
  }, []);

  const getProductSameType = async () => {
    const res = await productService.getProductSameType(id);
    console.log(res);
    setProductSameType(res);
  };

  //firebase
  const [productImages, setProductImages] = useState([]);
  const imageListRef = ref(storage, `images/${id}`);

  // const navigate = useNavigate();
  // function extractIdFromLocation(location) {
  //   if (location && location.pathname) {
  //     const path = location.pathname;
  //     const parts = path.split('/');
  //     return parts[parts.length - 1];
  //   }
  // }

  // useEffect(() => {
  //   const id = extractIdFromLocation(navigate); // Hàm để lấy id từ đường dẫn (ví dụ: "/product/2" -> id = 2)
  //   const imageListRef = ref(storage, `images/${id}`);

  //   listAll(imageListRef).then((res) => {
  //     const urls = [];
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         urls.push(url);
  //       });
  //     });
  //     setProductImages(urls);
  //   });
  // }, [navigate]);
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      console.log(res);
      res.items.forEach((item) => {
        console.log(item);
        getDownloadURL(item).then((url) => {
          setProductImages((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  //detail image
  const [imgIndex, setImgIndex] = useState(0);

  const handleSelectImage = (selectedIndex) => {
    setImgIndex(selectedIndex);
  };
  //title sp tương tự
  function handleMouseOver(color, size) {
    const textContainer = document.getElementById("name-same-type");
    textContainer.innerHTML = `Màu: ${color}-Size: ${size}`;
  }

  return (
    <>
      <Header></Header>
      <div className="container py-2">
        <div>
          <h2>Chi tiết sản phẩm</h2>
          <div className="d-flex">
            {product && (
              <>
                <div className="col-lg-9">
                  <div className="d-flex">
                    <div className="col-lg-7 col-md-12">
                      <section id="banner">
                        <div className="container" id="detail-product">
                          <Carousel
                            interval={null}
                            indicators={false}
                            activeIndex={imgIndex}
                            onSelect={handleSelectImage}
                          >
                            {productImages.map((imagePath, i) => (
                              <Carousel.Item key={i}>
                                <img
                                  className="d-block w-100"
                                  src={imagePath}
                                  alt="product"
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                          <ol className="d-flex p-0">
                            {productImages.map((imagePath, i) => (
                              <li
                                style={{ listStyleType: "none" }}
                                key={i}
                                onClick={() => handleSelectImage(i)}
                                className={i === imgIndex ? "active" : ""}
                              >
                                <img
                                  className="mx-3 shadow rounded-1"
                                  src={imagePath}
                                  style={{ width: "100px", height: "100px" }}
                                  alt="product"
                                />
                              </li>
                            ))}
                          </ol>

                          {/* <Carousel>
                        {productImages.map((image, index) => (
                          <Carousel.Item>
                            <img
                              src={image}
                              alt={`Product ${id} Image ${index + 1}`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel> */}
                        </div>
                      </section>
                    </div>
                    <div className="col-lg-5 col-md-12">
                      <h4>{product.product.name}</h4>
                      <div>{product.product.description}</div>
                      {/* <h3 style={{ color: "red" }}>
                    {formattedPrice(product.product.price)}
                  </h3> */}
                      <div>
                        {productSameType && productSameType.length > 1 && (
                          <>
                            <h6>Sản phẩm cùng loại:</h6>
                            <div id="name-same-type">
                              Các sản phẩm cùng loại
                            </div>
                          </>
                        )}

                        <div className="d-flex">
                          {productSameType &&
                            productSameType.length > 1 &&
                            productSameType.map((item, index) => (
                              <>
                                <Col
                                  key={index}
                                  md={3}
                                  className="p-0"
                                  title={`Màu: ${item.product.color.name}-Size: ${item.size.name}`}
                                  onMouseOver={() =>
                                    handleMouseOver(
                                      item.product.color.name,
                                      item.size.name
                                    )
                                  }
                                >
                                  <a href={`/product/${item.id}`}>
                                    <Card className="my-card">
                                      <div className="img-container">
                                        <Card.Img
                                          variant="top"
                                          src={item.cosmeticsSize.imageList}
                                        />
                                      </div>
                                    </Card>
                                  </a>
                                </Col>
                              </>
                            ))}
                        </div>
                      </div>
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
                  </div>
                  <br></br>
                  {/* giới thiệu sản phẩm */}
                  <div className="">
                    <Tabs
                      defaultActiveKey="profile"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="home" title="Giới thiệu">
                        <h3>Giới thiệu sản phẩm:</h3>

                        <div>{product.product.description}</div>
                        <div className="text-center">
                          <img src={productImages[0]} width="60%"></img>
                          <div>
                            <h3>Thông số sản phẩm</h3>
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <td scope="col" className="col-4">Thương hiệu</td>
                                  <td scope="col" className="col-8">{product.product.producer.name}</td>                                 
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td scope="col" className="col-4">Xuất xứ</td>
                                  <td scope="col" className="col-8">{product.product.producer.origin}</td>                              
                                 
                                </tr>                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="profile" title="Thành phần">
                        <h3>Thành phần sản phẩm</h3>
                        <div>{product.product.ingredient}</div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="col-lg-3 d-none d-md-block">
                  <h4>Có thể bạn quan tâm</h4>
                </div>
              </>
            )}
          </div>
          <p>Total Items: {cartItemCount}</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default ProductDetail;
