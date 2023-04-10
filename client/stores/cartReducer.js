import { createSlice } from "@reduxjs/toolkit";
export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartOrder: [],
    showCart: false,
  },
  reducers: {
    //show cart side bar
    getShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    //get cart from local
    getCartOrder: (state, action) => {
      state.cartOrder = action.payload;
    },
    //add product
    addProductToCart: (state, action) => {
      let itemCart = action.payload;
      let cartCurrentArr = state.cartOrder;
      let found = false;
      for (let i = 0; i < cartCurrentArr.length; i++) {
        if (
          cartCurrentArr[i].productVariant._id === itemCart.productVariant._id
        ) {
          cartCurrentArr[i].quantity++;
          found = true;
          break;
        }
      }
      if (!found) {
        cartCurrentArr.push(itemCart);
      }
      localStorage.setItem("cart", JSON.stringify(cartCurrentArr));
      state.cartOrder = cartCurrentArr;
    },
    //remove product
    getRemoveItemCart: (state, action) => {
      let index = action.payload;
      let cartCurrentArr = state.cartOrder;
      let newCartArr = cartCurrentArr.filter((item, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(newCartArr));
      state.cartOrder = newCartArr;
    },
    // tang so luong
    getIncrease: (state, action) => {
      let cartCurrentArr = state.cartOrder;
      let index = action.payload;
      cartCurrentArr.forEach((item, i) => {
        if (i === index && item.productVariant.inStock > item.quantity) {
          item.quantity++;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartCurrentArr));
      state.cartOrder = cartCurrentArr;
    },
    // giam so luong
    getDecrease: (state, action) => {
      let cartCurrentArr = state.cartOrder;
      let index = action.payload;
      cartCurrentArr.forEach((item, i) => {
        if (i === index && item.quantity > 1) {
          item.quantity--;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartCurrentArr));
      state.cartOrder = cartCurrentArr;
    },
  },
});
export const {
  getShowCart,
  addProductToCart,
  getRemoveItemCart,
  getCartOrder,
  getDecrease,
  getIncrease,
} = cartReducer.actions;
export default cartReducer.reducer;
