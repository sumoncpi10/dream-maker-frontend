import { api } from '@/redux/api/apiSlice';

const revenueApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRevenueItems: builder.query({
            query: ({ id }) => `/revenue-item/${id}`,
            providesTags: ['revenueItems'],
        }),
        getMyRevenueItems: builder.query({
            query: () => `/revenue-item/reveived-by`,
            providesTags: ['MyRevenueItems'],
        }),
        getNotAssignRevenueItems: builder.query({
            query: () => `/revenue-item/assignPending`,
            providesTags: ['NotAssignRevenueItems'],
        }),
        getNotReceivedRevenueItems: builder.query({
            query: () => `/revenue-item/ReveivePending`,
            providesTags: ['NotReceivedRevenueItems'],
        }),
        receiveRevenueItems: builder.mutation({
            query: ({ id }) => ({
                url: `/revenue-item/receive-revenue-item/${id}`,
                method: 'POST',
                // body: data,
            }),
            invalidatesTags: ['revenueItems', 'MyRevenueItems', 'NotReceivedRevenueItems', 'DeetailByIndentfication', 'NotAssignRevenueItems'],
        }),
        postRevenueItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/revenue-item/create-revenue-item`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['revenueItems', 'MyRevenueItems', 'NotAssignRevenueItems', 'NotReceivedRevenueItems'],
        }),
        updateRevenueItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/revenue-item/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['revenueItems', 'MyRevenueItems', 'NotAssignRevenueItems'],
        }),
        issueRevenueItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/revenue-item/assign-revenue-item/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['revenueItems', 'DeetailByIndentfication', 'NotAssignRevenueItems'],
        }),
    }),
});

export const {
    useGetRevenueItemsQuery,
    useGetMyRevenueItemsQuery,
    useGetNotAssignRevenueItemsQuery,
    useGetNotReceivedRevenueItemsQuery,
    useReceiveRevenueItemsMutation,
    usePostRevenueItemsMutation,
    useUpdateRevenueItemsMutation,
    useIssueRevenueItemsMutation
} = revenueApi;
