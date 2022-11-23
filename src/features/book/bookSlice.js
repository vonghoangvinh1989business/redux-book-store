import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookData } from "./bookApi";

const initialState = {
  bookList: [],
  readingList: [],
  bookDetail: null,
  status: null,
};

export const fetchBook = createAsyncThunk("book/fetchBook", async (props) => {
  const response = await fetchBookData(props);
  return response.data;
});

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.status = null;
        state.bookList = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
