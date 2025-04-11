import { createContext, useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext()

const useCartReducer = () => {
    const [state, dispatch] = useReducer( cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({
        type: 'CLEAR_CART',
    })

    return {state, addToCart, removeFromCart, clearCart }
}

export const CartProvider = ({children}) => {
    const { state, addToCart, clearCart, removeFromCart } = useCartReducer()

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}