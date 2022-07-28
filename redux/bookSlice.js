import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    books: {},
    totalItemsCount: 0,
    totalPrice: 0,
  },
};

export const BookSlice = createSlice({
  name: "book_store",
  initialState,
  reducers: {
    addToCart(state, action) {
      const book = action.payload;
      if (state.cart.books[book.isbn]) {
        state.cart.books[book.isbn].quantity += 1;
      } else {
        let book_in_Cart = {
          book,
          quantity: 1,
        };
        state.cart.books[book.isbn] = book_in_Cart;
      }
      state.cart.totalItemsCount += 1;
      state.cart.totalPrice += book.price;
    },
  },
});

export const { addToCart } = BookSlice.actions;

export default BookSlice.reducer;
