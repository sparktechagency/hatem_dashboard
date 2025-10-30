import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BrandCreateError: "",
  BrandUpdateError: "",
  brandOptions: []
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    SetBrandCreateError: (state, action) => {
      state.BrandCreateError = action.payload;
    },
    SetBrandUpdateError: (state, action) => {
      state.BrandUpdateError = action.payload;
    },
    SetBrandOptions: (state, action) => {
      state.brandOptions = action.payload;
    }
  },
});

export const {
  SetBrandCreateError,
  SetBrandUpdateError,
  SetBrandOptions
} = brandSlice.actions;

const brandSliceReducer = brandSlice.reducer;
export default brandSliceReducer;
