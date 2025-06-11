import  { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';
import { mockCategories } from '../../mockData';

interface CategoriesState {
  list: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  list: mockCategories,
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;
 