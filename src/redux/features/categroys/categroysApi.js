
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategorys: builder.query({
            query: () => `/category`,
            method: "GET",
            providesTags: ['categorys'],
        }),
        postCategory: builder.mutation({
            query: ({ data }) => ({
                url: `/category/create-category`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['categorys'],
        }),
    }),
});

export const {
    useGetCategorysQuery,
    usePostCategoryMutation,
} = categroysApi;
