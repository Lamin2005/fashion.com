import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface Login {
  email: string;
  password: string;
}

interface Register extends Login {
  name: string;
}

interface avatarUpload {
  image_url: string;
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

    login: builder.mutation({
      query: (data: Login) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    profile: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),

    upload: builder.mutation({
      query: (data: avatarUpload) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useUploadMutation,
} = userApi;
