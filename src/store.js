import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import fishingJournalApi from './services/fishing-journal-api'

export const store = configureStore({
  reducer: {
    [fishingJournalApi.reducerPath]: fishingJournalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fishingJournalApi.middleware),
})

setupListeners(store.dispatch)