// Importa React para poder usar JSX
import React from 'react'
// Importa el componente EndScreen que muestra la pantalla final del juego
import EndScreen from '../components/EndScreen'

// Componente de página que se muestra cuando termina el juego
// Es un wrapper simple que contiene el componente EndScreen con estilos de contenedor
export default function Final(){
	// Contenedor principal con ancho máximo
	// w-full: ancho completo
	// max-w-md: ancho máximo de tamaño medio
	// mx-auto: centra el contenedor horizontalmente
	return (
		<div className="w-full max-w-md mx-auto">
			{/* Renderiza el componente EndScreen que contiene los botones de reiniciar y volver al inicio */}
			<EndScreen />
		</div>
	)
}
