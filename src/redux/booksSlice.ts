import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Book, BooksStateType, BooksParamsType, BooksResponseType } from '../types'
import { requestBooks } from '../services/books'

// Тип состояния корзины
type RootState = {
    books: BooksStateType
}

// Запрос книг
export const fetchBooks = createAsyncThunk<BooksResponseType, BooksParamsType, { state: RootState }>(
    'books/fetchBooks',
    async (params: BooksParamsType = {}) => {
        const { limit = 20, offset = 0 } = params

        const data = await requestBooks({ ...params, limit, offset })
        return data as BooksResponseType
    }
)

// Добавление книги в избранное
export const addFavoriteBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/addFavoriteBook', async (book) => {
        return book
    }
)

// Удаление книги из избранного
export const removeFavoriteBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/removeFavoriteBook', async (book) => {
        return book
    }
)


export const addCard = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/addCard', async (book) => {
        return book
    }
)


export const removeCard = createAsyncThunk<Book, Book, { rejectValue: string }>(
    'books/removeCard', async (book) => {
        return book
    }
)


export const order = createAsyncThunk<Book[], Book[], { rejectValue: string }>(
    'books/order', async (books) => {
        return books
    }
)

// Инициализация состояния
const initialState: BooksStateType = {
    books: null,
    error: null,
    isLoading: false,
    favoriteBooks: [],
    card: [],
    query: '',
    total: 0,
}

// Создание слайса
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true
                state.favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
                state.card = JSON.parse(localStorage.getItem('card') || '[]')
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.error = action.error.message || null
                state.isLoading = false
                state.favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
                state.card = JSON.parse(localStorage.getItem('card') || '[]')
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BooksResponseType>) => {
                state.books = action.payload.books
                state.isLoading = false
                state.total = action.payload.count
                localStorage.setItem('books', JSON.stringify(state.books))
                localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks))
                localStorage.setItem('card', JSON.stringify(state.card))
            })
            .addCase(addFavoriteBook.fulfilled, (state, action: PayloadAction<Book>) => {
                if (!state.favoriteBooks.some(book => book.isbn13 === action.payload.isbn13)) {
                    state.favoriteBooks.push(action.payload)
                    localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks))
                }
                state.isLoading = false
            })
            .addCase(removeFavoriteBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.favoriteBooks = state.favoriteBooks.filter(book => book.isbn13 !== action.payload.isbn13)
                state.isLoading = false
                localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks))
            })
            .addCase(addCard.fulfilled, (state, action: PayloadAction<Book>) => {
                if (!state.card.some(book => book.isbn13 === action.payload.isbn13)) {
                    state.card.push(action.payload)
                    localStorage.setItem('card', JSON.stringify(state.card))
                }
                state.isLoading = false
            })
            .addCase(removeCard.fulfilled, (state, action: PayloadAction<Book>) => {
                state.card = state.card.filter(book => book.isbn13 !== action.payload.isbn13)
                state.isLoading = false
                localStorage.setItem('card', JSON.stringify(state.card))
            })
            .addCase(order.fulfilled, (state) => {
                state.card = []
                state.isLoading = false
                localStorage.setItem('card', JSON.stringify(state.card))
            })
    }
})

export const booksReducer = booksSlice.reducer