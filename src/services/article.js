// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
// const rapidApiHost = process.env.REACT_APP_RAPID_API_HOST;
// const rapidApiBaseUrl = process.env.REACT_APP_RAPID_API_BASE_URL;

// export const articleApi=createApi({
//     reducerPath:'articleApi',
//     baseQuery:fetchBaseQuery({
//         baseURL:rapidApiBaseUrl,
//         prepareHeaders:(headers)=>{
//             headers.set('X-RapidAPI-Key',rapidApiKey);
//             headers.set('X-RapidAPI-Host',rapidApiHost);
//             return headers;
//         }
//     }),
//     endpoints:(builders)=>({

//         getSummary: builders.query({
//             query:(params)=>`/summarizeit?url=${encodeURIComponent(params.articleUrl)}&length=4`
//         })
//     })
// })


// export const {useLazyGetSummaryQuery}=articleApi
// src/services/article.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
const rapidApiHost = process.env.REACT_APP_RAPID_API_HOST;
const rapidApiBaseUrl = process.env.REACT_APP_RAPID_API_BASE_URL;

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
    // ✅ Fixed: parameter name should match usage in MainPage
    getSummary: builder.query({
      query: (params) =>
        `/summarizeit?url=${encodeURIComponent(params.articleUrl)}&length=4`,
    }),
  }),
});

// ✅ Export hook
export const { useLazyGetSummaryQuery } = articleApi;
