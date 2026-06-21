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

interface updateEmail {
  email: string;
}

interface updateName {
  name: string;
}

interface updatePassword {
  oldPassword: string;
  email: string;
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
      providesTags: ["User"],
    }),

    upload: builder.mutation({
      query: (data: avatarUpload) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateEmail: builder.mutation({
      query: (data: updateEmail) => ({
        url: "/email-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateName: builder.mutation({
      query: (data: updateName) => ({
        url: "/name-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (data: updatePassword) => ({
        url: "/password-update",
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
  useUpdateEmailMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
} = userApi;
