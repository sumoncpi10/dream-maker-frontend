
import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategorys: builder.query({
            query: () => `/sub-categories`,
            method: "GET",
            providesTags: ['subCategorys'],
        }),
        postSubCategory: builder.mutation({
            query: ({ data }) => ({
                url: `/sub-categories/create-sub-category`,
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
