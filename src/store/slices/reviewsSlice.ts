import  { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types';
import { mockReviews } from '../../mockData';

interface ReviewsState {
  list: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  list: mockReviews,
  loading: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    fetchReviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchReviewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.list.push(action.payload);
    },
  },
});

export const { 
  fetchReviewsStart, 
  fetchReviewsSuccess, 
  fetchReviewsFailure,
  addReview 
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
 