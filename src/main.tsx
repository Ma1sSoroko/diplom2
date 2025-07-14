import { createRoot } from 'react-dom/client'
import { App } from './App.js'
import './styles/main.scss'

// Получение корневого элемента
const rootElement: HTMLElement | null = document.querySelector('#root')

// Проверка на наличие корневого элемента
if (!rootElement) {
  throw new Error('Root element not found')
}

// Создание корневого элемента
const root = createRoot(rootElement)

// Отображение приложения
const app: React.ReactElement = <App />
root.render(app)