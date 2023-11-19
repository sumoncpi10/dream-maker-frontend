import { api } from '@/redux/api/apiSlice';

const modelApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getModels: builder.query({
            query: () => `/model`,
            providesTags: ['models'],
        }),
        postModel: builder.mutation({
            query: ({ data }) => ({
                url: `/model/create-model`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['models'],
        }),
        updateModel: builder.mutation({
            query: ({ id, data }) => ({
                url: `/model/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['models'],
        }),
    }),
});

export const {
    useGetModelsQuery,
    usePostModelMutation,
    useUpdateModelMutation
} = modelApi;
