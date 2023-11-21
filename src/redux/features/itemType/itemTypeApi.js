
import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductType: builder.query({
            query: () => `/product-type`,
            method: "GET",
        }),
    }),
});

export const {
    useGetProductTypeQuery,
} = capitalApi;
