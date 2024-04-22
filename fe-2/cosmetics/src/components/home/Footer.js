import { Link } from "react-router-dom";
import "../../css/footer.css";

function Footer() {
  return (
    <>
      <footer id="footer">
        <div class="container py-5 ">
          <div class="row">
            <div class="col-md-3">
              <div class="footer-menu">
                {/* <img src="images/logo.png" alt="logo" /> */}
                <h3>KYO AUTHENTIC</h3>
                <p class="blog-paragraph fs-6 mt-3">
                  <i class="bi bi-geo-alt"></i>
                  <span>
                    <b className="ps-2">Địa chỉ: </b>329 Hoàng Diệu, P.Bình
                    Thuận, Q.Hải Châu, Đà Nẵng
                  </span>
                </p>
                <p class="blog-paragraph fs-6 mt-3">
                  <i class="bi bi-envelope"></i>
                  <span>
                    <b className="ps-2">Email: </b> kyoauthentic@gmail.com
                  </span>
                </p>
                <p class="blog-paragraph fs-6 mt-3">
                  <i class="bi bi-telephone"></i>
                  <span>
                    <b className="ps-2">Điện thoại: </b> 098.141.7890
                  </span>
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
                <h3>VỀ CHÚNG TÔI</h3>
                <ul class="menu-list list-unstyled">
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Trang chủ
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Giới thiệu
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Sản phẩm
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-3">
              <div class="footer-menu">
                <h3>Chính sách</h3>
                <ul class="menu-list list-unstyled">
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Chính sách đổi trả
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Chính sách vận chuyển
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="#" class="nav-link">
                      Quy định sử dụng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-3">
              <div>
                <h3>THEO DÕI CHÚNG TÔI</h3>
                <p class="blog-paragraph fs-6">
                  Đăng ký email để không bỏ lỡ các chương trình khuyến mãi và
                  những thông tin mới nhất
                </p>
                <div className="d-flex">
                  <h2 className="me-4">
                    <i class="bi bi-facebook"></i>
                  </h2>
                  <h2 className="me-4">
                    <i class="bi bi-instagram"></i>
                  </h2>
                  <h2>
                    <i class="bi bi-twitter"></i>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <hr class="m-0" />
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
