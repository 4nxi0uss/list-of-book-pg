import { configureStore } from '@reduxjs/toolkit'
import BookSlice from '../Slice/BookSlice';
import LangOptionSlice from '../Slice/LangOptionSlice';

export const store = configureStore({
  reducer: {
    getBook: BookSlice,
    getLangOption: LangOptionSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch