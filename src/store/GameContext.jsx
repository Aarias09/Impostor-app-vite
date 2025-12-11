// Importa la función create de Zustand para crear el store global de estado
import { create } from 'zustand'
// Importa la base de datos por defecto con categorías y personajes predefinidos
import { DEFAULT_DB } from '../data/defaultDatabase'

// Crea y exporta el store global de Zustand que maneja todo el estado de la aplicación
// Zustand es una librería de gestión de estado ligera y simple
export const useGameStore = create(set => ({
	// Estado inicial del store

	// Array que almacena los nombres de los jugadores agregados al juego
	players: [],
	// Base de datos que contiene las categorías y personajes disponibles
	// Se inicializa con la base de datos por defecto, pero puede ser reemplazada con un Excel
	database: DEFAULT_DB,
	// Categoría seleccionada aleatoriamente al iniciar el juego
	chosenCategory: null,
	// Personaje seleccionado aleatoriamente de la categoría elegida
	chosenCharacter: null,
	// Índice del jugador que será el impostor (seleccionado aleatoriamente)
	impostorIndex: null,
	// Índice del jugador actual cuya revelación se está mostrando
	currentRevealIndex: 0,
	// Vista actual de la aplicación: 'home', 'reveal' o 'final'
	view: 'home',

	// ========== ACCIONES (funciones que modifican el estado) ==========

	// Reemplaza la base de datos actual con una nueva (cargada desde Excel)
	// db: array de objetos con formato { category: string, character: string }
	setDatabase: (db) => set(() => ({ database: db })),

	// Agrega un nuevo jugador a la lista de jugadores
	// name: nombre del jugador a agregar
	addPlayer: (name) => set(state => ({ 
		// Crea un nuevo array con todos los jugadores existentes más el nuevo
		players: [...state.players, name] 
	})),

	// Elimina un jugador de la lista en una posición específica
	// i: índice del jugador a eliminar
	removePlayerAt: (i) => set(state => ({ 
		// Filtra el array de jugadores, manteniendo todos excepto el del índice especificado
		players: state.players.filter((_, idx) => idx !== i) 
	})),

	// Reinicia completamente el juego, restaurando todos los valores a su estado inicial
	resetGame: () => set(() => ({ 
		players: [], 
		chosenCategory: null, 
		chosenCharacter: null, 
		impostorIndex: null, 
		currentRevealIndex: 0, 
		view: 'home', 
		database: DEFAULT_DB 
	})),

	// Inicia el juego: selecciona aleatoriamente categoría, personaje e impostor
	startGame: () => set(state => {
		// Función auxiliar para generar un número entero aleatorio más robusto
		// Combina múltiples llamadas a Math.random() para mayor aleatoriedad
		// max: número máximo (exclusivo) que puede retornar
		const getRandomInt = (max) => {
			// Si max es 0 o menor, retorna 0
			if (max <= 0) return 0
			// Genera múltiples valores aleatorios y los combina para mayor aleatoriedad
			let randomValue = 0
			// Suma 3 valores aleatorios diferentes
			for (let i = 0; i < 3; i++) {
				randomValue += Math.random()
			}
			// Promedia los valores para obtener un número entre 0 y 1
			randomValue = randomValue / 3
			// Multiplica por max y redondea hacia abajo para obtener un entero entre 0 y max-1
			return Math.floor(randomValue * max)
		}

		// Selecciona una categoría aleatoria de la base de datos
		// Array.from(new Set(...)) elimina duplicados, obteniendo solo categorías únicas
		const categories = Array.from(new Set(state.database.map(r => r.category)))
		// Obtiene un índice aleatorio dentro del array de categorías
		const categoryIndex = getRandomInt(categories.length)
		// Selecciona la categoría correspondiente al índice aleatorio
		const chosenCategory = categories[categoryIndex]
		
		// Selecciona un personaje aleatorio de la categoría elegida
		// Filtra la base de datos para obtener solo los personajes de la categoría seleccionada
		const candidates = state.database.filter(r => r.category === chosenCategory)
		// Obtiene un índice aleatorio dentro de los candidatos
		const characterIndex = getRandomInt(candidates.length)
		// Selecciona el personaje correspondiente al índice aleatorio
		const chosenCharacter = candidates[characterIndex].character

		// Selecciona aleatoriamente qué jugador será el impostor
		// getRandomInt genera un índice entre 0 y la cantidad de jugadores - 1
		const impostorIndex = getRandomInt(state.players.length)

		// Actualiza el estado con los valores seleccionados y cambia la vista a 'reveal'
		return ({ 
			chosenCategory, 
			chosenCharacter, 
			impostorIndex, 
			currentRevealIndex: 0, 
			view: 'reveal' 
		})
	}),

	// Avanza al siguiente jugador en la secuencia de revelación
	nextReveal: () => set(state => {
		// Calcula el índice del siguiente jugador
		const next = state.currentRevealIndex + 1
		// Si ya se mostraron todos los jugadores, cambia a la vista final
		if (next >= state.players.length) {
			return { view: 'final', currentRevealIndex: next }
		}
		// Si aún hay jugadores, solo actualiza el índice
		return { currentRevealIndex: next }
	}),

	// Vuelve a la pantalla de inicio sin reiniciar completamente el juego
	// Mantiene los jugadores pero resetea los valores del juego
	goToHome: () => set(() => ({ 
		view: 'home', 
		chosenCategory: null, 
		chosenCharacter: null, 
		impostorIndex: null, 
		currentRevealIndex: 0 
	}))
}))
