import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { profile } from "console";

// export const myApi = createApi({
//   reducerPath: "myApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:7000/api/v1/",
//   }),
//   endpoints: (builder) => ({
//     getTable: builder.query({ query: () => "table" }),
//   }),
// });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (creds) => ({
        method: "POST",
        url: "/login",
        body: creds,
      }),
    }),
    signup: builder.mutation({
      query: (creds) => ({
        method: "POST",
        url: "/signup",
        body: creds,
      }),
    }),
    logout: builder.mutation({ query: () => "/logout" }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
