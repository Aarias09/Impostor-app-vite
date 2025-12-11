// Importa React para poder usar JSX
import React from 'react'
// Importa el store global para acceder a las acciones
import { useGameStore } from '../store/GameContext'
// Importa el componente de botón reutilizable
import Button from './Shared/Button'

// Componente que se muestra cuando termina el juego (después de revelar todos los roles)
export default function EndScreen(){
	// Obtiene la función resetGame del store global
	// Esta función reinicia completamente el juego, eliminando jugadores y reseteando todo
	const reset = useGameStore(s => s.resetGame)
	// Obtiene la función goToHome del store global
	// Esta función vuelve a la pantalla de inicio pero mantiene los jugadores agregados
	const goHome = useGameStore(s => s.goToHome)

	// Contenedor principal de la pantalla final con estilos responsivos
	return (
		<div className="bg-card p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl shadow-lg text-center w-full max-w-md mx-auto">
			{/* Título que indica que el juego ha terminado */}
			{/* 
				text-xl sm:text-2xl: tamaño de texto responsivo
				font-bold: texto en negrita
				mb-6 sm:mb-10: margen inferior responsivo
			*/}
			<h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-10">Juego terminado</h2>
			{/* Contenedor de botones con layout responsivo */}
			{/* 
				flex: contenedor flexbox
				flex-col sm:flex-row: columna en móviles, fila en pantallas grandes
				gap-3: espaciado entre botones
				justify-center: centra los botones horizontalmente
			*/}
			<div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
				{/* Botón para reiniciar completamente el juego */}
				{/* 
					onClick={reset}: ejecuta resetGame() que elimina jugadores y resetea todo
					className: estilos del botón (color primario, texto blanco, ancho máximo en móviles)
				*/}
				<Button className="bg-primary text-white w-full sm:w-auto" onClick={reset}>
					Reiniciar
				</Button>
				{/* Botón para volver a la pantalla de inicio */}
				{/* 
					onClick={goHome}: ejecuta goToHome() que vuelve al inicio manteniendo jugadores
					className: estilos del botón (fondo semi-transparente, texto blanco, ancho máximo en móviles)
				*/}
				<Button className="bg-white/5 text-white w-full sm:w-auto" onClick={goHome}>
					Volver al inicio
				</Button>
			</div>
		</div>
	)
}
