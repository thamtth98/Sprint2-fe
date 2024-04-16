import Header from "./Header";
import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../../css/list.css";

function ComesticsList() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Header />
      <div className="container py-2">
        <div className="d-flex">
          <div className="col-md-2 col-lg-2 my-4">
            <div>
              <h5>KHOẢNG GIÁ</h5>
              <div class="price-range m-2">
                <div className="row d-flex">
                  <div className="col-5 p-0">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Từ"
                    />
                  </div>
                  <div className="col-2 p-0 text-center">-</div>
                  <div className="col-5 p-0">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Đến"
                    />
                  </div>
                </div>
                <div className="row d-flex">
                  <button
                    className="btn btn-primary mt-2"
                    onclick="applyPriceRange()"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
            <div>
              <hr></hr>
            </div>

            <div>
              <h4>THƯƠNG HIỆU</h4>
              <div>L'Oreal </div>
              <div>La Roche-Posay </div>
              <div>Eucerin </div>
              <div>Bioderma </div>
              <div>Sunplay</div>
            </div>
            <div>
              <hr></hr>
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
              <h5>HÀNG GÌ ĐÓ</h5>
              <div style={{ backgroundColor: `#ffeaf0` }} className="p-2 ">
                Sắp xếp
                <button className="ms-2 border-0">Mới nhất</button>
                <button className="ms-2">Bán chạy</button>
                <button className="ms-2">Giá thấp đến cao</button>
                <button className="ms-2">Giá cao đến thấp</button>
              </div>
            </div>

            {/* card */}
            <Container>
              <Row>
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
              <Row>
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
          </div>
        </div>
      </div>
    </>
  );
}
export default ComesticsList;
