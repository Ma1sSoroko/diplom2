import type { Book, BooksParamsType, BooksResponseType } from '../types'
import { baseUrl, booksEndpoint, bookEndpoint, favoriteBooksEndpoint, cardEndpoint } from '../config/api'
import { get } from '../config/client'

export async function requestBooks(params?: BooksParamsType): Promise<BooksResponseType | void> {
    try {
        const response = await get(baseUrl + booksEndpoint, { params })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
        }
    }
}

export async function requestBook(isbn13: string): Promise<Book | void> {
    try {
        const response = await get(baseUrl + bookEndpoint + '/' + isbn13)

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
        }
    }
}

export async function requestFavoriteBooks(params?: BooksParamsType): Promise<Book[] | void> {
    try {
        const response = await get(baseUrl + favoriteBooksEndpoint, { params })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
        }
    }
}

export async function requestCard(): Promise<Book[] | void> {
    try {
        const response = await get(baseUrl + cardEndpoint)

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
        }
    }
}