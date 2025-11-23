import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import menuReducer from './slices/menuSlice';
import categoryReducer from './slices/categorySlice';
import testimonialReducer from './slices/testimonialSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    categories: categoryReducer,
    testimonials: testimonialReducer,
  },
});
