import { api } from '@/redux/api/apiSlice';

const brandApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => `/brand`,
            providesTags: ['brands'],
        }),
        postBrand: builder.mutation({
            query: ({ data }) => ({
                url: `/brand/create-brand`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['brands'],
        }),
    }),
});

export const {
    useGetBrandsQuery,
    usePostBrandMutation,
} = brandApi;
