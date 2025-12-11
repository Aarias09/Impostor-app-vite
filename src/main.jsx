// Importa React, la librería principal para construir interfaces de usuario
import React from 'react'
// Importa createRoot de react-dom/client, que es la API moderna de React 18 para renderizar componentes
import { createRoot } from 'react-dom/client'
// Importa el componente principal de la aplicación
import App from './App'
// Importa los estilos globales de la aplicación
import './index.css'

// Obtiene el elemento HTML con id 'root' del DOM (definido en index.html)
// Crea una raíz de React y renderiza la aplicación dentro de ese elemento
createRoot(document.getElementById('root')).render(
	// React.StrictMode es un componente que ayuda a detectar problemas en la aplicación
	// Activa advertencias adicionales y comprobaciones en desarrollo
	<React.StrictMode>
		{/* Componente principal de la aplicación que contiene toda la lógica y estructura */}
		<App />
	</React.StrictMode>
)
