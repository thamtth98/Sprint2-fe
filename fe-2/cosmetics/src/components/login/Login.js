import React from "react";
import "../../css/login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import * as productService from "../../service/productService";
import { useEffect, useState } from "react";
import { Flag } from "react-bootstrap-icons";
import { toast } from "react-toastify";

function Login({ changeFlag }) {
  const navigate = useNavigate();
  //lấy accounts
  const [accounts, setAccounts] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    if (flag) {
      navigate("/");
    }
  }, [flag]);

  //laasy thông tin từ lc để gửi xúng BE
  const initDto = {
    id: null,
    total: 0,
    idAccount: null,
    idBill: null,
    quantity: 0,
    idCosmeticsSize: -1,
  };

  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   // console.log(savedCart);
  //   return savedCart ? JSON.parse(savedCart) : null;
  // });
  const [cart, setCart] = useState();

  useEffect(() => {
    const res = localStorage.getItem("cart");
    if (res) {
      console.log(res);
      setCart(JSON.parse(res));
    }
  }, []);

  //lấy giỏ hàng từ localStorage để gửi xúng BE
  const [productListDto, setProducListDto] = useState(initDto);

  useEffect(() => {
    const idAccount = localStorage.getItem("id");
    console.log(idAccount);
    if (idAccount && cart && Array.isArray(cart)) {
      const newListDto = cart.map((item) => {
        console.log(item);
        return {
          id: null,
          total: item.cosmeticsSize.price,
          idAccount: idAccount,
          idBill: null,
          quantity: item.quantity,
          idCosmeticsSize: item.id,
        };
      });
      console.log(newListDto);
      setProducListDto(newListDto);
    }
  }, []);

  useEffect(() => {
    getListCart(productListDto);
  }, [productListDto]);

  const getListCart = async (productListDto) => {
    console.log(productListDto);
    const idAccount = localStorage.getItem("id");

    try {
      if(idAccount){
        console.log("uuu");
        const res = await productService.getListCart(productListDto);
        localStorage.removeItem("cart");
        // setPageProduct(res);
        console.log(res);
      }
     
    } catch (e) {
      console.log(e);
    }
  };



  
  const handleLogin = async () => {
    try {
      const init = {
        username: username,
        password: password,
      };
      const res = await productService.loginConfirm(init);
      setAccounts(res);
      const listCart = localStorage.getItem("cart");
      if (res) {
        localStorage.setItem("id", res.id);
        localStorage.setItem("token", res.token);
        changeFlag();
        navigate(-1);
        toast.success("Đăng nhập thành công!!", {
          className: "custom-toast-success",
        });
      } else {
        toast.error("Sai mật khẩu hoặc tài khoản!!", {
          className: "custom-toast-success",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Đăng nhập vào LUNA <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                - Thế giới cosmetics
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                {/* <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      id="form1"
                      type="text"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="form2"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow> */}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Tài khoản"
                  id="form3"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Mật khẩu"
                  id="form4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div> */}

                <MDBBtn className="w-100 mb-4" size="md" onClick={handleLogin}>
                  Đăng nhập
                </MDBBtn>

                {/* <div className="text-center">
                  <p>or sign up with:</p>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default Login;
