import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        if (existingItem.qty < existingItem.stockQty) {
          existingItem.qty += 1;
        }
      } else {
        state.items.push({
          ...newItem,
          qty: 1,
        });
      }
    },

    incrementQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.qty < item.stockQty) {
        item.qty += 1;
      }
    },
    decrementQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
    },

    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
