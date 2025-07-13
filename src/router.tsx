import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Search } from './pages/Search'
import { AllBooks } from './pages/AllBooks'
import { FavoriteBooks } from './pages/FavoriteBooks'
import type { RouteObject } from 'react-router'
import { BookPage } from './pages/Book'


const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/books/all/1" />
            },
            {
                path: '/book/:isbn13',
                element: <BookPage />,
            },

            {
                path: '/books/all/:currentPage',
                element: <AllBooks />,
            },
            {
                path: '/books/favorite',
                element: <FavoriteBooks />,
            },
            {
                path: 'books/search/:query',
                element: <Search />,    
            },
            {
                path: '/books/search/:query/:currentPage',
                element: <Search />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes, { basename: '/diplom2' })