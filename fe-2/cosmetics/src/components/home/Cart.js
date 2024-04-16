import Header from "./Header";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Cart() {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);
  //tìm theo id
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className="container py-2">
        <div className="d-flex">
          <div className="col-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-1"></div>
          <div className="col-3">
            <hr></hr>
            <div>Hóa đơn của bạn</div>
            <hr></hr>
            <div>
              <div className="row">
                <div className="col-6">Tạm tính</div>
                <div className="col-6">giá trị</div>
              </div>
              <div className="row">
                <div className="col-6">Giảm giá</div>
                <div className="col-6">giá trị</div>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-6">Tổng cộng</div>
              <div className="col-6">Giá trị</div>
            </div>
            <div className="row">
            <button>Tiến hành thanh toán</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
