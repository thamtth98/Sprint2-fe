import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import Header from "./Header";
import React, { useState } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import * as productService from "../../service/productService";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../../css/home.css";
import { storage } from "../../config/fireBaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function Home() {
  const initPage = {
    page: 0,
    size: 4,
    nameSearch: "",
    idProducer: -1,
    idType: -1,
    idSize: -1,
  };
  const [pageProduct, setPageProduct] = useState(initPage);
  const [imageLinks, setImageLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    getAllProduct(pageProduct);
  }, []);
  useEffect(() => {
    // Lấy danh sách sản phẩm từ trang Home (giả sử pageProduct chứa thông tin sản phẩm)
    // ...

    // Duyệt qua danh sách sản phẩm
    if (pageProduct.content) {
      (pageProduct.content).map((item) => {
        const productId = item.id;
        console.log(item);
        console.log(productId);
        const imageListRef = ref(storage, `images/${productId}`);
        console.log(imageListRef);
        // Lấy danh sách URL hình ảnh từ Firebase
        listAll(imageListRef).then((res) => {
          res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              // Thêm URL hình ảnh vào biến productImages
              setProductImages((prev) => [...prev, url]);
            });
          });
        });
      });
    }
  }, [pageProduct]);
  const firstImage = productImages[0];

  const getAllProduct = async (pageProduct) => {
    try {
      const res = await productService.getAll(pageProduct);
      setPageProduct(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePage = async (page) => {
    const data = { ...pageProduct, page: page.selected };
    setPageProduct(data);
    getAllProduct(data);
  };
  // firebase

  return (
    <>
      <div>
        <Header />
        <section id="banner" style={{ background: ` #ffeaf0` }}>
          <div className="container">
            <Carousel interval={5000} controls={false}>
              <Carousel.Item>
                <div className="row banner-content align-items-center">
                  <div className="img-wrapper col-md-7">
                    <img
                      src="https://media.hcdn.vn/hsk/1712733295homell.jpg"
                      alt="Banner 1"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content-wrapper col-md-5 p-5 mb-5">
                    <div className="secondary-font text-primary text-uppercase mb-4">
                      Sản phẩm mới
                    </div>
                    <h2 className="banner-title display-3 fw-normal">
                      Son Bóng Maybelline{" "}
                      <span className="text-primary">145 Rogue</span>
                    </h2>
                    <a
                      href="#"
                      className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                    >
                      shop now
                    </a>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row banner-content align-items-center">
                  <div className="img-wrapper col-md-7">
                    <img
                      src="https://media.hcdn.vn/hsk/1712656565homeb1g1.jpg"
                      alt="Banner 2"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content-wrapper col-md-5 p-5 mb-5">
                    <div className="secondary-font text-primary text-uppercase mb-4">
                      Sản phẩm mới
                    </div>
                    <h2 className="banner-title display-3 fw-normal">
                      Son Lì 3CE Mịn Môi hihihi{" "}
                      <span className="text-primary">Hipamine</span>
                    </h2>
                    <a
                      href="#"
                      className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                    >
                      shop now
                    </a>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row banner-content align-items-center">
                  <div className="img-wrapper col-md-7">
                    <img
                      src="https://media.hcdn.vn/hsk/1712571978homhh.jpg"
                      alt="Banner 3"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content-wrapper col-md-5 p-5 mb-5">
                    <div className="secondary-font text-primary text-uppercase mb-4">
                      Sản phẩm mới
                    </div>
                    <h2 className="banner-title display-3 fw-normal">
                      Son Tint Espoir Bóng Lì{" "}
                      <span className="text-primary">7 Vampy</span>
                    </h2>
                    <a
                      href="#"
                      className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                    >
                      shop now
                    </a>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>

        <section id="categories">
          <div class="container ">
            <div class="row my-5">
              <div class="col text-center">
                <a href="#" class="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_1.jpg?1638681267234"></img>
                </a>
              </div>
              <div class="col text-center">
                <a href="#" class="categories-item">
                  <img
                    src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_2.jpg?1638681267234"
                    alt=""
                  />
                </a>
              </div>
              <div class="col text-center">
                <a href="#" class="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_3.jpg?1638681267234" />
                </a>
              </div>
              <div class="col text-center">
                <a href="#" class="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_4.jpg?1638681267234" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <Container>
          {/* <h4>Bán chạy</h4> */}
          <Row>
            <img
              src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/section_hot_banner.png?1638681267234"
              className="mb-4"
            ></img>

            {pageProduct && pageProduct.content ? (
              pageProduct.content.map((item) => (
                <Col md={3} className="p-0" key={item.id}>
                  <Link to={`product/${item.id}`}>
                    <Card className="my-card">
                      <div className="img-container">
                      {console.log(productImages)}
                          
                            <img
                              src={firstImage}
                              alt={`hi`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          
                      
                      </div>
                      <Card.Body>
                        <Card.Title>{item.product.name}</Card.Title>
                        <div className="d-flex justify-content-between">
                          <Card.Text>{item.size.name}</Card.Text>
                          <Card.Text>
                            <b>{item.product.price} VNĐ</b>
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <div>Không có</div>
            )}

            {/* Repeat for other cards */}
          </Row>
        </Container>

        <Container>
          {/* <h4>Bán chạy</h4> */}
          <Row>
            <img
              src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/section_hot_banner.png?1638681267234"
              className="mb-4"
            ></img>

            {pageProduct && pageProduct.content ? (
              pageProduct.content.map((item) => (
                <Col md={3} className="p-0">
                  <Link to={`product/${item.id}`}>
                    <Card className="my-card">
                      <div className="img-container">
                        {/* <Card.Img
                          variant="top"
                          src={item.cosmeticsSize.imageList.split(",")[0]}
                        /> */}
                      </div>
                      <Card.Body>
                        <Card.Title>{item.product.name}</Card.Title>
                        <div className="d-flex justify-content-between">
                          <Card.Text>{item.size.name}</Card.Text>
                          <Card.Text>
                            <b>{item.product.price} VNĐ</b>
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <div>Không có</div>
            )}

            {/* Repeat for other cards */}
          </Row>
        </Container>

        <section id="banner-2" class="my-3" style={{ background: `#F9F3EC` }}>
          <div class="container">
            <div class="row flex-row-reverse banner-content align-items-center">
              <div class="img-wrapper col-12 col-md-6">
                <img
                  src="https://bizweb.dktcdn.net/100/433/383/files/4-1-jpeg.jpg?v=1630077656819 "
                  class="img-fluid"
                />
              </div>
              <div class="content-wrapper col-12 offset-md-1 col-md-5 p-5">
                <div class="secondary-font text-primary text-uppercase mb-3 fs-4">
                  BEAUTY TIPS/REVIEW
                </div>
                <h5 class="banner-title display-1 fw-normal">
                  Hướng dẫn cách nhận biết và chăm sóc cho từng loại da
                </h5>
                <a
                  href="#"
                  class="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                >
                  shop now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="register">
          <div class="container ">
            <div class="row py-5">
              <div class="offset-md-3 col-md-6 my-5 ">
                <h2 class="display-3 fw-normal text-center">
                  Liên hệ <span class="text-primary">với chúng tôi</span>
                </h2>
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="Email của bạn"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      name="email"
                      id="password1"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      name="email"
                      id="password2"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div class="d-grid gap-2">
                    <button
                      type="submit"
                      class="btn btn-custom btn-lg rounded-1"
                    >
                      Gửi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* 
        <section id="latest-blog" class="my-5">
          <div class="container py-5 my-5">
            <div class="row mt-5">
              <div class="section-header d-md-flex justify-content-between align-items-center mb-3">
                <h2 class="display-3 fw-normal">Latest Blog Post</h2>
                <div>
                  <a
                    href="#"
                    class="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                  >
                    Read all
                  </a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 my-4 my-md-0">
                <div class="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 class="secondary-font text-primary m-0">20</h3>
                  <p class="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div class="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog1.jpg"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-post.html">
                      <h3 class="card-title pt-4 pb-3 m-0">
                        10 Reasons to be helpful towards any animals
                      </h3>
                    </a>

                    <div class="card-text">
                      <p class="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" class="blog-read">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 my-4 my-md-0">
                <div class="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 class="secondary-font text-primary m-0">21</h3>
                  <p class="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div class="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog2.jpg"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-post.html">
                      <h3 class="card-title pt-4 pb-3 m-0">
                        How to know your pet is hungry
                      </h3>
                    </a>

                    <div class="card-text">
                      <p class="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" class="blog-read">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 my-4 my-md-0">
                <div class="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 class="secondary-font text-primary m-0">22</h3>
                  <p class="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div class="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog3.jpg"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-post.html">
                      <h3 class="card-title pt-4 pb-3 m-0">
                        Best home for your pets
                      </h3>
                    </a>

                    <div class="card-text">
                      <p class="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" class="blog-read">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="service">
          <div class="container py-5 my-5">
            <div class="row g-md-5 pt-4">
              <div class="col-md-3 my-3">
                <div class="card">
                  <div>
                    <iconify-icon
                      class="service-icon text-primary"
                      icon="la:shopping-cart"
                    ></iconify-icon>
                  </div>
                  <h3 class="card-title py-2 m-0">Free Delivery</h3>
                  <div class="card-text">
                    <p class="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 my-3">
                <div class="card">
                  <div>
                    <iconify-icon
                      class="service-icon text-primary"
                      icon="la:user-check"
                    ></iconify-icon>
                  </div>
                  <h3 class="card-title py-2 m-0">100% secure payment</h3>
                  <div class="card-text">
                    <p class="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 my-3">
                <div class="card">
                  <div>
                    <iconify-icon
                      class="service-icon text-primary"
                      icon="la:tag"
                    ></iconify-icon>
                  </div>
                  <h3 class="card-title py-2 m-0">Daily Offer</h3>
                  <div class="card-text">
                    <p class="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 my-3">
                <div class="card">
                  <div>
                    <iconify-icon
                      class="service-icon text-primary"
                      icon="la:award"
                    ></iconify-icon>
                  </div>
                  <h3 class="card-title py-2 m-0">Quality guarantee</h3>
                  <div class="card-text">
                    <p class="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section id="insta" class="my-5">
          <div class="row g-0 py-5">
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta1.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta2.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta3.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta4.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta5.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
            <div class="col instagram-item  text-center position-relative">
              <div class="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  class="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta6.jpg"
                  alt="insta-img"
                  class="img-fluid rounded-3"
                />
              </a>
            </div>
          </div>
        </section> */}
        <Footer></Footer>
      </div>
    </>
  );
}
export default Home;
