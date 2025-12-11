// Importa React y el hook useState para manejar el estado local del componente
import React, { useState } from 'react'
// Importa el componente de botón reutilizable
import Button from './Shared/Button'
// Importa el store global para acceder a las acciones y estado
import { useGameStore } from '../store/GameContext'

// Componente que permite agregar nuevos jugadores al juego
export default function PlayerInput(){
	// Estado local que almacena el nombre del jugador que se está escribiendo
	// Se inicializa como string vacío
	const [name, setName] = useState('')
	// Obtiene la función addPlayer del store global para agregar jugadores
	const addPlayer = useGameStore(state => state.addPlayer)
	// Obtiene la lista actual de jugadores del store global
	const players = useGameStore(state => state.players)

	// Función que maneja la acción de agregar un jugador
	function handleAdd(){
		// Elimina espacios en blanco al inicio y final del nombre
		const trimmed = name.trim()
		// Si el nombre está vacío después de quitar espacios, no hace nada
		if (!trimmed) return
		// Verifica si ya existe un jugador con el mismo nombre (sin importar mayúsculas/minúsculas)
		// some() retorna true si encuentra al menos un jugador que coincida
		if (players.some(p => p.toLowerCase() === trimmed.toLowerCase())) {
			// Muestra una alerta si el jugador ya está agregado
			alert('Jugador ya agregado')
			// Sale de la función sin agregar el jugador
			return
		}
		// Si el jugador no existe, lo agrega al store global
		addPlayer(trimmed)
		// Limpia el campo de entrada estableciendo el nombre como string vacío
		setName('')
	}

	return (
		// Contenedor con espaciado vertical entre elementos
		<div className="space-y-3">
			{/* Contenedor flex que se adapta: columna en móviles, fila en pantallas grandes */}
			<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
				{/* Campo de entrada de texto para escribir el nombre del jugador */}
				{/* 
					value: valor controlado del input (vinculado al estado name)
					onChange: actualiza el estado name cuando el usuario escribe
					onKeyDown: detecta cuando se presiona una tecla
					- Si se presiona Enter, ejecuta handleAdd() para agregar el jugador
					placeholder: texto de ejemplo que se muestra cuando el input está vacío
					className: estilos responsivos con padding, tamaño de texto y fondo
				*/}
				<input 
					value={name} 
					onChange={e => setName(e.target.value)} 
					onKeyDown={e => e.key === 'Enter' && handleAdd()} 
					placeholder="Agregar jugador" 
					className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-card placeholder:text-gray-400" 
				/>
				{/* Botón para agregar el jugador */}
				{/* 
					className: estilos del botón (color primario, texto blanco)
					w-full sm:w-auto: ancho completo en móviles, ancho automático en pantallas grandes
					onClick: ejecuta handleAdd() cuando se hace clic
				*/}
				<Button 
					className="bg-primary text-white w-full sm:w-auto" 
					onClick={handleAdd}
				>
					Agregar
				</Button>
			</div>
		</div>
	)
}
