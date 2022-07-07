import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeader = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '15e3d7af7fmshdd384b7a68faf25p1655aejsn3e1e5b8e6485',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

  const createRequest = (url)=>({url, headers: cryptoNewsHeader})

  // NOW WE ARE FETCHING DATA USING REDUX-TOOLKIT 

// fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.

// -----LINE 24---- ( getCryptos ) IS JUST BASICALLY A NAME OF endpoints

// query IS USED TO FETCH DATA FROM THE SERVER JUST LIKE AXIOS

export const NewsApi = createApi({
    reducerPath:'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptoNews: builder.query({
            query: ({newsCategory, count})=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })  
})

export const {  useGetCryptoNewsQuery } = NewsApi;