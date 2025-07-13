import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Book, BooksStateType, BooksParamsType, BooksResponseType } from '../types'
import { requestBooks } from '../services/books'

type RootState = {
    books: BooksStateType
}

export const fetchBooks = createAsyncThunk<BooksResponseType, BooksParamsType, { state: RootState }>(
    'books/fetchBooks',
    async (params: BooksParamsType = {}) => {
        const { limit = 20, offset = 0 } = params

        const data = await requestBooks({...params, limit, offset })
        return data as BooksResponseType
    }
)

export const addFavoriteBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/addFavoriteBook', async (book) => {
        return book
    }
)

export const removeFavoriteBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/removeFavoriteBook', async (book) => {
        return book
    }
)

const initialState: BooksStateType = {
    books: null,
    error: null,
    isLoading: false,
    favoriteBooks: [],
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.error = action.error.message || null
                state.isLoading = false
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BooksResponseType>) => {
                state.books = action.payload.books
                state.isLoading = false
            })
            .addCase(addFavoriteBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.favoriteBooks.push(action.payload)
                state.isLoading = false
            })
            .addCase(removeFavoriteBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.favoriteBooks = state.favoriteBooks.filter(book => book.isbn13 !== action.payload.isbn13)
                state.isLoading = false
            })
    }
})

export const booksReducer = booksSlice.reducer