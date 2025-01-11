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
    profile: builder.query({ query: () => "/user/profile" }),
    newSlot: builder.mutation({
      query: ({ body, id }) => ({
        method: "PUT",
        url: `/table/${id}`,
        body,
      }),
    }),
  }),
});

export const { useAllStylesQuery, useNewSlotMutation, useProfileQuery } =
  dataApi;
