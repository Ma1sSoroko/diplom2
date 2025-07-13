import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from './components/layout/Layout'
// import { Search } from './pages/Search'
// import { ListOfBooks } from './components/listOfBooks/ListOfBooks'
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
                element: <AllBooks />,
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
            // {
            //     path: '/books/search/:query/:currentPage',
            //     element: <Search />,
            // },
            // {
            //     path: '/search',
            //     element: <Search />,
            // }
        ],
    },
]

export const router = createBrowserRouter(routes, { basename: '/diplom2' })