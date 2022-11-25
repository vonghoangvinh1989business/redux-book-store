import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookData, fetchFavoriteData } from "./bookApi";
import api from "../../apiService";
import { toast } from "react-toastify";

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

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const fetchReadingList = createAsyncThunk(
  "book/fetchReadingList",
  async () => {
    const response = await fetchFavoriteData();
    console.log(`response is: ${JSON.stringify(response)}`);
    console.log(`response data is: ${JSON.stringify(response.data)}`);
    return response.data;
  }
);

export const addBookToReadingList = createAsyncThunk(
  "book/addBookToReadingList",
  async (book) => {
    const response = await api.post(`/favorites`, book);
    return response.data;
  }
);

export const removeBookFromReadingList = createAsyncThunk(
  "book/removeBookFromReadingList",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);
    return response.data;
  }
);

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

    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = "No Book Detail Data Found.";
      });

    builder
      .addCase(addBookToReadingList.pending, (state) => {})
      .addCase(addBookToReadingList.fulfilled, (state) => {
        state.status = null;
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addBookToReadingList.rejected, (state) => {
        state.status = "failed";
        toast.error("Add book to reading list failed.");
      });

    builder
      .addCase(removeBookFromReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeBookFromReadingList.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed.");
      })
      .addCase(removeBookFromReadingList.rejected, (state, action) => {
        state.status = "failed";
        toast.error("Remove book from reading list failed.");
      });

    builder
      .addCase(fetchReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.readingList = action.payload;
      })
      .addCase(fetchReadingList.rejected, (state) => {
        state.status = "failed";
        toast.error("No Reading List Book Data Found.");
      });
  },
});

export default bookSlice.reducer;
