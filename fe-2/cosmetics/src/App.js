import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/home/Home';
import Cart from './components/home/Cart';
import ComesticsList from './components/home/ComsmeticsList';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Producer from './components/home/Producer';
import ProducerDetail from './components/detail/ProducerDetail';
import ProductDetail from './components/detail/ProductDetail';
import Login from './components/login/Login';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/list" element={<ComesticsList />}></Route>
        <Route path="/producer" element={<Producer />}></Route>
        <Route path="/producer/list/:id" element={<ProducerDetail />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
