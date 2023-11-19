import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: ({ id }) => `/supplier/${id}`,
            providesTags: ['suppliers'],
        }),
        postSuppliers: builder.mutation({
            query: ({ id, data }) => ({
                url: `/supplier/create-supplier`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['suppliers'],
        }),
        updateSupplier: builder.mutation({
            query: ({ id, data }) => ({
                url: `/supplier/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['suppliers'],
        }),
    }),
});

export const {
    useGetSuppliersQuery,
    usePostSuppliersMutation,
    useUpdateSupplierMutation
} = capitalApi;
