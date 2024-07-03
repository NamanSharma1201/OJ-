import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: '/signup',
                    method: 'POST',  // Corrected here
                    body: user,
                };
            },
        }),
        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: user,
                };
            },
        }),
        sendPasswordResetEmail: builder.mutation({
            query: (user) => {
                return {
                    url: '/reset-password',
                    method: 'POST',
                    body: user,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ id, token, password }) => ({
                url: `/reset/${id}/${token}`,
                method: 'POST',
                body: { password },
            }),
        })
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation } = userAuthApi;
