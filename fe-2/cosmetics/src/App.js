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
import { useState } from "react";

function App() {
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag(!flag);
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <SearchTermProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/list" element={<ComesticsList />}></Route>
            <Route path="/producer" element={<Producer />}></Route>
            <Route path="/list/:id" element={<ProducerDetail />}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/product/:id" element={<ProductDetail  flag={flag}/>}></Route>
            <Route path="/auth/login" element={<Login changeFlag={changeFlag}/>}></Route>
          </Routes>
        </SearchTermProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
