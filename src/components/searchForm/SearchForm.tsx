import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Input } from '../input/Input'
import { locales } from '../../config/locales'
import { useAppSelector } from '../../redux/showModals/store'

export function SearchForm() {
  const lang = useAppSelector(state => state.lang.lang)
  const { query } = useParams<{ query: string }>()
  const navigate = useNavigate()
  const [value, setValue] = useState(query)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!value) {
      navigate('/books/all/1')

      return
    }

    navigate(`/books/search/${value}/1`)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(event.target.value)
  }

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