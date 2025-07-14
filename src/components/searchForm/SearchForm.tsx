import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Input } from '../input/Input'
import { locales } from '../../config'
import { useAppSelector } from '../../redux/store'

// Форма поиска
export function SearchForm(): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)
  const { query } = useParams<{ query: string }>()
  const navigate = useNavigate()
  const [value, setValue] = useState(query)

  // Обработка отправки формы
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Если значение пустое, то перенаправляем на страницу с всеми книгами
    if (!value) {
      navigate('/books/all/1')

      return
    }

    // Перенаправляем на страницу с результатами поиска
    navigate(`/books/search/${value}/1`)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(event.target.value)
  }

  // Возвращаем форму поиска
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={locales[lang].search.placeholder}
      />
    </form>
  )
}