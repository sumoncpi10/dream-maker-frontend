import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getServicing: builder.query({
            query: () => `/servicing`,
            providesTags: ['servicings'],
        }),
        postServicing: builder.mutation({
            query: ({ data }) => ({
                url: `/servicing/create-servicing`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['servicings'],
        }),
        updateServicing: builder.mutation({
            query: ({ id, data }) => ({
                url: `/servicing/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['servicings'],
        }),
    }),
});

export const {
    useGetServicingQuery,
    usePostServicingMutation,
    useUpdateServicingMutation
} = capitalApi;
