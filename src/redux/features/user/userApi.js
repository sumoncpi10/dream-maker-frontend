import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users`,
            providesTags: ['users'],
        }),
        getZonalTransferRequestedUser: builder.query({
            query: ({ id }) => `/user/zonal-all-transfer-requested-user/${id}`,
            providesTags: ['ZonalTransferUsers'],
        }),
        getPBSTransferRequestedUser: builder.query({
            query: ({ id }) => `/user/pbs-all-transfer-requested-user/${id}`,
            providesTags: ['users'],
        }),
        postUsers: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['users'],
        }),
        pbsPostingRequest: builder.mutation({
            query: ({ id }) => ({
                url: `/user/pbs-posting-request/${id}`,
                method: 'POST',
                // body: data,
            }),
            invalidatesTags: ['PBSTransferUsers', 'users'],
        }),
        pbsPostingApprove: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/zonal-posting-request-approve/${id}`,
                method: 'POST',
                // body: data,
            }),
            invalidatesTags: ['PBSTransferUsers'],
        }),
        zonalPostingRequest: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/zonal-posting-request`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ZonalTransferUsers', 'users'],
        }),
        zonalPostingApprove: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/zonal-posting-request-approve/${id}`,
                method: 'POST',
                // body: data,
            }),
            invalidatesTags: ['ZonalTransferUsers'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetZonalTransferRequestedUserQuery,
    useGetPBSTransferRequestedUserQuery,
    usePostUsersMutation,
    usePbsPostingRequestMutation,
    usePbsPostingApproveMutation,
    useZonalPostingRequestMutation,
    useZonalPostingApproveMutation
} = capitalApi;
