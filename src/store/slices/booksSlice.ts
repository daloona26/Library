import  { createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types';
import { mockBooks } from '../../mockData';

interface BooksState {
  list: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  list: mockBooks,
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;

export default booksSlice.reducer;
 