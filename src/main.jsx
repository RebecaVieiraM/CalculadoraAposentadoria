import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Aposentadoria from './aposentadoria' // Importa o componente Aposentadoria

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aposentadoria /> {/* Renderiza o componente aposentadoria */}
  </StrictMode>,
)
