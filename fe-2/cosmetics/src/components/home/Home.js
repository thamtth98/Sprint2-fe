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

  useEffect(() => {
    getAllProduct(pageProduct);
  }, []);

  const getAllProduct = async (pageProduct) => {
    try {
      const res = await productService.getAll(pageProduct);
      setPageProduct(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePage = async (page) => {
    const data = { ...pageProduct, page: page.selected };
    setPageProduct(data);
    getAllProduct(data);
  };

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
          <h4>Bán chạy</h4>

          <Row>
            {pageProduct && pageProduct.content ? (
              pageProduct.content.map((item) => (
                <Col md={3} className="p-0">
                <Link to={`product/${item.id}`}>
                  <Card className="my-card">
                    <div className="img-container">
                      <Card.Img
                        variant="top"
                        src={item.imageList.split(",")[0]}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{item.product.name}</Card.Title>
                      <div className="d-flex">
                      <Card.Text>{item.size.name}</Card.Text>
                      <button className="ms-5">Thêm vào giỏ hàng</button>
                      </div>
                      
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <div>Không có</div>
            )}

            <Col md={3} className="p-0">
              <Card className="my-card">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/150"
                  />
                </div>
                <Card.Body>
                  <Card.Title>Card 1</Card.Title>
                  <Card.Text>This is a sample card.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Repeat for other cards */}
          </Row>
        </Container>

        <section id="foodies" class="my-5">
          <div class="container my-5 py-5">
            <div class="section-header d-md-flex justify-content-between align-items-center">
              <h6 class="display-6 fw-normal">FLASH DEALS </h6>
              <div>
                <a
                  href="#"
                  class="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                >
                  shop now
                </a>
              </div>
            </div>

            <div class="isotope-container row">
              <div class="item cat col-md-4 col-lg-3 my-4">
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-chong-nang-la-roche-posay-kiem-soat-dau-spf50-50ml_DeWrge7eP5UFqk53_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h5 class="card-title pt-4 m-3">
                        Kem Chống Nắng La Roche-Posay Kiểm Soát Dầu SPF50+ 50ml
                      </h5>
                    </a>

                    <div class="card-text m-3">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <div class="secondary-font text-primary">$18.00</div>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <div class="text-uppercase m-0">Add to Cart</div>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item dog col-md-4 col-lg-3 my-4">
                <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  New
                </div>
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-nuoc-tay-trang-l-oreal-3-in-1-lam-sach-sau-400ml_aw7dugVaJRUXNrjG_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item dog col-md-4 col-lg-3 my-4">
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-ca-phe-dak-lak-tay-da-chet-toan-than-cocoon-200ml_j5U6ViwJSpA881oP_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item cat col-md-4 col-lg-3 my-4">
                <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  Sold
                </div>
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-ca-phe-dak-lak-lam-sach-da-chet-cho-mat-cocoon-150ml_TSrFFQgmNgBSkuKe_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="foodies" class="my-5">
          <div class="container my-5 py-5">
            <div class="section-header d-md-flex justify-content-between align-items-center">
              <h6 class="display-6 fw-normal">BÁN CHẠY</h6>
              <div class="mb-4 mb-md-0">
                <p class="m-0">
                  <button class="filter-button me-4  active" data-filter="*">
                    ALL
                  </button>
                  <button class="filter-button me-4 " data-filter=".cat">
                    CAT
                  </button>
                  <button class="filter-button me-4 " data-filter=".dog">
                    DOG
                  </button>
                  <button class="filter-button me-4 " data-filter=".bird">
                    BIRD
                  </button>
                </p>
              </div>
              <div>
                <a
                  href="#"
                  class="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                >
                  shop now
                </a>
              </div>
            </div>

            <div class="isotope-container row">
              <div class="item cat col-md-4 col-lg-3 my-4">
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-chong-nang-la-roche-posay-kiem-soat-dau-spf50-50ml_DeWrge7eP5UFqk53_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <div class="card-title pt-4 m-0">389.000</div>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <div class="secondary-font text-primary">$18.00</div>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <div class="text-uppercase m-0">Add to Cart</div>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item dog col-md-4 col-lg-3 my-4">
                <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  New
                </div>
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-nuoc-tay-trang-l-oreal-3-in-1-lam-sach-sau-400ml_aw7dugVaJRUXNrjG_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <div class="card-title pt-4 m-0">Grey hoodie</div>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <div class="text-uppercase m-0">Add to Cart</div>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item dog col-md-4 col-lg-3 my-4">
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-ca-phe-dak-lak-tay-da-chet-toan-than-cocoon-200ml_j5U6ViwJSpA881oP_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item cat col-md-4 col-lg-3 my-4">
                <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  Sold
                </div>
                <div class="card position-relative">
                  <a href="single-product.html">
                    <img
                      src="https://media.hcdn.vn/catalog/product/p/r/promotions-auto-ca-phe-dak-lak-lam-sach-da-chet-cho-mat-cocoon-150ml_TSrFFQgmNgBSkuKe_img_220x220_0dff4c_fit_center.png"
                      class="img-fluid rounded-4"
                      alt="image"
                    />
                  </a>
                  <div class="card-body p-0">
                    <a href="single-product.html">
                      <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                    </a>

                    <div class="card-text">
                      <span class="rating secondary-font">
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        <iconify-icon
                          icon="clarity:star-solid"
                          class="text-primary"
                        ></iconify-icon>
                        5.0
                      </span>

                      <h3 class="secondary-font text-primary">$18.00</h3>

                      <div class="d-flex flex-wrap mt-3">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon
                            icon="fluent:heart-28-filled"
                            class="fs-5"
                          ></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="banner-2" class="my-3" style={{ background: `#F9F3EC` }}>
          <div class="container">
            <div class="row flex-row-reverse banner-content align-items-center">
              <div class="img-wrapper col-12 col-md-6">
                <img
                  src="https://rafiaein.github.io/waGGy/images/banner-img2.png"
                  class="img-fluid"
                />
              </div>
              <div class="content-wrapper col-12 offset-md-1 col-md-5 p-5">
                <div class="secondary-font text-primary text-uppercase mb-3 fs-4">
                  Upto 40% off
                </div>
                <h2 class="banner-title display-1 fw-normal">
                  Clearance sale !!!
                </h2>
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

        <section id="testimonial">
          <div class="container my-5 py-5">
            <div class="row">
              <div class="offset-md-1 col-md-10">
                <div class="swiper testimonial-swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div class="row ">
                        <div class="col-2">
                          <iconify-icon
                            icon="ri:double-quotes-l"
                            class="quote-icon text-primary"
                          ></iconify-icon>
                        </div>
                        <div class="col-md-10 mt-md-5 p-5 pt-0 pt-md-5">
                          <p class="testimonial-content fs-2">
                            At the core of our practice is the idea that cities
                            are the incubators of our greatest achievements, and
                            the best hope for a sustainable future.
                          </p>
                          <p class="text-black">- Joshima Lin</p>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-slide">
                      <div class="row ">
                        <div class="col-2">
                          <iconify-icon
                            icon="ri:double-quotes-l"
                            class="quote-icon text-primary"
                          ></iconify-icon>
                        </div>
                        <div class="col-md-10 mt-md-5 p-5 pt-0 pt-md-5">
                          <p class="testimonial-content fs-2">
                            At the core of our practice is the idea that cities
                            are the incubators of our greatest achievements, and
                            the best hope for a sustainable future.
                          </p>
                          <p class="text-black">- Joshima Lin</p>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-slide">
                      <div class="row ">
                        <div class="col-2">
                          <iconify-icon
                            icon="ri:double-quotes-l"
                            class="quote-icon text-primary"
                          ></iconify-icon>
                        </div>
                        <div class="col-md-10 mt-md-5 p-5 pt-0 pt-md-5">
                          <p class="testimonial-content fs-2">
                            At the core of our practice is the idea that cities
                            are the incubators of our greatest achievements, and
                            the best hope for a sustainable future.
                          </p>
                          <p class="text-black">- Joshima Lin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="swiper-pagination"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bestselling" class="my-5 overflow-hidden">
          <div class="container py-5 mb-5">
            <div class="section-header d-md-flex justify-content-between align-items-center mb-3">
              <h2 class="display-3 fw-normal">Best selling products</h2>
              <div>
                <a
                  href="#"
                  class="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                >
                  shop now
                </a>
              </div>
            </div>

            <div class=" swiper bestselling-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item5.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item6.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                    Sale
                  </div>
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item7.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item8.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                    -10%
                  </div>
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item3.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="card position-relative">
                    <a href="single-product.html">
                      <img
                        src="images/item4.jpg"
                        class="img-fluid rounded-4"
                        alt="image"
                      />
                    </a>
                    <div class="card-body p-0">
                      <a href="single-product.html">
                        <h3 class="card-title pt-4 m-0">Grey hoodie</h3>
                      </a>

                      <div class="card-text">
                        <span class="rating secondary-font">
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="clarity:star-solid"
                            class="text-primary"
                          ></iconify-icon>
                          5.0
                        </span>

                        <h3 class="secondary-font text-primary">$18.00</h3>

                        <div class="d-flex flex-wrap mt-3">
                          <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 class="text-uppercase m-0">Add to Cart</h5>
                          </a>
                          <a href="#" class="btn-wishlist px-4 pt-3 ">
                            <iconify-icon
                              icon="fluent:heart-28-filled"
                              class="fs-5"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- / category-carousel --> */}
          </div>
        </section>

        <section id="register">
          <div class="container ">
            <div class="row my-5 py-5">
              <div class="offset-md-3 col-md-6 my-5 ">
                <h2 class="display-3 fw-normal text-center">
                  Get 20% Off on{" "}
                  <span class="text-primary">first Purchase</span>
                </h2>
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      name="email"
                      id="password1"
                      placeholder="Create Password"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      name="email"
                      id="password2"
                      placeholder="Repeat Password"
                    />
                  </div>

                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-dark btn-lg rounded-1">
                      Register it now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

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
        </section>

        <section id="insta" class="my-5">
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
        </section>

        <footer id="footer" class="my-5">
          <div class="container py-5 my-5">
            <div class="row">
              <div class="col-md-3">
                <div class="footer-menu">
                  <img src="images/logo.png" alt="logo" />
                  <p class="blog-paragraph fs-6 mt-3">
                    Subscribe to our newsletter to get updates about our grand
                    offers.
                  </p>
                  <div class="social-links">
                    <ul class="d-flex list-unstyled gap-2">
                      <li class="social">
                        <a href="#">
                          <iconify-icon
                            class="social-icon"
                            icon="ri:facebook-fill"
                          ></iconify-icon>
                        </a>
                      </li>
                      <li class="social">
                        <a href="#">
                          <iconify-icon
                            class="social-icon"
                            icon="ri:twitter-fill"
                          ></iconify-icon>
                        </a>
                      </li>
                      <li class="social">
                        <a href="#">
                          <iconify-icon
                            class="social-icon"
                            icon="ri:pinterest-fill"
                          ></iconify-icon>
                        </a>
                      </li>
                      <li class="social">
                        <a href="#">
                          <iconify-icon
                            class="social-icon"
                            icon="ri:instagram-fill"
                          ></iconify-icon>
                        </a>
                      </li>
                      <li class="social">
                        <a href="#">
                          <iconify-icon
                            class="social-icon"
                            icon="ri:youtube-fill"
                          ></iconify-icon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="footer-menu">
                  <h3>Quick Links</h3>
                  <ul class="menu-list list-unstyled">
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Home
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        About us
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Offer{" "}
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Services
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Conatct Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3">
                <div class="footer-menu">
                  <h3>Help Center</h3>
                  <ul class="menu-list list-unstyled">
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        FAQs
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Payment
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Returns & Refunds
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Checkout
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="#" class="nav-link">
                        Delivery Information
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3">
                <div>
                  <h3>Our Newsletter</h3>
                  <p class="blog-paragraph fs-6">
                    Subscribe to our newsletter to get updates about our grand
                    offers.
                  </p>
                  <div class="search-bar border rounded-pill border-dark-subtle px-2">
                    <form
                      class="text-center d-flex align-items-center"
                      action=""
                      method=""
                    >
                      <input
                        type="text"
                        class="form-control border-0 bg-transparent"
                        placeholder="Enter your email here"
                      />
                      <iconify-icon
                        class="send-icon"
                        icon="tabler:location-filled"
                      ></iconify-icon>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div id="footer-bottom">
          <div class="container">
            <hr class="m-0" />
            <div class="row mt-3">
              <div class="col-md-6 copyright">
                <p class="secondary-font">© 2023 Waggy. All rights reserved.</p>
              </div>
              <div class="col-md-6 text-md-end">
                <p class="secondary-font">
                  Free HTML Template by{" "}
                  <a
                    href="https://templatesjungle.com/"
                    target="_blank"
                    class="text-decoration-underline fw-bold text-black-50"
                  >
                    {" "}
                    TemplatesJungle
                  </a>{" "}
                </p>
                <p class="secondary-font">
                  Distributed by{" "}
                  <a
                    href="https://themewagon.com/"
                    target="_blank"
                    class="text-decoration-underline fw-bold text-black-50"
                  >
                    {" "}
                    ThemeWagon
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
