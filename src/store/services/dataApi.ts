import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    allStyles: builder.query({
      query: () => ({
        url: "/tableStyle",
      }),
    }),
    newSlot: builder.mutation({
      query: ({ body, id }) => ({
        method: "POST",
        url: `/table/${id}`,
        body,
      }),
    }),
  }),
});

export const { useAllStylesQuery, useNewSlotMutation } = dataApi;
