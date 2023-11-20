import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dream-maker-super-shop-backend.vercel.app/api/v1', prepareHeaders: (headers) => {
      headers.set('authorization', localStorage.getItem('accessToken'));
      return headers;
    },
  }),

  tagTypes: ['user', 'PBSTransferUsers', 'ZonalTransferUsers', 'employee', 'capitalItems', 'DeetailByIndentfication', 'MyCapitalItems', 'NotCertifyCapitalItems', 'NotApproveCapitalItems', 'NotAssignCapitalItems', 'NotReceivedCapitalItems', 'revenueItems', 'MyRevenueItems', 'NotAssignRevenueItems', 'NotReceivedRevenueItems', 'suppliers', 'brands', 'models', 'users', 'zonals', 'categorys', 'subCategorys', 'departments', 'designations', 'servicings', 'availabledepartment', 'availableComputers', 'availableDotPrinter', 'availablePRDSCRPCY'],
  endpoints: () => ({}),
});
