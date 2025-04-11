import { useEffect, useId, useMemo, useRef } from "react";
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";

const CartItem = ( {thumbnail, price, title, quantity, addToCart}) => {

  const totalPrice = useMemo(() => {
    return (price * quantity).toFixed(2)
  }, [quantity])

  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${totalPrice}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
};

const Cart = () => {
  const cartCheckedboxId = useId();
  const { cart, clearCart, addToCart } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const checkbox = document.getElementById(cartCheckedboxId);
  
      const clickedInsideCart = cartRef.current?.contains(event.target);
      const clickedCartButton = event.target.closest('label.cart-button');
  
      if (!clickedInsideCart && !clickedCartButton) {
        checkbox.checked = false;
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartCheckedboxId]);
  
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckedboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckedboxId} type="checkbox" hidden></input>

      <aside className="cart" ref={cartRef}>
        <ul className="cart-items">
          { 
            cart.map( product => (
                <CartItem key={product.id} 
                  addToCart={() => addToCart(product)}
                  {...product}
                />
              )
            )
          }
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
};

export default Cart;
