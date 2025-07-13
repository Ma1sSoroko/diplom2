import { locales } from '../../config/locales'
import { useAppSelector } from '../../redux/showModals/store'

export function Footer({ container: Container }: { container: React.ComponentType<{ children: React.ReactNode }> }): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)

  return (
    <Container>
      <footer>
        <div className="d-flex align-items-center justify-content-between w-75 mx-auto my-5 border-top py-3">
          <p className="text-muted">{locales[lang].footer.copyright}</p>
          <p className="text-muted">{locales[lang].footer.rights}</p>
        </div>
      </footer>
    </Container>
  )
}