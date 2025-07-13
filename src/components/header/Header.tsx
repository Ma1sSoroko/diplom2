import { Link } from 'react-router'
import { SearchForm } from '../searchForm/SearchForm'
import type { LangType } from '../../types'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { setLang } from '../../redux/lang/langSlice'
import logo from '../../assets/Logo-black.png'
import { FaBookmark, FaShoppingBasket } from 'react-icons/fa'

export function Header(): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)
  const dispatch = useAppDispatch()

  function handleChangeLang(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setLang(event.target.value as LangType))
  }

  return (
    <header className="w-75 mx-auto my-4 border-bottom">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/">
          <img src={logo} alt="Book Store" />
        </Link>
        <div className="d-flex">
          <div className="mx-3 justify-content-end"><SearchForm /></div>
          <div className="nav-item">
            <select className="form-select" onChange={handleChangeLang} value={lang}>
              <option value="en">English</option>
              <option value="ru">Russian</option>
            </select>
          </div>
          <div className="d-flex align-items-center">
            <div className="mx-2">
              <Link to="/books/favorite">
                <FaBookmark className="text-dark" />
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/card">
                <FaShoppingBasket className="text-dark" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}