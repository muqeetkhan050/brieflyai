import {createApi} from '@redux.js/toolkit/query/react';


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
