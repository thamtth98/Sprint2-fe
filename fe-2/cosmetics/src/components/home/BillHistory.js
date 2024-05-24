import { useEffect, useState } from "react";
import * as cartService from "../../service/cartService";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function BillHistory({ userLogin }) {
  const [bill, setBill] = useState();
  useEffect(() => {
    getAllBill();
  }, []);

  const getAllBill = async () => {
    const res = await cartService.getBill(userLogin);
    console.log(userLogin);
    setBill(res);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billDetails, setBillDetails] = useState(null);

  const handleButtonClick = async (idAccount, idBill) => {
    console.log(idAccount, idBill);
    const details = await cartService.detailBill(idAccount, idBill);
    setBillDetails(details);
    console.log(details);
    setShow(true);
  };


  const formattedPrice = (price) => {
    // Định dạng giá tiền thành VNĐ
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VNĐ");
  };
  const formattedDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div class="container custom-container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <table className="table col-6">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Ngày</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Chi tiết</th>
                </tr>
              </thead>
              {bill &&
                bill.map((item, index) => (
                  <>
                    <tbody>
                      <tr>
                        <th>{index + 1}</th>
                        <td>{formattedDate(item.orderDay)}</td>
                        <td>{formattedPrice(item.totalPay)}</td>
                        <Button
                          variant="primary"
                          onClick={() =>
                            handleButtonClick(userLogin.id, item.id)
                          }
                        >
                          Xem chi tiết
                        </Button>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          dialogClassName="modal-90w"
                          aria-labelledby="example-custom-modal-styling-title"
                          size="lg"
                        >
                          <Modal.Header style={{backgroundColor:'pink'}} closeButton>
                            <Modal.Title >Thông tin chi tiết bill đã thanh toán</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Container>
                            <Row>
                                    <Col xs={6} md={1}>
                                      <b>STT</b>
                                    </Col>
                                    <Col xs={6} md={4}>
                                      <b>Tên sản phẩm</b>
                                    </Col>
                                    <Col xs={6} md={2}>
                                      <b>Giá</b>
                                    </Col>
                                    <Col xs={6} md={2}>
                                      <b>Số lượng</b>
                                    </Col>
                                    <Col xs={6} md={2}>
                                      <b>Tổng tiền</b>
                                    </Col>
                                  </Row>
                                  <br></br>
                              {billDetails &&
                                billDetails.map((bill, index) => (
                                  <>                                   
                                  <Row>
                                    <Col xs={6} md={1}>
                                      {index + 1}
                                    </Col>
                                    <Col xs={6} md={4}>
                                      {bill.cosmeticsSize.product.name}
                                    </Col>
                                    <Col xs={6} md={2}>
                                      {formattedPrice(bill.cosmeticsSize.price)}
                                    </Col>
                                    <Col xs={6} md={2}>
                                      {bill.quantity}
                                    </Col>
                                    <Col xs={6} md={2}>
                                      {formattedPrice(bill.quantity * bill.cosmeticsSize.price)}
                                    </Col>
                                  </Row>
                                  </>
                                ))}
                            </Container>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Đóng
                            </Button>
                          
                          </Modal.Footer>
                        </Modal>
                      </tr>
                    </tbody>
                  </>
                ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default BillHistory;
