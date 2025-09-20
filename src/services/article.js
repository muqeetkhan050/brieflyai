
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
const rapidApiHost = process.env.REACT_APP_RAPID_API_HOST;
const rapidApiBaseUrl = process.env.REACT_APP_RAPID_API_BASE_URL;

console.log('Environment variables:');
console.log('rapidApiKey:', rapidApiKey);
console.log('rapidApiHost:', rapidApiHost);
console.log('rapidApiBaseUrl:', rapidApiBaseUrl);

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: rapidApiBaseUrl,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', rapidApiHost);
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getSummary: builder.query({
      query: (params) =>
        `/summarizeit?url=${encodeURIComponent(params.articleUrl)}&length=4`,
    }),
  }),
});


export const { useLazyGetSummaryQuery } = articleApi;
