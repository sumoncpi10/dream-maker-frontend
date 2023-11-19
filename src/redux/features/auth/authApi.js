import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getEmployee: builder.query({
            query: ({ id }) => `/employee/${id}`,
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
        updateEmployee: builder.mutation({
            query: ({ id, data }) => ({
                url: `/employee/${id}`,
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
    useUpdateEmployeeMutation,
    useChangePasswordMutation
} = authApi;
