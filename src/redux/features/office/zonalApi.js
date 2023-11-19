
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getZonals: builder.query({
            query: ({ id }) => `/zonal/${id}`,
            method: "GET",
            providesTags: ['zonals'],
        }),
        postZonal: builder.mutation({
            query: ({ data }) => ({
                url: `/zonal/create-zonal`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['zonals'],
        }),
        updateZonal: builder.mutation({
            query: ({ id, data }) => ({
                url: `/zonal/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['zonals'],
        }),
    }),
});

export const {
    useGetZonalsQuery,
    usePostZonalMutation,
    useUpdateZonalMutation
} = categroysApi;
