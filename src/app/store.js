import { configureStore } from '@reduxjs/toolkit'
import {cryptoApi} from '../services/cryptoApi'
import { NewsApi } from '../services/NewsApi'

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [NewsApi.reducerPath]: NewsApi.reducer,
        
    }
})