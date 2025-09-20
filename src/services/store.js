// import {configureStore} from '@reduxjs/toolkit';
// import { articleApi} from './article';

// export const store=configureStore({
//     reducer:{
//         [articleApi.reducerPath]:articleApi.reducer
//     },
//     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(articleApi.middleware)

// })
import {configureStore} from '@reduxjs/toolkit';
import { articleApi} from './article';

console.log('articleApi imported:', articleApi);
console.log('articleApi.reducer:', articleApi.reducer);
console.log('articleApi.reducerPath:', articleApi.reducerPath);
console.log('articleApi.middleware:', articleApi.middleware);

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(articleApi.middleware)
});

console.log('Store created:', store);
console.log('Store getState:', typeof store?.getState);