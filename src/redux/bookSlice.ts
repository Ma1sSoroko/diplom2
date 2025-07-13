import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { BookStateType, Book } from '../types'
import { requestBook } from '../services/books'

export const fetchBook = createAsyncThunk<Book, string>('book/fetchBook', async (isbn13: string) => {
  const data = await requestBook(isbn13)
  
  if (!data) {
    throw new Error('Failed to fetch book')
  }

  return data
})

const initialState: BookStateType = {
  data: null,
  isLoading: false,
  error: null,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.data = action.payload
        state.isLoading = false
      })
  }
})

export const bookReducer = bookSlice.reducer