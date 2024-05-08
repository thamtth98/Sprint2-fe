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
import { toast } from "react-toastify";


function ProductDetail({flag}) {
  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
  }, []);
  //tìm theo id
  const { id } = useParams();

  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cart");
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
  }, [flag]);

  const getListCartFromData = async (idAccount) => {
    try {
      const res = await productService.getListCartFromData(idAccount);
      setCart(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
    }
    if (!savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      if (Array.isArray(parsedCart)) {
        const totalCount = parsedCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartItemCount(totalCount);
      }
    }
  }, [cartItemCount]);


  useEffect(() => {
    if (Array.isArray(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
      
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalCount);
    } else {
      // localStorage.setItem("cart", JSON.stringify(cart));
      setCartItemCount(0);
    }
  }, [cart]);

  const [product, setProduct] = useState();

  //lấy product theo id

  const [isProductLoaded, setIsProductLoaded] = useState(false);
  useEffect(() => {
    getProductAddToCart();
  }, []);

  const getProductAddToCart = async () => {
    const res = await productService.getProductAddToCart(id);
    setProduct(res);
  };

  let [count, setCount] = useState(1);
  const increCount = () => {
    //kiểm tra điều kiện số lượng sản phẩm
    if (count <= product.cosmeticsSize.quantity) {
      setCount(count + 1);
    }
  };

  //trường hợp chưa đnăg nhập thì thêm vào cart bằng cách
  const addToCart = (product) => {    
    const idAccount = localStorage.getItem("id");
    if(idAccount == null){
      if (Array.isArray(cart)) {
        const index = cart.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          const data = [...cart];
          if( count >= product.cosmeticsSize.quantity - data[index].quantity){
            data[index].quantity += count;
            setCart(data);
            toast.success("Thêm vào giỏ hàng thành công!!", {
              className: "custom-toast-success",
            });
          }
          
        } else {
          setCart([...cart, { ...product, quantity: count }]);
          toast.success("Thêm vào giỏ hàng thành công!!", {
            className: "custom-toast-success",
          });
        }
      } else {
        setCart([{ ...product, quantity: count }]);
        toast.success("Thêm vào giỏ hàng thành công!!", {
          className: "custom-toast-success",
        });

      }
    }  else{
      setIsProductLoaded(true);

    }
  };
  //trường hợp đã đăng nhập
  const [productListDto, setProducListDto] = useState();

  useEffect(() => {    
    const idAccount = localStorage.getItem("id");
    
    if (product &&idAccount && isProductLoaded) {
      const newListDto = {
        id: null,
        total: product.cosmeticsSize.price,
        idAccount: idAccount,
        idBill: null,
        quantity: count,
        idCosmeticsSize: product.cosmeticsSize.id,
      }
      const arr = [];
      arr.push(newListDto)
      setProducListDto(arr);
      setIsProductLoaded(true);
    }
    }
  , [product,isProductLoaded]);

  useEffect(() => {    
    saveListCart(productListDto);
  }, [productListDto,flag]);

  //prop

  //lấy listcart
  const [newCart,setNewCart] = useState();
  const saveListCart = async (productListDto) => {
    try {
      const res = await productService.saveListCart(productListDto);
      // localStorage.removeItem("cart");
      setNewCart(res);
      if(res.status === 200){
        toast.success("Thêm vào giỏ hàng thành công!!", {
          className: "custom-toast-success",
        });
      }
    
    } catch (e) {
      console.log(e);
    }
  };


  const decreaseQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleQuantityChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (
      !isNaN(newCount) &&
      newCount >= 1 &&
      newCount < product.cosmeticsSize.quantity
    ) {
      setCount(newCount);
      // }
    } else {
      //thông báo nhập quá số lượng sản phẩm
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
    setProductSameType(res);
  };

  //firebase
  const [productImages, setProductImages] = useState([]);
  const imageListRef = ref(storage, `images/${id}`);

  useEffect(() => {
    listAll(imageListRef).then((res) => {

      res.items.forEach((item) => {
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
                  <div className="d-flex custom-detail">
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
                        </div>
                      </section>
                    </div>
                    <div className="col-lg-5 col-md-12">
                      <h4>{product.product.name}</h4>
                      <div>{product.product.description}</div>
                      <br></br>
                      <div className="d-flex">
                        <h6>Giá: </h6>
                        <h6 style={{ color: "red" }}> 
                          {formattedPrice(product.cosmeticsSize.price)}
                        </h6>
                      </div>
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
                                  <Link to={`/product/${item.id}`}>
                                    <Card className="my-card">
                                      <div className="img-container">
                                        <Card.Img
                                          variant="top"
                                          src={item.cosmeticsSize.imageList}
                                        />
                                      </div>
                                    </Card>
                                  </Link>
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
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <td scope="col" className="col-4">
                                    Thương hiệu
                                  </td>
                                  <td scope="col" className="col-8">
                                    {product.product.producer.name}
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td scope="col" className="col-4">
                                    Xuất xứ
                                  </td>
                                  <td scope="col" className="col-8">
                                    {product.product.producer.origin}
                                  </td>
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
