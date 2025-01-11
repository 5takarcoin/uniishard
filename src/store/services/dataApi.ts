import { userType } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    allStyles: builder.query({
      query: () => ({
        url: "/tableStyle",
      }),
    }),
    profile: builder.query<{ user: userType }, void>({
      query: () => "/user/profile",
    }),
    updateCurrTable: builder.mutation({
      query: ({ body, id }) => ({
        method: "PUT",
        url: `/user/${id}`,
        body,
      }),
    }),
    newSlot: builder.mutation({
      query: ({ body, id }) => ({
        method: "PUT",
        url: `/table/${id}`,
        body,
      }),
    }),
    newStyle: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/tableStyle`,
        body,
      }),
    }),
    newTable: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/table`,
        body,
      }),
    }),
  }),
});

export const {
  useAllStylesQuery,
  useNewSlotMutation,
  useProfileQuery,
  useNewStyleMutation,
  useNewTableMutation,
  useUpdateCurrTableMutation,
} = dataApi;
