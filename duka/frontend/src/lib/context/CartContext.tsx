import React, { createContext, useContext, useReducer } from "react";

// Define action types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

// Create a context
const CartContext = createContext();

// Define the initial state of the cart
const initialState = {
  items: [],
};

// Define the reducer function to manage cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Create a provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{ cart: state, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook to use the Cart context
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
