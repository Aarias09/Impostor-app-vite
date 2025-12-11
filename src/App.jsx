// Importa React para poder usar JSX y hooks
import React from 'react'
// Importa AnimatePresence y motion de framer-motion para animaciones suaves entre componentes
// AnimatePresence permite animar componentes cuando entran y salen del DOM
// motion es un componente que permite agregar animaciones a elementos HTML
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
// Importa la página de inicio donde se configuran los jugadores
import Home from './pages/Home'
// Importa la página del flujo de revelación de roles
import RevealFlow from './pages/RevealFlow'
// Importa la página final que se muestra cuando termina el juego
import Final from './pages/Final'
// Importa el store global de Zustand para acceder al estado de la aplicación
import { useGameStore } from './store/GameContext'

// Componente principal de la aplicación que maneja la navegación entre diferentes vistas
export default function App() {
	// Obtiene la vista actual del store global
	// Puede ser: 'home', 'reveal' o 'final'
	const view = useGameStore(state => state.view)

	return (
		// Contenedor principal con estilos para centrar el contenido y ocupar toda la altura de la pantalla
		// h-screen: altura fija de toda la pantalla (sin scroll)
		// overflow-hidden: previene el scroll en dispositivos móviles
		// flex items-center justify-center: centra el contenido vertical y horizontalmente
		// p-2 sm:p-6: padding responsivo (pequeño en móviles, más grande en pantallas grandes)
		<div className="h-screen overflow-hidden flex items-center justify-center p-2 sm:p-6">
			{/* AnimatePresence permite animar componentes cuando se montan y desmontan */}
			{/* mode="wait" hace que espere a que un componente termine de salir antes de mostrar el siguiente */}
			<AnimatePresence mode="wait">
				{/* Si la vista es 'home', muestra la página de inicio */}
				{view === 'home' && (
					// motion.div agrega animaciones al div
					// key="home": identificador único para que React y framer-motion puedan rastrear el componente
					// initial: estado inicial de la animación (invisible y ligeramente abajo)
					// animate: estado animado (visible y en su posición normal)
					// exit: estado cuando el componente sale (invisible y ligeramente arriba)
					// transition: duración de la animación (0.35 segundos)
					<motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
						{/* Renderiza el componente Home */}
						<Home />
					</motion.div>
				)}

				{/* Si la vista es 'reveal', muestra el flujo de revelación de roles */}
				{view === 'reveal' && (
					// Misma estructura de animación que la vista home
					<motion.div key="reveal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
						{/* Renderiza el componente RevealFlow */}
						<RevealFlow />
					</motion.div>
				)}

				{/* Si la vista es 'final', muestra la pantalla final del juego */}
				{view === 'final' && (
					// Misma estructura de animación que las otras vistas
					<motion.div key="final" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
						{/* Renderiza el componente Final */}
						<Final />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
