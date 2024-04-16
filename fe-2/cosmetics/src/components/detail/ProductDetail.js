import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail(){
    useEffect(() => {
        document.title = "Chi tiết sản phẩm";
      }, []);
      //tìm theo id
      const { id } = useParams();
 
      const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });
    const [cartItemCount, setCartItemCount] = useState(0);
    useEffect(()=>{
        const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        const totalCount = parsedCart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalCount);
      }
    },[cartItemCount])

  
    const addToCart=(product)=>{
      console.log(product);
      const index = cart.findIndex((item)=>item.id === product.id);
   
      if(index !== -1){
        const data = [...cart];
        data[index].quantity +=1;
        setCart(data);
      }else{
        setCart([...cart,{...product,quantity:1}])
      }
 
    }
    useEffect(()=>{
      localStorage.setItem ('cart', JSON.stringify(cart));
         const totalCount = cart.reduce(
           (total, item) => total + item.quantity,
           0
         );
         setCartItemCount(totalCount);
    },[cart])

  
    return (
      <div>
        <h2>Shopping Cart</h2>
        <p>Total Items: {cartItemCount}</p>
        <ul>
          {/* {cart.map((item, index) => (
            <li key={index}>{item.name} - Quantity: {item.quantity}</li>
          ))} */}
        </ul>
        <button onClick={() => addToCart({ id: 1, name: 'Product 1',quantity:1 })}>
          Add Product 1 to Cart
        </button>
        <button onClick={() => addToCart({ id: 2, name: 'Product 2',quantity:1 })}>
          Add Product 2 to Cart
        </button>
      </div>
    );
  
}
export default ProductDetail;