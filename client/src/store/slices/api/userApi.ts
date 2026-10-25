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

interface Email {
  email: string;
}

interface updateName {
  name: string;
}

interface updatePassword {
  oldPassword: string;
  password: string;
}

interface resetPassword {
  token: string;
  password: string;
}

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: Register) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data: Login) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),

    profile: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    upload: builder.mutation({
      query: (data: avatarUpload) => ({
        url: "/users/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateEmail: builder.mutation({
      query: (data: Email) => ({
        url: "/users/email-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateName: builder.mutation({
      query: (data: updateName) => ({
        url: "/users/name-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (data: updatePassword) => ({
        url: "/users/password-update",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data: Email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: resetPassword) => ({
        url: `/users/reset-password/${data.token}`,
        method: "POST",
        body: {
          password: data.password,
        },
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
