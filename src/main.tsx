import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Importação direta do componente
import './styles/index.css'        // Importação do Tailwind/CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)