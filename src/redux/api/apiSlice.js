import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dream-maker-super-shop-backend.vercel.app/api/v1', prepareHeaders: (headers) => {
      headers.set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwNDEzNzA5LCJleHAiOjE3MzE5NDk3MDl9.JM8orJ7HCud9bJ2L0Ov4FTu7Dh3XD4OU7F5deyZ37Ic');
      return headers;
    },
  }),

  tagTypes: ['user', 'PBSTransferUsers', 'ZonalTransferUsers', 'employee', 'capitalItems', 'DeetailByIndentfication', 'MyCapitalItems', 'NotCertifyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems', 'NotReceivedCapitalItems', 'revenueItems', 'MyRevenueItems', 'NotAssignRevenueItems', 'NotReceivedRevenueItems', 'suppliers', 'brands', 'models', 'users', 'zonals', 'categorys', 'subCategorys', 'departments', 'designations', 'servicings', 'availabledepartment', 'availableComputers', 'availableDotPrinter', 'availablePRDSCRPCY'],
  endpoints: () => ({}),
});
