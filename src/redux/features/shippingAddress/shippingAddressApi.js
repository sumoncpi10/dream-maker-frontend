import { api } from '@/redux/api/apiSlice';

const brandApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getShippingAddress: builder.query({
            query: () => `/shipping-address`,
            providesTags: ['brands'],
        }),
        // postBrand: builder.mutation({
        //     query: ({ data }) => ({
        //         url: `/brand/create-brand`,
        //         method: 'POST',
        //         body: data,
        //     }),
        //     invalidatesTags: ['brands'],
        // }),
    }),
});

export const {
    useGetShippingAddressQuery,
    // usePostBrandMutation,
} = brandApi;
