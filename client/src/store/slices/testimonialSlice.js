import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testimonialsAPI } from '../../utils/api';

// Async thunks
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTestimonial = createAsyncThunk(
  'testimonials/fetchTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTestimonial = createAsyncThunk(
  'testimonials/createTestimonial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/updateTestimonial',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      await testimonialsAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  testimonials: [],
  currentTestimonial: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
  },
};

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearCurrentTestimonial: (state) => {
      state.currentTestimonial = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single testimonial
      .addCase(fetchTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTestimonial = action.payload;
      })
      .addCase(fetchTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create testimonial
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.unshift(action.payload);
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update testimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.testimonials.findIndex(
          (test) => test._id === action.payload._id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
        if (
          state.currentTestimonial &&
          state.currentTestimonial._id === action.payload._id
        ) {
          state.currentTestimonial = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (test) => test._id !== action.payload
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTestimonial, clearError } = testimonialSlice.actions;
export default testimonialSlice.reducer;

