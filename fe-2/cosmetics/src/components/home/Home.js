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
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  useEffect(() => {
    getAllProduct(pageProduct);
  }, []);
  

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

  const formattedPrice = (price) => {
    // Định dạng giá tiền thành VNĐ
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VNĐ");
  };
  

  return (
    <>
      <div>
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
          <div className="container ">
            <div className="row my-5">
              <div className="col text-center">
                <a href="#" className="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_1.jpg?1638681267234"></img>
                </a>
              </div>
              <div className="col text-center">
                <a href="#" className="categories-item">
                  <img
                    src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_2.jpg?1638681267234"
                    alt=""
                  />
                </a>
              </div>
              <div className="col text-center">
                <a href="#" className="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_3.jpg?1638681267234" />
                </a>
              </div>
              <div className="col text-center">
                <a href="#" className="categories-item">
                  <img src="https://bizweb.dktcdn.net/100/433/383/themes/829831/assets/brand_4.jpg?1638681267234" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <Container>
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
                            <img
                              src={item.cosmeticsSize.imageList}
                              alt={`hi`}
                              style={{ width: "100%", height: "auto" }}
                            />                         
                      
                      </div>
                      <Card.Body>
                      <Card.Title>
                      
                          {item.product.name}</Card.Title>
                        <div className="d-flex justify-content-between">
                          <Card.Text>{item.size.name}</Card.Text>
                          <Card.Text>
                          {formattedPrice(item.cosmeticsSize.price)}
                          
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
              pageProduct.content.map((item,index) => (
                <Col md={3} className="p-0" key={index}>
                  <Link to={`product/${item.id}`}>
                    <Card className="my-card">
                    <div className="img-container">                          
                            <img
                              src={item.cosmeticsSize.imageList}
                              alt={`hi`}
                              style={{ width: "100%", height: "auto" }}
                            />                         
                      
                      </div>
                      <Card.Body>
                        <Card.Title>{item.product.name}</Card.Title>
                        <div className="d-flex justify-content-between">
                          <Card.Text>{item.size.name}</Card.Text>
                          <Card.Text>
                            {formattedPrice(item.cosmeticsSize.price)}
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

        <section id="banner-2" className="my-3" style={{ background: `#F9F3EC` }}>
          <div className="container">
            <div className="row flex-row-reverse banner-content align-items-center">
              <div className="img-wrapper col-12 col-md-6">
                <img
                  src="https://bizweb.dktcdn.net/100/433/383/files/4-1-jpeg.jpg?v=1630077656819 "
                  className="img-fluid"
                />
              </div>
              <div className="content-wrapper col-12 offset-md-1 col-md-5 p-5">
                <div className="secondary-font text-primary text-uppercase mb-3 fs-4">
                  BEAUTY TIPS/REVIEW
                </div>
                <h5 className="banner-title display-1 fw-normal">
                  Hướng dẫn cách nhận biết và chăm sóc cho từng loại da
                </h5>
                <a
                  href="#"
                  className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                >
                  shop now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="register">
          <div className="container ">
            <div className="row py-5">
              <div className="offset-md-3 col-md-6 my-5 ">
                <h2 className="display-3 fw-normal text-center">
                  Liên hệ <span className="text-primary">với chúng tôi</span>
                </h2>
                <form>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="Email của bạn"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="email"
                      id="password1"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="email"
                      id="password2"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-custom btn-lg rounded-1"
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
        <section id="latest-blog" className="my-5">
          <div className="container py-5 my-5">
            <div className="row mt-5">
              <div className="section-header d-md-flex justify-content-between align-items-center mb-3">
                <h2 className="display-3 fw-normal">Latest Blog Post</h2>
                <div>
                  <a
                    href="#"
                    className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                  >
                    Read all
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 my-4 my-md-0">
                <div className="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 className="secondary-font text-primary m-0">20</h3>
                  <p className="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div className="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog1.jpg"
                      className="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div className="card-body p-0">
                    <a href="single-post.html">
                      <h3 className="card-title pt-4 pb-3 m-0">
                        10 Reasons to be helpful towards any animals
                      </h3>
                    </a>

                    <div className="card-text">
                      <p className="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" className="blog-read">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-4 my-md-0">
                <div className="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 className="secondary-font text-primary m-0">21</h3>
                  <p className="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div className="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog2.jpg"
                      className="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div className="card-body p-0">
                    <a href="single-post.html">
                      <h3 className="card-title pt-4 pb-3 m-0">
                        How to know your pet is hungry
                      </h3>
                    </a>

                    <div className="card-text">
                      <p className="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" className="blog-read">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-4 my-md-0">
                <div className="z-1 position-absolute rounded-3 m-2 px-3 pt-1 bg-light">
                  <h3 className="secondary-font text-primary m-0">22</h3>
                  <p className="secondary-font fs-6 m-0">Feb</p>
                </div>
                <div className="card position-relative">
                  <a href="single-post.html">
                    <img
                      src="images/blog3.jpg"
                      className="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div className="card-body p-0">
                    <a href="single-post.html">
                      <h3 className="card-title pt-4 pb-3 m-0">
                        Best home for your pets
                      </h3>
                    </a>

                    <div className="card-text">
                      <p className="blog-paragraph fs-6">
                        At the core of our practice is the idea that cities are
                        the incubators of our greatest achievements, and the
                        best hope for a sustainable future.
                      </p>
                      <a href="single-post.html" className="blog-read">
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
          <div className="container py-5 my-5">
            <div className="row g-md-5 pt-4">
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon
                      className="service-icon text-primary"
                      icon="la:shopping-cart"
                    ></iconify-icon>
                  </div>
                  <h3 className="card-title py-2 m-0">Free Delivery</h3>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon
                      className="service-icon text-primary"
                      icon="la:user-check"
                    ></iconify-icon>
                  </div>
                  <h3 className="card-title py-2 m-0">100% secure payment</h3>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon
                      className="service-icon text-primary"
                      icon="la:tag"
                    ></iconify-icon>
                  </div>
                  <h3 className="card-title py-2 m-0">Daily Offer</h3>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon
                      className="service-icon text-primary"
                      icon="la:award"
                    ></iconify-icon>
                  </div>
                  <h3 className="card-title py-2 m-0">Quality guarantee</h3>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">
                      Lorem ipsum dolor sit amet, consectetur adipi elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section id="insta" className="my-5">
          <div className="row g-0 py-5">
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta1.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
                />
              </a>
            </div>
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta2.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
                />
              </a>
            </div>
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta3.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
                />
              </a>
            </div>
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta4.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
                />
              </a>
            </div>
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta5.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
                />
              </a>
            </div>
            <div className="col instagram-item  text-center position-relative">
              <div className="icon-overlay d-flex justify-content-center position-absolute">
                <iconify-icon
                  className="text-white"
                  icon="la:instagram"
                ></iconify-icon>
              </div>
              <a href="#">
                <img
                  src="images/insta6.jpg"
                  alt="insta-img"
                  className="img-fluid rounded-3"
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
