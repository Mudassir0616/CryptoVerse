import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '15e3d7af7fmshdd384b7a68faf25p1655aejsn3e1e5b8e6485'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoHeaders})

// NOW WE ARE FETCHING DATA USING REDUX-TOOLKIT 

// fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.

// -----LINE 24---- ( getCryptos ) IS JUST BASICALLY A NAME OF endpoints

// query IS USED TO FETCH DATA FROM THE SERVER JUST LIKE AXIOS

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: (countTen)=> createRequest(`/coins?limit=${countTen}`)
        }),

        getExchanges: builder.query({
            query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges`),
          }),
        
        getCryptoDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}`)
        }),

        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod})=> createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`)
        }),

    })
})


// useGetCryptosQuery means " use  getCryptos  query( Api )" from cryptoApi

export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;

