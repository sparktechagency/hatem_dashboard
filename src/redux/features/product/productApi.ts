/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: (args) => {
            const params = new URLSearchParams();
            if (args !== undefined && args.length > 0) {
               args.forEach((item: IParam) => {
                  if (item.value) {
                     params.append(item.name, item.value);
                  }
               });
            }
            return {
               url: "/products/my-products",
               method: "GET",
               params: params,
            };
         },
         keepUnusedDataFor: 600,
         providesTags: [TagTypes.products],
      }),
      getProductById: builder.query<any, string>({
         query: (id) => ({
            url: `/products/${id}`,
            method: "GET",
         }),
         keepUnusedDataFor: 600,
         providesTags: (_result, _error, id) => [
            { type: TagTypes.products, id },
         ],
      }),
      createProduct: builder.mutation({
         query: (data) => ({
            url: "/products",
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result) => {
            if (result?.success) {
               return [TagTypes.products];
            }
            return [];
         },
         async onQueryStarted(_arg, { queryFulfilled }) {
            try {
               await queryFulfilled;
               SuccessToast("Product is added successfully");
            } catch (err: any) {
               const status = err?.error?.status;
               const message =
                  err?.error?.data?.message || "Something Went Wrong";
               if (status === 500) {
                  ErrorToast("Something Went Wrong");
               } else {
                  ErrorToast(message);
               }
            }
         },
      }),
      updateProduct: builder.mutation({
         query: ({ id, data }) => ({
            url: `/brand/update-brand/${id}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: (result) => {
            if (result?.success) {
               return [TagTypes.products];
            }
            return [];
         },
         async onQueryStarted(_arg, { queryFulfilled }) {
            try {
               await queryFulfilled;
               SuccessToast("Brand is updated successfully");
            } catch (err: any) {
               const status = err?.error?.status;
               const message =
                  err?.error?.data?.message || "Something Went Wrong";
               if (status === 500) {
                  ErrorToast("Something Went Wrong");
               } else {
                  ErrorToast(message);
               }
            }
         },
      }),
      deleteProduct: builder.mutation({
         query: (id) => ({
            url: `/brand/delete-brand/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result) => {
            if (result?.success) {
               return [TagTypes.products];
            }
            return [];
         },
         async onQueryStarted(_arg, { queryFulfilled }) {
            try {
               await queryFulfilled;
               SuccessToast("Brand is deleted successfully");
            } catch (err: any) {
               const status = err?.error?.status;
               const message =
                  err?.error?.data?.message || "Something Went Wrong";
               if (status === 500) {
                  ErrorToast("Something Went Wrong");
               } else {
                  ErrorToast(message);
               }
            }
         },
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetProductByIdQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
} = productApi;
