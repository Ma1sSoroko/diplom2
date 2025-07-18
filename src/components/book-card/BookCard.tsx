import { useEffect } from 'react'
import { locales } from '../../config'
import { addCard } from '../../redux/booksSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import type { Book, TitleContextType } from '../../types'
import { useOutletContext } from 'react-router'

// Карточка книги
export function BookCard(props: Book): React.ReactElement {
    const { title, subtitle, authors, publisher, pages, year, rating, desc, price, image } = props
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const { setTitle } = useOutletContext<TitleContextType>()

    useEffect(() => { setTitle(locales[lang].book.title) }, [lang])

    function handleClickAddToCard() {
        dispatch(addCard(props))
    }

    return (
        <>
            <div className="card p-5">
                <div className="mb-3">
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                </div>
                <div className="w-100 mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <img src={image} alt="#" className="w-100" />
                    </div>
                    <div>
                        <div className="mb-5">
                            <p className="card-text font-weight-bold">Price: {price}</p>
                        </div>
                        <div>
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <p className="text-transform-uppercase font-size-10">Authors:</p>
                                    <p className="text-transform-uppercase font-size-10">{authors}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-transform-uppercase font-size-10">Publisher:</p>
                                    <p className="text-transform-uppercase font-size-10">{publisher}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-transform-uppercase font-size-10">Pages:</p>
                                    <p className="text-transform-uppercase font-size-10">{pages}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-transform-uppercase font-size-10">Year:</p>
                                    <p className="text-transform-uppercase font-size-10">{year}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-transform-uppercase font-size-10">Rating:</p>
                                    <p className="text-transform-uppercase font-size-10">{rating}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-dark" onClick={handleClickAddToCard}>{locales[lang].book.addToCard}</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="card-text font-size-14">{desc}</p>
                </div>
            </div>
        </>
    )
}