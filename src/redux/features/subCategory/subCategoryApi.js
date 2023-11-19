
import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategorys: builder.query({
            query: () => `/sub-category`,
            method: "GET",
            providesTags: ['subCategorys'],
        }),
        postSubCategory: builder.mutation({
            query: ({ data }) => ({
                url: `/sub-category/create-sub-category`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['subCategorys'],
        }),
    }),
});

export const {
    useGetSubCategorysQuery,
    usePostSubCategoryMutation,
} = capitalApi;
