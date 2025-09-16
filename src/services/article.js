import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const rapidApiKey = import.meta.env.REACT_APP_RAPID_API_KEY;
const rapidApiHost = import.meta.env.REACT_APP_RAPID_API_HOST;
const rapidApiBaseUrl = import.meta.env.REACT_APP_RAPID_API_BASE_URL;

export const articleApi=createApi({
    reducerPath:'articleApi',
    baseQuery:fetchBaseQuery({
        baseURL:rapidApiBaseUrl,
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key',rapidApiKey);
            headers.set('X-RapidAPI-Host',rapidApiHost);
            return headers;
        }
    }),
    endpoints:(builders)=>({

        getSummary: builders.query({
            query:(params)=>`/summarizeit?url=${encodeURIComponent(params.articleUrl)}&length=4`
        })
    })
})


export const {useLazyGetSummaryQuery}=articleApi
