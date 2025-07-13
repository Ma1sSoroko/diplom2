export const baseUrl = 'https://api.itbook.store/1.0/'

export const booksEndpoint = '/new'
export const bookEndpoint = (isbn13: string) => `/books/${isbn13}`
export const authRefreshEndpoint = '/auth/refresh'
export const favoriteBooksEndpoint = '/books/favorite'