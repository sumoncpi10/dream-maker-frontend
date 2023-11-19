
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDesignations: builder.query({
            query: () => `/designation`,
            method: "GET",
            providesTags: ['designations'],
        }),
        postDesignation: builder.mutation({
            query: ({ data }) => ({
                url: `/designation/create-designation`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['designations'],
        }),
    }),
});

export const {
    useGetDesignationsQuery,
    usePostDesignationMutation,
} = categroysApi;
