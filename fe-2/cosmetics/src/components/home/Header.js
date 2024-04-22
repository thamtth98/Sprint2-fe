import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../../css/header.css";


function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event);
  };
  const handleSubmit = () => {
    onSearch(searchTerm);
  };
  return (
    <>
      <header>
        <div className="top-header">
          <div class="container py-2">LUNA cosmetic - Shop Mỹ Phẩm, Son Môi, Nước Hoa Chính Hãng</div>
        </div>
        <div className="header-nav-top">
          <div class="container py-2 ">
            <div class="row pb-0 align-items-center ">
              <div class="col-sm-5 col-lg-2 text-center text-sm-start ">
                <div class="main-logo">
                  <Link to={"/"}>
                    <img
                      src="images/logo5.png"
                      alt="logo"
                      class="img-fluid"
                      width="150px"
                      height="150px"                    
                    />
                  </Link>
                </div>
              </div>

              <div class="col-sm-5 col-lg-4 offset-sm-2 offset-md-0 ">
                <div class="search-bar border rounded-2 px-3 border-dark-subtle">
                  <form
                    id="search-form"
                    class="text-center d-flex align-items-center"
                    action=""
                    method=""
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      class="form-control border-0 bg-transparent"
                      value={searchTerm}
                      onChange={handleChange}
                      placeholder="Tìm kiếm sản phẩm, thương hiệu của bạn"
                    />
                    <button type="submit">
                      <i class="bi bi-search-heart"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div class="col-sm-3 col-lg-2 offset-sm-0 offset-md-0 d-none d-lg-block">
                <img src="https://kyo.vn/wp-content/uploads/2018/03/fb-icon.png" height="35px"></img>
                <span className="ms-1 item-header-top">fb.com/LunaCosmetic</span>
              </div>
              <div class="col-sm-3 col-lg-2 offset-sm-2 offset-md-0 d-none d-lg-block">
                <img src="https://kyo.vn/wp-content/uploads/2018/03/icon-ribbon.png" height="35px"></img>
                <span className="item-header-top">Chính hãng 100%</span>
              </div>
              <div class="col-sm-3 col-lg-2 offset-sm-2 offset-md-0 d-none d-lg-block">
                <img src="https://kyo.vn/wp-content/uploads/2018/03/icon-phone-1.png" height="35px"></img>
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
                  <Link to={"/login"}>
                  <i class="bi bi-person"></i>
                  </Link>
                </Nav.Link>
                
                <Nav.Link href="#">
                  <Link to={"/cart"}>
                  <i class="bi bi-bag-heart"></i>                
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div class="container-fluid">
          <hr class="m-0" />
        </div>
      </header>
    </>
  );
}
export default Header;
