import { Link } from "react-router-dom";
import "../../css/footer.css";

function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="container py-5 ">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-menu">
                {/* <img src="images/logo.png" alt="logo" /> */}
                <h3>KYO AUTHENTIC</h3>
                <p className="blog-paragraph fs-6 mt-3">
                  <i className="bi bi-geo-alt"></i>
                  <span>
                    <b className="ps-2">Địa chỉ: </b>329 Hoàng Diệu, P.Bình
                    Thuận, Q.Hải Châu, Đà Nẵng
                  </span>
                </p>
                <p className="blog-paragraph fs-6 mt-3">
                  <i className="bi bi-envelope"></i>
                  <span>
                    <b className="ps-2">Email: </b> kyoauthentic@gmail.com
                  </span>
                </p>
                <p className="blog-paragraph fs-6 mt-3">
                  <i className="bi bi-telephone"></i>
                  <span>
                    <b className="ps-2">Điện thoại: </b> 098.141.7890
                  </span>
                </p>
                <div className="social-links">
                  <ul className="d-flex list-unstyled gap-2">
                    <li className="social">
                      <a href="#">
                        <iconify-icon
                          className="social-icon"
                          icon="ri:facebook-fill"
                        ></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="#">
                        <iconify-icon
                          className="social-icon"
                          icon="ri:twitter-fill"
                        ></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="#">
                        <iconify-icon
                          className="social-icon"
                          icon="ri:pinterest-fill"
                        ></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="#">
                        <iconify-icon
                          className="social-icon"
                          icon="ri:instagram-fill"
                        ></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="#">
                        <iconify-icon
                          className="social-icon"
                          icon="ri:youtube-fill"
                        ></iconify-icon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-menu">
                <h3>VỀ CHÚNG TÔI</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Trang chủ
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Giới thiệu
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Sản phẩm
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-menu">
                <h3>Chính sách</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Chính sách đổi trả
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Chính sách vận chuyển
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">
                      Quy định sử dụng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <h3>THEO DÕI CHÚNG TÔI</h3>
                <p className="blog-paragraph fs-6">
                  Đăng ký email để không bỏ lỡ các chương trình khuyến mãi và
                  những thông tin mới nhất
                </p>
                <div className="d-flex">
                  <h2 className="me-4">
                    <i className="bi bi-facebook"></i>
                  </h2>
                  <h2 className="me-4">
                    <i className="bi bi-instagram"></i>
                  </h2>
                  <h2>
                    <i className="bi bi-twitter"></i>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <hr className="m-0" />
      <div className="container py-2">
        <div
          id="footer-bottom"
          className="footer-bottom d-flex justify-content-between"
        >
          <div className="d-flex align-items-center">
            <p className="secondary-font">Bản quyền © 2024 Luna Cosmetic</p>
          </div>
          <div className="">
            <img
              src="/images/bocongthuong_small.webp"
              className="img-fluid"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
