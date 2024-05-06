import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";
import * as myLogo from "../../img/logo5.png";
import { useSearchTermContext } from "../search/SearchContext";
import { Logout } from "../login/Logout";
import { toast } from "react-toastify";

function Header({ onSearch, logo }) {
  // const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  //search
  const { searchTerm, setSearchTerm } = useSearchTermContext();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/list");
    setSearchTerm(search);
    console.log(searchTerm);
  };
  //logout
  const onLogoutHandler = () => {
    const idAccount = localStorage.getItem("id");
    if (idAccount) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("cart");
      navigate("/");
      toast.success("Đăng xuất thành công!!", {
        className: "custom-toast-success",
      });
    }
  };
  return (
    <>
      <header>
        <div className="top-header">
          <div className="container py-2">
            LUNA cosmetic - Shop Mỹ Phẩm, Son Môi, Nước Hoa Chính Hãng
          </div>
        </div>
        <div className="header-nav-top">
          <div className="container py-2 ">
            <div className="row pb-0 align-items-center ">
              <div className="col-sm-5 col-lg-2 text-center text-sm-start ">
                <div className="main-logo">
                  <Link to={"/"}>
                    <img
                      src="../images/logo5.png"
                      alt="logo"
                      className="img-fluid"
                      width="150px"
                      height="150px"
                    />
                  </Link>
                </div>
              </div>

              <div className="col-sm-5 col-lg-4 offset-sm-2 offset-md-0 ">
                <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                  <form
                    id="search-form"
                    className="text-center d-flex align-items-center"
                    action=""
                    method=""
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent"
                      onChange={handleChange}
                      placeholder="Tìm kiếm sản phẩm, thương hiệu"
                    />
                    <button type="submit">
                      <i class="bi bi-search-heart"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-3 col-lg-2 offset-sm-0 offset-md-0 d-none d-lg-block">
                <img
                  src="https://kyo.vn/wp-content/uploads/2018/03/fb-icon.png"
                  height="35px"
                ></img>
                <span className="ms-1 item-header-top">LunaCosmetic</span>
              </div>
              <div className="col-sm-3 col-lg-2 offset-sm-2 offset-md-0 d-none d-lg-block">
                <img
                  src="https://kyo.vn/wp-content/uploads/2018/03/icon-ribbon.png"
                  height="35px"
                ></img>
                <span className="item-header-top">Chính hãng 100%</span>
              </div>
              <div className="col-sm-3 col-lg-2 offset-sm-2 offset-md-0 d-none d-lg-block">
                <img
                  src="https://kyo.vn/wp-content/uploads/2018/03/icon-phone-1.png"
                  height="35px"
                ></img>
                <span className="item-header-top">0905.123.456</span>
              </div>
            </div>
          </div>
        </div>

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            {/* //danh mục */}
            {/* <DropdownButton
              id="dropdown-basic-button"
              title="Danh mục sản phẩm"
            >
              <Dropdown.Item href="#/action-1">Mỹ phẩm</Dropdown.Item>
              {["end"].map((direction) => (
                <DropdownButton
                  as={ButtonGroup}
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  variant="secondary"
                  title={`Trang điểm`}
                >
                  <Dropdown.Item eventKey="1"></Dropdown.Item>
                  <Dropdown.Item eventKey="2"></Dropdown.Item>
                  <Dropdown.Item eventKey="3">Nước hoa</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
              ))}
              <Dropdown.Item href="#/action-2">Chăm sóc da mặt</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Chăm sóc tóc và da đầu
              </Dropdown.Item>
            </DropdownButton> */}
            {/* <Navbar.Brand href="#">Danh mục</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mx-auto">
                {/* <NavDropdown
                  title="Danh sách sản phẩm"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#">Son môi</NavDropdown.Item>
                  <NavDropdown.Item href="#">Trang điểm</NavDropdown.Item>
                  <NavDropdown.Item href="#">Dưỡng da</NavDropdown.Item>
                  <NavDropdown.Item href="#">Chăm sóc tóc</NavDropdown.Item>
                  <NavDropdown.Item href="#">Nước hoa</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="#">Hot deals</Nav.Link>
                <Nav.Link href="">
                  <Link to="/producer">Thương hiệu</Link>
                </Nav.Link>
                <Nav.Link href="#">Hàng mới về</Nav.Link>
                <Nav.Link href="#">Bán chạy</Nav.Link>
              </Nav>
              <Nav>
                {/* <Nav.Link href="#">GET PRO</Nav.Link> */}
                <Nav.Link href="#">
                  <Link to={"/auth/login"} >
                    <i className="bi bi-person"></i>
                  </Link>
                </Nav.Link>

                <Nav.Link href="#">
                  <Link to={"/cart"}>
                    <i className="bi bi-bag-heart"></i>
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <button onClick={onLogoutHandler}>Log out</button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container-fluid">
          <hr className="m-0" />
        </div>
      </header>
    </>
  );
}
export default Header;
