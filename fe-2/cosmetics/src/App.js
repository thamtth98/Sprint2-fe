import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Cart from "./components/home/Cart";
import ComesticsList from "./components/home/ComsmeticsList";
import "bootstrap-icons/font/bootstrap-icons.css";
import Producer from "./components/home/Producer";
import ProducerDetail from "./components/detail/ProducerDetail";
import ProductDetail from "./components/detail/ProductDetail";
import Login from "./components/login/Login";
import { SearchTermProvider } from "./components/search/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import Checkout from "./components/payment/Checkout";
import { Provider } from "react-redux";
import { UserInfoProvider } from "./components/user/InfoUserContex";
import CheckoutSuccessfully from "./components/payment/Payment";
import * as paymentService from "../src/service/paymentService";
import Header from "./components/home/Header";
import { useSearchTermContext } from "../../cosmetics/src/components/search/SearchContext";
import PersonalInfomation from "./components/user/PersonalInfomation";
import BillHistory from "./components/home/BillHistory";


function App() {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  const [flagApp, setFlagApp] = useState(false);
  const [quantityCart, setQuantityCart] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserLogin();
    } else {
      console.log("set false");
      setIsLogin(false);
      setUserLogin("unknown");
    }
  }, [flagApp]);

  const changeFlagApp = () => {
    setFlagApp(!flagApp);
  };

  const loadUserLogin = async () => {
    try {
      const res = await paymentService.getInfo();
      if (res) {
        setUserLogin(res);
        setIsLogin(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <SearchTermProvider>
          <Header
            isLogin={isLogin}
            userLogin={userLogin}
            changeFlagApp={changeFlagApp}
          ></Header>

          <UserInfoProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/list" element={<ComesticsList />}></Route>
              <Route path="/producer" element={<Producer />}></Route>
              <Route path="/list/:id" element={<ProducerDetail />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              {isLogin == true && (
                <>
                  <Route
                    path="/paymentCart/:id"
                    element={<CheckoutSuccessfully />}
                  />
                  <Route path="/checkout" element={<Checkout />}></Route>
                  <Route path="/info" element={<PersonalInfomation />}></Route>
                  <Route path="/bill" element={<BillHistory userLogin={userLogin}/>}></Route>
                  <Route path="/detailBill" element={<BillHistory userLogin={userLogin}/>}></Route>
                </>
                
              )}

              <Route
                path="/product/:id"
                element={<ProductDetail flagApp={flagApp} />}
              ></Route>
              <Route
                path="/auth/login"
                element={
                  <Login
                    isLogin={isLogin}
                    userLogin={userLogin}
                    changeFlagApp={changeFlagApp}
                  />
                }
              ></Route>
            </Routes>
          </UserInfoProvider>
        </SearchTermProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
