import { api } from '@/redux/api/apiSlice';

const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `/orders`,
            providesTags: ['orders'],
        }),
        postOrder: builder.mutation({
            query: ({ data }) => ({
                url: `/orders/create-order`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['orders'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    usePostOrderMutation,
} = orderApi;
