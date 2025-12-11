// Importa React y el hook useState para manejar estado
import React, { useState } from 'react'
// Importa motion y AnimatePresence de framer-motion para animaciones
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
// Importa el componente de botón reutilizable
import Button from './Shared/Button'
// Importa el store global para acceder al estado del juego
import { useGameStore } from '../store/GameContext'
// Importa todas las imágenes de los jugadores desde la carpeta de assets
import img1 from '../assets/img/1.webp'
import img2 from '../assets/img/2.webp'
import img3 from '../assets/img/3.webp'
import img4 from '../assets/img/4.webp'
import img5 from '../assets/img/5.webp'
import img6 from '../assets/img/6.webp'
import img7 from '../assets/img/7.webp'

// Objeto que mapea nombres de jugadores a sus imágenes correspondientes
// Permite mostrar una imagen personalizada para cada jugador conocido
const playerImages = {
	'Alejo': img6,
	'Camilo': img2,
	'Kevin': img5,
	'Gasta': img7,
	'Manu': img4,
	'Cande': img3,
	'German': img1
}

// Componente que muestra la pantalla de revelación de rol para un jugador específico
// playerName: nombre del jugador cuyo rol se está revelando
// playerIndex: índice del jugador en el array de jugadores
export default function RevealRole({ playerName, playerIndex }){
	// Estado local que controla si el rol ya fue revelado o no
	// false: muestra el botón "Ver mi rol"
	// true: muestra el rol del jugador (impostor o personaje)
	const [revealed, setRevealed] = useState(false)
	// Obtiene la categoría seleccionada aleatoriamente al iniciar el juego
	const chosenCategory = useGameStore(s => s.chosenCategory)
	// Obtiene el personaje seleccionado aleatoriamente de la categoría elegida
	const chosenCharacter = useGameStore(s => s.chosenCharacter)
	// Obtiene el índice del jugador que es el impostor
	const impostorIndex = useGameStore(s => s.impostorIndex)
	// Obtiene la función para avanzar al siguiente jugador
	const nextReveal = useGameStore(s => s.nextReveal)

	// Determina si el jugador actual es el impostor
	// Compara el índice del jugador actual con el índice del impostor
	const isImpostor = playerIndex === impostorIndex
	
	// Busca la imagen del jugador en el objeto playerImages
	// Busca sin importar mayúsculas o minúsculas en el nombre
	// Object.keys() obtiene todos los nombres en playerImages
	// find() busca un nombre que coincida (case-insensitive) con playerName
	// Si encuentra coincidencia, retorna la imagen correspondiente, sino undefined
	const playerImage = Object.keys(playerImages).find(
		key => key.toLowerCase() === playerName.toLowerCase()
	) ? playerImages[Object.keys(playerImages).find(
		key => key.toLowerCase() === playerName.toLowerCase()
	)] : undefined

	// El estado revealed se resetea automáticamente cuando el componente se remonta
	// gracias a la key en el componente padre que fuerza el remount cuando cambian las props

	// Contenedor principal con animación de entrada/salida usando framer-motion
	return (
		<motion.div 
			className="bg-card p-[55px] sm:p-[55px] md:p-[55px] lg:p-[100px] rounded-2xl sm:rounded-3xl shadow-lg text-center" 
			initial={{ scale: 0.98, opacity: 0 }} 
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.98, opacity: 0 }}
			transition={{ duration: 0.3 }}
			key={playerIndex}
		>
			{/* Contenedor animado para el nombre del jugador */}
			{/* 
				initial: empieza invisible y ligeramente arriba
				animate: se vuelve visible y baja a su posición normal
				transition: animación con delay de 0.1 segundos
			*/}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
				{/* Etiqueta "Jugador:" */}
				<div className="text-xl sm:text-xl font-semibold mb-3">Jugador:</div>
				{/* Nombre del jugador en negrita */}
				<div className="text-2xl sm:text-2xl font-bold mb-6 sm:mb-6">{playerName}</div>
			</motion.div>

			{/* AnimatePresence permite animar la transición entre el estado "no revelado" y "revelado" */}
			{/* mode="wait": espera a que un componente termine de salir antes de mostrar el siguiente */}
			<AnimatePresence mode="wait">
				{/* Si el rol NO está revelado, muestra el botón para revelarlo */}
				{!revealed ? (
					<motion.div
						key="not-revealed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4 }}
					>
						{/* Si existe una imagen para el jugador, la muestra con animación */}
						{/* 
							playerImage &&: renderizado condicional, solo muestra si playerImage existe
							motion.div: contenedor animado para la imagen
							initial: empieza invisible y más pequeña
							animate: se vuelve visible y tamaño normal
							transition: animación con delay de 0.2 segundos
						*/}
						{playerImage && (
							<motion.div 
								className="mb-6 flex justify-center"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.2 }}
							>
								{/* Imagen del jugador con tamaño máximo y bordes redondeados */}
								<img 
									src={playerImage} 
									alt={playerName} 
									className="max-w-[200px] max-h-[200px] object-contain rounded-lg" 
								/>
							</motion.div>
						)}
						{/* Contenedor animado para el botón */}
						{/* 
							initial: empieza invisible y ligeramente abajo
							animate: se vuelve visible y sube a su posición
							transition: animación con delay de 0.3 segundos
						*/}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.3 }}
						>
							{/* Botón que cambia el estado revealed a true cuando se hace clic */}
							<Button 
								className="bg-primary text-white" 
								onClick={() => setRevealed(true)}
							>
								Ver mi rol
							</Button>
						</motion.div>
					</motion.div>
				) : (
					// Si el rol YA está revelado, muestra la información del rol
					<motion.div
						key="revealed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4 }}
						className="space-y-4 sm:space-y-4"
					>
						{/* Si existe una imagen para el jugador, la muestra nuevamente */}
						{playerImage && (
							<motion.div 
								className="mb-4 flex justify-center"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.1 }}
							>
								<img 
									src={playerImage} 
									alt={playerName} 
									className="max-w-[200px] max-h-[200px] object-contain rounded-lg" 
								/>
							</motion.div>
						)}
						{/* Contenedor animado para la información del rol */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2 }}
						>
							{/* Si el jugador es el impostor, muestra mensaje especial */}
							{isImpostor ? (
								<div className="space-y-3">
									{/* Mensaje indicando que es el impostor */}
									<div className="text-lg sm:text-lg font-bold">Sos el Impostor</div>
									{/* Muestra la categoría en juego para que el impostor sepa de qué adivinar */}
									<div className="text-sm sm:text-sm text-gray-300">
										Categoría en juego: <span className="font-medium">{chosenCategory}</span>
									</div>
								</div>
							) : (
								// Si NO es el impostor, muestra su personaje asignado
								<div className="space-y-3">
									{/* Etiqueta "Tu personaje es:" */}
									<div className="text-lg sm:text-lg">Tu personaje es:</div>
									{/* Nombre del personaje en negrita y grande */}
									<div className="text-2xl sm:text-2xl font-bold">{chosenCharacter}</div>
									{/* Muestra la categoría a la que pertenece el personaje */}
									<div className="text-sm sm:text-sm text-gray-400">Categoría: {chosenCategory}</div>
								</div>
							)}
						</motion.div>

						{/* Contenedor animado para el botón de siguiente jugador */}
						{/* 
							pt-4 sm:pt-4: padding superior
							initial: empieza invisible y ligeramente abajo
							animate: se vuelve visible y sube a su posición
							transition: animación con delay de 0.3 segundos
						*/}
						<motion.div 
							className="pt-4 sm:pt-4"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.3 }}
						>
							{/* Botón que avanza al siguiente jugador en la secuencia */}
							{/* 
								onClick: ejecuta nextReveal() que incrementa currentRevealIndex
								Si es el último jugador, cambia a la vista 'final'
							*/}
							<Button 
								className="bg-white/5 text-white" 
								onClick={() => { nextReveal(); }}
							>
								Siguiente jugador
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
