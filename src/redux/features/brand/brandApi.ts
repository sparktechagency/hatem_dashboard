/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IBrand } from "@/types/carBrand.type";
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetBrandOptions, SetBrandUpdateError } from "./brandSlice";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
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
          url: "/brand/get-brands",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.brands],
    }),
    getBrandDropDown: builder.query({
      query: (typeId) => ({
        url: `/brand/get-brand-drop-down/${typeId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.brandDropDown],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          const options = data?.map((b: IBrand) => ({
            value: b._id,
            label: b.name,
          }))
          dispatch(SetBrandOptions(options))
        } catch {
          ErrorToast("Something Went Wrong");
        }
      },
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/car-brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.brands, TagTypes.brandDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Brand is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
            ErrorToast(message);
          }
        }
      },
    }),
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.brands, TagTypes.brandDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Brand is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetBrandUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetBrandUpdateError(message));
          }
        }
      },
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.brands, TagTypes.brandDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Brand is deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const { useGetBrandsQuery, useGetBrandDropDownQuery, useCreateBrandMutation, useDeleteBrandMutation, useUpdateBrandMutation } = brandApi;
