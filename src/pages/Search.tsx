import { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { locales } from '../config/locales'
import type { TitleContextType } from '../types'
import { useAppSelector } from '../redux/showModals/store'
import { AllBooks } from './AllBooks'

export function Search(): React.ReactElement {
    const lang = useAppSelector(state => state.lang.lang)
    const { setTitle } = useOutletContext<TitleContextType>()
    const { query } = useParams<{ query: string }>()

    useEffect(() => { setTitle(locales[lang].search.title) }, [lang])

    useEffect(() => {
        setTitle(`Результат поиска по «${query}»`)
    
        return () => {
          setTitle('')
        }
      }, [setTitle, query])

    return (
            <div>
                <AllBooks />
            </div>
    )
}