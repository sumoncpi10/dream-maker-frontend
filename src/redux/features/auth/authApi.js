import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getEmployee: builder.query({
            query: ({ id }) => `/users/${id}`,
            providesTags: ['employee'],
        }),
        userLogin: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/signin`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        userSignup: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        updateEmployee: builder.mutation({
            query: ({ data }) => ({
                url: `/users`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['employee'],
        }),
        changePassword: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/change-password`,
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['employee'],
        }),
    }),
});

export const {
    useGetEmployeeQuery,
    useUserLoginMutation,
    useUserSignupMutation,
    useUpdateEmployeeMutation,
    useChangePasswordMutation
} = authApi;
