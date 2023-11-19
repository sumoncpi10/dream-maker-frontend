import { api } from '@/redux/api/apiSlice';

const capitalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/${id}`,
            providesTags: ['capitalItems'],
        }),
        getDetailedCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/identification-no/${id}`,
            providesTags: ['DeetailByIndentfication'],
        }),
        getMyCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/assignTo/${id}`,
            providesTags: ['MyCapitalItems'],
        }),
        getNotCertifyCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/not-certify/${id}`,
            providesTags: ['NotCertifyCapitalItems'],
        }),
        certifyCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/certify-capital-item/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'DeetailByIndentfication', 'MyCapitalItems', 'NotCertifyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems', 'NotReceivedCapitalItems'],
        }),
        getNotApproveCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/not-approve/${id}`,
            providesTags: ['NotApproveCapitalItems'],
        }),
        approveCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/approve-capital-item/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'DeetailByIndentfication', 'MyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems', 'NotReceivedCapitalItems'],
        }),
        getNotAssignCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/not-assign/${id}`,
            providesTags: ['NotAssignCapitalItems'],
        }),
        getNotReceivedCapitalItems: builder.query({
            query: ({ id }) => `/capital-item/not-receive/${id}`,
            providesTags: ['NotReceivedCapitalItems'],
        }),
        receiveCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/receive-capital-item/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'MyCapitalItems', 'DeetailByIndentfication', 'NotReceivedCapitalItems'],
        }),
        postCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/create-capital-item`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'DeetailByIndentfication', 'MyCapitalItems', 'NotCertifyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems', 'NotReceivedCapitalItems'],
        }),
        updateCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'DeetailByIndentfication', 'NotCertifyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems'],
        }),
        issueCapitalItems: builder.mutation({
            query: ({ id, data }) => ({
                url: `/capital-item/assign-capital-item/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['capitalItems', 'DeetailByIndentfication', 'NotAssignCapitalItems'],
        }),
    }),
});

export const {
    useGetCapitalItemsQuery,
    useGetDetailedCapitalItemsQuery,
    useGetMyCapitalItemsQuery,
    useGetNotCertifyCapitalItemsQuery,
    useCertifyCapitalItemsMutation,
    useGetNotApproveCapitalItemsQuery,
    useApproveCapitalItemsMutation,
    useGetNotAssignCapitalItemsQuery,
    useGetNotReceivedCapitalItemsQuery,
    useReceiveCapitalItemsMutation,
    usePostCapitalItemsMutation,
    useUpdateCapitalItemsMutation,
    useIssueCapitalItemsMutation
} = capitalApi;
