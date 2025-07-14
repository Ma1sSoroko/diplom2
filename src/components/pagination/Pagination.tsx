import { NavLink, useParams } from "react-router"
import { buildSchemePagination } from "../../utils/buildPagination"
import { useAppSelector } from "../../redux/store"

// Пагинация
export function Pagination(): React.ReactElement {
    const { currentPage = 1 } = useParams()
    const { books } = useAppSelector(state => state.books)
    const total = books?.length || 0
    const pageCount = Math.ceil(total / 20)
    const pagination = buildSchemePagination(+currentPage, pageCount)

    return (
        <nav className="my-4">
            <ul className="pagination">
                {pagination.map((item: number | string, index: number) => {
                    if (item === '...') {
                        return <li className="page-item disabled" key={index}><span className="page-link">{item}</span></li>
                    }

                    return <li className="page-item" key={index}><NavLink className="page-link" to={`/books/all/${item}`}>{item}</NavLink></li>
                })}
            </ul>
        </nav>
    )
}