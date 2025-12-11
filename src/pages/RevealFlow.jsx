// Importa React para poder usar JSX
import React from 'react'
// Importa AnimatePresence y motion de framer-motion para animaciones entre jugadores
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
// Importa el store global para acceder al estado del juego
import { useGameStore } from '../store/GameContext'
// Importa el componente que muestra la revelación de rol de un jugador
import RevealRole from '../components/RevealRole'

// Componente que maneja el flujo de revelación de roles, mostrando un jugador a la vez
export default function RevealFlow(){
	// Obtiene la lista de jugadores del store global
	const players = useGameStore(s => s.players)
	// Obtiene el índice del jugador actual cuya revelación se está mostrando
	const current = useGameStore(s => s.currentRevealIndex)

	// Validaciones de seguridad: si no hay jugadores o el índice es inválido, no renderiza nada
	// Esto previene errores si el componente se renderiza en un estado inválido
	if (!players || players.length === 0) return null
	// Si el índice actual es mayor o igual a la cantidad de jugadores, no renderiza nada
	// Esto puede ocurrir cuando se avanza más allá del último jugador
	if (current >= players.length) return null

	// Contenedor principal con ancho máximo y padding responsivo
	return (
		<div className="w-full max-w-md mx-auto px-2 sm:px-6">
			{/* AnimatePresence permite animar la transición cuando cambia el jugador actual */}
			{/* mode="wait": espera a que el componente anterior termine de salir antes de mostrar el siguiente */}
			<AnimatePresence mode="wait">
				{/* Contenedor animado que envuelve el componente RevealRole */}
				{/* 
					key={current}: usa el índice actual como key para que React y framer-motion
					reconozcan cuando cambia el jugador y animen la transición
					initial: estado inicial (invisible y desplazado 50px a la derecha)
					animate: estado animado (visible y en su posición normal)
					exit: estado cuando sale (invisible y desplazado 50px a la izquierda)
					transition: duración de la animación (0.4 segundos)
				*/}
				<motion.div
					key={current}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.4 }}
				>
					{/* Componente que muestra la revelación de rol del jugador actual */}
					{/* 
						playerName: nombre del jugador obtenido del array usando el índice actual
						playerIndex: índice del jugador que se pasa para determinar si es el impostor
					*/}
					<RevealRole key={`${current}-${players[current]}`} playerName={players[current]} playerIndex={current} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
