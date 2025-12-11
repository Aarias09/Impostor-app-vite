// Importa React para poder usar JSX
import React from 'react'
// Importa el store global para acceder al estado y acciones
import { useGameStore } from '../store/GameContext'

// Componente que muestra la lista de jugadores agregados al juego
export default function PlayerList(){
	// Obtiene la lista de jugadores del store global
	const players = useGameStore(s => s.players)
	// Obtiene la función removePlayerAt del store global para eliminar jugadores
	const remove = useGameStore(s => s.removePlayerAt)

	return (
		// Contenedor con grid que muestra los jugadores en una columna con espaciado
		<div className="grid gap-2">
			{/* 
				Itera sobre cada jugador en el array usando map()
				p: nombre del jugador (string)
				i: índice del jugador en el array
			*/}
			{players.map((p, i) => (
				// Contenedor de cada jugador con flexbox para alinear elementos
				// key={i}: identificador único para React (usando el índice)
				<div key={i} className="flex items-center justify-between bg-card p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm">
					{/* Nombre del jugador */}
					{/* 
						font-medium: texto con peso medio
						text-sm sm:text-base: tamaño de texto responsivo
						truncate: corta el texto con "..." si es muy largo
						pr-2: padding derecho para separar del botón
					*/}
					<div className="font-medium text-sm sm:text-base truncate pr-2">{p}</div>
					{/* Botón para eliminar el jugador */}
					{/* 
						onClick: ejecuta remove(i) pasando el índice del jugador a eliminar
						text-xs sm:text-sm: tamaño de texto responsivo
						text-gray-400: color gris por defecto
						hover:text-white: cambia a blanco cuando se pasa el mouse
						whitespace-nowrap: evita que el texto se divida en múltiples líneas
					*/}
					<button 
						onClick={() => remove(i)} 
						className="text-xs sm:text-sm text-gray-400 hover:text-white whitespace-nowrap"
					>
						Eliminar
					</button>
				</div>
			))}
		</div>
	)
}
