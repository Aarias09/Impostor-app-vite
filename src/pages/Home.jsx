// Importa React para poder usar JSX
import React from 'react'
// Importa el componente para agregar nuevos jugadores
import PlayerInput from '../components/PlayerInput'
// Importa el componente que muestra la lista de jugadores agregados
import PlayerList from '../components/PlayerList'
// Importa el componente para cargar un archivo Excel con la base de datos
import ExcelLoader from '../components/ExcelLoader'
// Importa el store global para acceder al estado y acciones
import { useGameStore } from '../store/GameContext'
// Importa el componente de botón reutilizable
import Button from '../components/Shared/Button'
// Importa el componente de pantalla final (aunque no se usa aquí, está importado)
import EndScreen from '../components/EndScreen'

// Componente de la página principal donde se configura el juego
export default function Home(){
	// Obtiene la lista de jugadores del store global
	const players = useGameStore(s => s.players)
	// Obtiene la función para iniciar el juego del store global
	const startGame = useGameStore(s => s.startGame)

	return (
		// Contenedor principal con ancho máximo y centrado
		<div className="w-full max-w-2xl mx-auto">
			{/* Tarjeta principal con el contenido de la página de inicio */}
			<div className="bg-card p-10 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg">
				{/* Título principal del juego */}
				<h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 mt-2 sm:mt-4 text-center">NOCHE DE IMPOSTOR</h1>

				{/* Sección para agregar nuevos jugadores */}
				<section className="mb-4 sm:mb-5">
					{/* Componente que permite ingresar y agregar jugadores */}
					<PlayerInput />
				</section>

				{/* Sección que muestra la lista de jugadores agregados */}
				<section className="mb-4 sm:mb-6">
					{/* Componente que renderiza todos los jugadores con opción de eliminar */}
					<PlayerList />
				</section>

				{/* Sección para cargar un archivo Excel con la base de datos */}
				<section className="mb-6 sm:mb-10">
					{/* Componente que permite seleccionar y cargar un archivo Excel */}
					<ExcelLoader />
				</section>

				{/* Contenedor del botón para iniciar el juego */}
				<div className="flex justify-center">
					{/* Botón para iniciar el juego */}
					{/* 
						La clase del botón cambia según si hay al menos 3 jugadores:
						- Si hay 3 o más: botón activo con color primario
						- Si hay menos de 3: botón deshabilitado con estilo gris
						onClick solo ejecuta startGame() si hay al menos 3 jugadores
						disabled deshabilita el botón si hay menos de 3 jugadores
					*/}
					<Button 
						className={` ${players.length >= 3 ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 cursor-not-allowed'}`} 
						onClick={() => players.length >= 3 && startGame()} 
						disabled={players.length < 3}
					>
						Iniciar Juego
					</Button>
				</div>
			</div>

			{/* Footer con información del autor */}
			<div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 text-center">© Alejo Arias</div>
		</div>
	)
}
