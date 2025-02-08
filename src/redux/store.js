import bookReducer from "./slices/bookSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});
