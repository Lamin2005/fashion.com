import { apiSlice } from "./api";

interface Login {
  email: string;
  password: string;
}

interface Register extends Login {
  name: string;
}

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: Register) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApi;
