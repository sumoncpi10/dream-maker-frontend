
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCcs: builder.query({
            query: ({ id }) => `/complain/${id}`,
            method: "GET",
            providesTags: ['ccs'],
        }),
        postCcs: builder.mutation({
            query: ({ data }) => ({
                url: `/complain/create-complain`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ccs'],
        }),
    }),
});

export const {
    useGetCcsQuery,
    usePostCcsMutation,
} = categroysApi;
