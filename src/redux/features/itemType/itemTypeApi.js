
import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGetItemType: builder.query({
            query: () => `/item-type`,
            method: "GET",
        }),
    }),
});

export const {
    useGetGetItemTypeQuery,
} = capitalApi;
