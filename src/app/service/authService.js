import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../api/_configApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("userToken");
      // const token = getState().auth.userToken;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
