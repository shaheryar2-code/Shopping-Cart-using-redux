import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.name} Add from Cart`, {
        position: "bottom-left",
      });
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      state.cartTotalQuantity -= action.payload.cartQuantity;
      state.cartTotalAmount -= action.payload.price * action.payload.cartQuantity;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from Cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= action.payload.price;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= action.payload.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info(`${action.payload.name} removed from Cart`, {
        position: "bottom-left",
      });
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      state.cartItems[itemIndex].cartQuantity += 1;
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.name} Added to Cart`, {
        position: "bottom-left",
      });
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info("Cart cleared", {
        position: "bottom-left",
      });
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
