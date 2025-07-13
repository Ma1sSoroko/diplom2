import { configureStore } from '@reduxjs/toolkit'
import { langReducer } from './lang/langSlice'
import { useDispatch, useSelector } from 'react-redux'
import { booksReducer } from './booksSlice'
import { authReducer } from './auth/authSlice'
import { bookReducer } from './bookSlice'

export const store = configureStore({
  reducer: {
    lang: langReducer,
    books: booksReducer,
    book: bookReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()