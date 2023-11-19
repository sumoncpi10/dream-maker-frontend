
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAvailableDepartment: builder.query({
            query: () => `/available-department`,
            method: "GET",
            providesTags: ['availabledepartment'],
        }),
        postAvailableDepartment: builder.mutation({
            query: ({ data }) => ({
                url: `/available-department`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['availabledepartment', 'availablePRDSCRPCY'],
        }),
        getAvailableDesignation: builder.query({
            query: () => `/available-designation`,
            method: "GET",
            providesTags: ['availabledesignation'],
        }),
        postAvailableDesignation: builder.mutation({
            query: ({ data }) => ({
                url: `/available-designation`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['availabledesignation', 'availableComputers', 'availableDotPrinter'],
        }),
        getAvailablePRNPRD: builder.query({
            query: () => `/available-department/available-accessories`,
            method: "GET",
            providesTags: ['availablePRDSCRPCY'],
        }),
        getAvailableComputers: builder.query({
            query: () => `/available-designation/available-computers`,
            method: "GET",
            providesTags: ['availableComputers'],
        }),
        getAvailableDotPrinters: builder.query({
            query: () => `/available-designation/available-dot-printers`,
            method: "GET",
            providesTags: ['availableDotPrinter'],
        }),

    }),
});

export const {
    useGetAvailableDepartmentQuery,
    usePostAvailableDepartmentMutation,
    useGetAvailableDesignationQuery,
    usePostAvailableDesignationMutation,
    useGetAvailablePRNPRDQuery,
    useGetAvailableComputersQuery,
    useGetAvailableDotPrintersQuery
} = categroysApi;
