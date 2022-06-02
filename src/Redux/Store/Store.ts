import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

import { gutenbergProjectApi } from '../Services/Book';


export const store = configureStore({
  reducer: {

    [gutenbergProjectApi.reducerPath]: gutenbergProjectApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gutenbergProjectApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch