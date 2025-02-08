import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://server-library-kmon.onrender.com/api/books"
  );
  return response.data;
});
export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await axios.post(
    "https://server-library-kmon.onrender.com/api/books",
    book
  );
  return response.data;
});
export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  const response = await axios.put(`/api/books/${book.id}`, book);
  return response.data;
});
export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(
    `https://server-library-kmon.onrender.com/api/books/${id}`
  );
  return id;
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload;
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
