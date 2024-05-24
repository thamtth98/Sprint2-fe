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
import { toast } from "react-toastify";

function Login({ isLogin, userLogin, changeFlagApp }) {
  //lấy accounts
  const [accounts, setAccounts] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();


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


  const [cart, setCart] = useState();
  const [cartFromLocal,setCartFromLocal] = useState();

  //láy cart từ DB để so sánh số lượng
  const [cartDb,setCartDb] = useState();
  useEffect(() => {
    const idAccount = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (idAccount&&token) {
      getListCartFromData(idAccount);
    }
  }, [flag]);

  const getListCartFromData = async (idAccount) => {
    try {
      const res = await productService.getListCartFromData(idAccount);
      setCartDb(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    //lấy cart từ local lưu vào đây
    const res = localStorage.getItem("cart");
    if (res) {
      console.log(res);
      setCart(JSON.parse(res));
    }
  }, [accounts]);

  
  const handleLogin = async () => {
    try {
      const init = {
        username: username,
        password: password,
      };
      const res = await productService.loginConfirm(init);
      setAccounts(res);
  
      if (res) {
        localStorage.setItem("id", res.id);
        localStorage.setItem("token", res.token);
        
        const listCart = localStorage.getItem("cart");
        if (listCart) {
          const cart = JSON.parse(listCart);
          const newListDto = cart.map((item) => {
            return {
              id: null,
              total: item.cosmeticsSize.price,
              idAccount: res.id,
              idBill: null,
              quantity: item.quantity,
              idCosmeticsSize: item.id,
            };
          });
          await saveListCart(newListDto);
          localStorage.removeItem("cart");
        }
        
        navigate("/");
        toast.success("Đăng nhập thành công!!", {
          className: "custom-toast-success",
        });
        changeFlagApp();
      } 
    } catch (e) {
      toast.error("Sai mật khẩu hoặc tài khoản!!", {
        className: "custom-toast-success",
      });
    }
  };
  

  //lấy giỏ hàng từ localStorage để gửi xúng BE
  const [productListDto, setProducListDto] = useState(initDto);

  useEffect(() => {
    const idAccount = localStorage.getItem("id");
    console.log(idAccount);
    console.log(cart);
    if (cart && Array.isArray(cart)) {
      
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
      setFlag(true);
    }
  }, [accounts]);

  useEffect(() => {
    saveListCart(productListDto);
    console.log(productListDto);
  }, [flag]);

  const saveListCart = async (productListDto) => {
    console.log(productListDto);
    const idAccount = localStorage.getItem("id");
    try {
        const res = await productService.saveListCart(productListDto);
        console.log(res);
        localStorage.removeItem("cart");
        // setPageProduct(res);
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

            
                <MDBBtn className="w-100 mb-4 custom-btn" size="md" onClick={handleLogin}>
                  Đăng nhập
                </MDBBtn>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default Login;
