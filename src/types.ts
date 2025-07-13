export type LangType = 'en' | 'ru'

export interface LangContextType {
  lang: LangType
  setLang: (lang: LangType) => void
}

export interface TitleContextType {
  title: string
  setTitle: (title: string) => void
}

export interface Book {
  error: number
  title: string
  subtitle: string
  authors: string
  publisher: string
  isbn10: number
  isbn13: number
  pages: number
  year: number
  rating: number
  desc: string
  price: string
  image: string
  url: string
  pdf: {
    [key: string]: string
  }
  isFavorite?: boolean
}

export type LangSlice = {
  lang: LangType
}

export type BooksStateType = {
  books: Book[] | null,
  error: string | null,
  isLoading: boolean,
  favoriteBooks: Book[],
  basket: Book[],
  query: string,
}

export type BooksParamsType = {
  limit?: number
  offset?: number
  search?: string
  query?: string
}

export type BooksResponseType = {
  count: number
  results: Book[]
}

export type JwtType = {
  access: string
  refresh: string
}

export type BookStateType = {
  data: Book | null
  isLoading: boolean
  error: string | null
}