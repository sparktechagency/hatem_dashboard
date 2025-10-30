import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import categorySliceReducer from "../features/category/categorySlice";
import adminSliceReducer from "../features/admin/adminSlice";
import userSliceReducer from "../features/user/userSlice";
import faqSliceReducer from "../features/faq/faqSlice";
import brandSliceReducer from "../features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    category: categorySliceReducer,
    admin: adminSliceReducer,
    user: userSliceReducer,
    faq: faqSliceReducer,
    brand: brandSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
