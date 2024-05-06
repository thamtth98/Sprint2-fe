import Header from "./Header";
import React, { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../../css/list.css";
import * as productService from "../../service/productService";
import { useSearchTermContext } from "../search/SearchContext";
import Pagination from "react-bootstrap/Pagination";
import { Link, useParams } from "react-router-dom";

function ComesticsList() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    document.title = "Sản phẩm";
  }, []);
  //tìm theo id
  const { searchTerm, setSearchTerm } = useSearchTermContext();
  const initPage = {
    page: 0,
    size: 8,
    nameSearch: "",
    idProducer: -1,
    idType: -1,
    idSize: -1,
  };
  const [pageProduct, setPageProduct] = useState(initPage);

  useEffect(() => {
    setPageProduct((initPage) => ({
      ...initPage,
      nameSearch: searchTerm,
    }));
  }, [searchTerm]);

  useEffect(() => {
    getAllProduct({ ...initPage, nameSearch: searchTerm });
    console.log(searchTerm);
  }, [searchTerm]);

  //page
  const handleChangePage = (page) => {
    const data = { ...initPage, page };
    setPageProduct(data);
    getAllProduct(data);
  };

  const [uniqueColors, setUniqueColors] = useState();

  const getAllProduct = async (pageProduct) => {
    try {
      const res = await productService.getAll(pageProduct);
      setPageProduct(res);
      const uniqueColors = Array.from(
        new Set(
          pageProduct.content.map(
            (item) => item.cosmeticsSize.product.color.name
          )
        )
      );
      console.log(uniqueColors);
      setUniqueColors(uniqueColors);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  //thương hiệu
  const [producers, setProducers] = useState();

  useEffect(() => {
    getAllProducer();
  }, []);

  const getAllProducer = async () => {
    try {
      const res = await productService.getAllProducer();
      setProducers(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  //Lấy màu sắc theo loại sản phẩm
  const [sizeList, setSizeList] = useState();

  useEffect(() => {
    getAllSize();
  }, []);

  const getAllSize = async () => {
   try {
    const res = await productService.getAllSize();
    console.log(res);
    setSizeList(res);
   } catch (error) {
    console.log(error);
   }
  };

  //sợt theo size, color, mùi
  const newListSearch = pageProduct
  useEffect(() => {
    setPageProduct((initPage) => ({
      ...initPage,
      nameSearch: searchTerm,
    }));
  }, [searchTerm]);
  return (
    <>
      <Header />
      <div className="container py-2">
        <div className="d-flex">
          <div className="col-md-2 col-lg-2 my-4">
            <div>
              <h5>KHOẢNG GIÁ</h5>
              <div className="price-range m-2">
                <div className="row d-flex">
                  <div className="col-5 p-0">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Từ"
                    />
                  </div>
                  <div className="col-2 p-0 text-center">-</div>
                  <div className="col-5 p-0">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Đến"
                    />
                  </div>
                </div>
                <div className="row d-flex">
                  <button className="btn btn-primary mt-2">Áp dụng</button>
                </div>
              </div>
            </div>
            <div>
              <hr></hr>
            </div>

            <div>
              <h4>THƯƠNG HIỆU</h4>
              {producers &&
                producers.map((item, index) => (
                  <div key={index}>
                    <Link to={`/list/${item.id}`}>{item.name}</Link>
                  </div>
                ))}
            </div>
            <div>
              <hr></hr>
            </div>
            <div>
              {pageProduct && pageProduct.content && (
                <>
                  <h4>MÀU SẮC</h4>
                </>
              )}
              {pageProduct &&
                pageProduct.content &&
                pageProduct.content.map((item, index) => (
                  <div key={index}>
                    <Link to={`/producer/list/${item.id}`}>
                      {item.cosmeticsSize.product.color.name}
                    </Link>
                  </div>
                ))}
              {uniqueColors &&
                uniqueColors.map((item, index) => (
                  <div key={index}>
                    <Link to={`/producer/list/${item.id}`}>{item}</Link>
                  </div>
                ))}
            </div>
            <hr></hr>
            <div>
              {pageProduct && pageProduct.content && (
                <>
                  <h4>SIZE</h4>
                </>
              )}
              {pageProduct &&
                pageProduct.content &&
                pageProduct.content.map((item, index) => (
                  <div key={index}>
                    <Link to={`/producer/list/${item.id}`}>
                      {item.size.name}
                    </Link>
                  </div>
                ))}
            </div>
            <div>
              <h4>LOẠI DA</h4>
              <div>Da thường/Mọi loại da</div>
              <div>Da dầu, hỗn hợp dầu</div>
              <div>Da khô, hỗn hợp khô </div>
              <div>Da nhạy cảm </div>
            </div>
          </div>
          <div className="col-md-1 col-lg-1"></div>

          <div className="col-md-9 col-lg-9 my-4">
            <div>
              {/* <div style={{ backgroundColor: `#ffeaf0` }} className="p-2 ">
                Sắp xếp
                <button className="ms-2 border-0">Mới nhất</button>
                <button className="ms-2">Bán chạy</button>
                <button className="ms-2">Giá thấp đến cao</button>
                <button className="ms-2">Giá cao đến thấp</button>
              </div> */}
              {searchTerm ? (
                <>
                  <h5>Kết quả tìm kiếm " {searchTerm} "</h5>
                </>
              ) : (
                <>
                  <h5>XEM SẢN PHẨM</h5>
                </>
              )}
            </div>

            {/* card */}
            <Container>
              <Row>
                {pageProduct && pageProduct.content ? (
                  pageProduct.content.map((item, index) => (
                    <Col md={3} className="p-0" key={index}>
                      <Link to={`/product/${item.id}`}>
                        <Card className="my-card">
                          <div className="img-container">
                            <Card.Img
                              variant="top"
                              src={item.cosmeticsSize.imageList}
                            />
                          </div>
                          <Card.Body>
                            <Card.Title>{item.product.name}</Card.Title>
                            <Card.Text>{item.size.name}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))
                ) : (
                  <div>Không có</div>
                )}
              </Row>
            </Container>
            <div className="text-center mt-5">
              {pageProduct && pageProduct.content && (
                <Pagination>
                  <Pagination.First
                    disabled={pageProduct.number <= 0}
                    onClick={() => handleChangePage(0)}
                  />
                  <Pagination.Prev
                    disabled={pageProduct.number <= 0}
                    onClick={() => handleChangePage(pageProduct.number - 1)}
                  />
                  {Array.from(Array(pageProduct.totalPages)).map((e, i) => (
                    <Pagination.Item
                      active={pageProduct.number === i}
                      key={i + 1}
                      onClick={() => handleChangePage(i)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={pageProduct.number >= pageProduct.totalPages - 1}
                    onClick={() => handleChangePage(pageProduct.number + 1)}
                  />
                  <Pagination.Last
                    disabled={pageProduct.number >= pageProduct.totalPages - 1}
                    onClick={() => handleChangePage(pageProduct.totalPages - 1)}
                  />
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ComesticsList;
