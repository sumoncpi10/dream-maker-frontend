
import { api } from '@/redux/api/apiSlice';

const categroysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => `/department`,
            method: "GET",
            providesTags: ['depertments'],
        }),
        postDepartment: builder.mutation({
            query: ({ data }) => ({
                url: `/department/create-department`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['depertments'],
        }),
    }),
});

export const {
    useGetDepartmentsQuery,
    usePostDepartmentMutation,
} = categroysApi;
