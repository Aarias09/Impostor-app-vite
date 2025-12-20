// Importa React para poder usar JSX
import React from 'react'
// Importa el store global para acceder a la función de volver al inicio
import { useGameStore } from '../store/GameContext'
// Importa la imagen del botón de salida
import exitIcon from '../assets/img/salir.webp'

// Componente de botón de salida que aparece en todas las pantallas
export default function ExitButton() {
	// Obtiene la función para volver a la pantalla de inicio
	const goHome = useGameStore(s => s.goToHome)

	return (
		// Botón posicionado de forma absoluta en la esquina superior izquierda
		// fixed: posición fija respecto a la ventana del navegador
		// top-4 left-4: margen de 1rem (16px) desde la parte superior e izquierda
		// z-50: z-index alto para asegurar que esté por encima de otros elementos
		// cursor-pointer: muestra el cursor de mano al pasar el mouse
		// transition-all: anima todos los cambios de propiedades
		// hover:scale-110: aumenta el tamaño al pasar el mouse
		<button
			onClick={goHome}
			className="fixed top-4 left-4 z-50 cursor-pointer transition-all hover:scale-110 active:scale-95"
			aria-label="Volver al inicio"
		>
			{/* Imagen del botón de salida */}
			{/* 
				w-10 h-10: tamaño de 2.5rem (40px)
				object-contain: mantiene las proporciones de la imagen
				drop-shadow-lg: agrega sombra para mejor visibilidad
			*/}
			<img 
				src={exitIcon} 
				alt="Salir" 
				className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
			/>
		</button>
	)
}
