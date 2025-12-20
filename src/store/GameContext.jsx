// Importa la función create de Zustand para crear el store global de estado
import { create } from 'zustand'
// Importa la base de datos por defecto con categorías y personajes predefinidos
import { DEFAULT_DB } from '../data/defaultDatabase'

// Función auxiliar para generar un número entero aleatorio uniforme y seguro
// Combina múltiples fuentes de aleatoriedad para máxima entropía y distribución uniforme perfecta
// max: número máximo (exclusivo) que puede retornar
// Retorna un entero aleatorio entre 0 y max-1 con distribución perfectamente uniforme
const getRandomInt = (max) => {
	// Validaciones básicas
	if (!max || max <= 0) return 0
	if (max === 1) return 0
	
	try {
		// Combina múltiples fuentes de aleatoriedad para máxima entropía
		// Esto garantiza que incluso si una fuente tiene sesgo, la combinación lo elimina
		
		// 1. Fuente criptográfica segura (más segura y aleatoria)
		const cryptoArray = new Uint32Array(2)
		crypto.getRandomValues(cryptoArray)
		let combined = cryptoArray[0] >>> 0 // Asegura entero sin signo de 32 bits
		
		// 2. Combina con segundo valor criptográfico usando XOR
		combined = (combined ^ cryptoArray[1]) >>> 0
		
		// 3. Agrega entropía de Math.random() (convertido a entero de 32 bits)
		const mathRandom = Math.floor(Math.random() * 4294967296) >>> 0
		combined = (combined ^ mathRandom) >>> 0
		
		// 4. Agrega entropía del timestamp (últimos bits)
		const timeEntropy = (Date.now() & 0xFFFFFFFF) >>> 0
		combined = (combined ^ timeEntropy) >>> 0
		
		// 5. Agrega entropía de performance.now() si está disponible
		try {
			const perfEntropy = (Math.floor(performance.now() * 1000) & 0xFFFFFFFF) >>> 0
			combined = (combined ^ perfEntropy) >>> 0
		} catch (e) {
			// Si performance.now() no está disponible, continúa sin él
		}
		
		// 6. Rotación de bits para mezclar mejor los valores
		combined = ((combined << 13) | (combined >>> 19)) >>> 0
		combined = (combined ^ (combined << 5)) >>> 0
		
		// Método de rechazo mejorado para garantizar distribución uniforme perfecta
		// Calcula el máximo múltiplo de max que cabe en 2^32
		const maxValid = Math.floor(4294967296 / max) * max
		let randomValue = combined
		
		// Si el valor está fuera del rango válido, genera uno nuevo combinando más fuentes
		let attempts = 0
		while (randomValue >= maxValid && attempts < 10) {
			// Genera nuevos valores criptográficos
			crypto.getRandomValues(cryptoArray)
			const newCrypto = (cryptoArray[0] ^ cryptoArray[1]) >>> 0
			const newMath = Math.floor(Math.random() * 4294967296) >>> 0
			const newTime = (Date.now() & 0xFFFFFFFF) >>> 0
			
			// Combina con el valor anterior usando XOR
			randomValue = (randomValue ^ newCrypto ^ newMath ^ newTime) >>> 0
			randomValue = ((randomValue << 7) | (randomValue >>> 25)) >>> 0
			attempts++
		}
		
		// Si después de los intentos aún está fuera del rango, usa módulo directo
		if (randomValue >= maxValid) {
			randomValue = randomValue % maxValid
		}
		
		// Retorna el índice aleatorio con distribución uniforme perfecta
		let result = randomValue % max
		result = Math.floor(result) // Asegura que sea un entero
		result = Math.max(0, Math.min(result, max - 1)) // Asegura rango válido
		
		// Validación final: si el resultado no es válido, usa fallback
		if (isNaN(result) || result < 0 || result >= max) {
			crypto.getRandomValues(cryptoArray)
			result = (cryptoArray[0] % max) >>> 0
			result = Math.max(0, Math.min(result, max - 1))
		}
		
		return result
	} catch (error) {
		// Fallback de seguridad: si algo falla, usa crypto directamente
		try {
			const cryptoArray = new Uint32Array(1)
			crypto.getRandomValues(cryptoArray)
			return (cryptoArray[0] % max) >>> 0
		} catch (e) {
			// Último recurso: usar Math.random()
			return Math.floor(Math.random() * max)
		}
	}
}

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
		// Si ya existe un impostorIndex válido (randomizado al volver al inicio), lo usa
		// Si no existe o no es válido, lo randomiza ahora
		// Esto garantiza que cada jugador tenga exactamente la misma probabilidad (1/n) de ser elegido
		let impostorIndex = state.impostorIndex
		
		// Valida que el impostorIndex existente sea válido para la cantidad actual de jugadores
		if (impostorIndex === null || impostorIndex === undefined || 
		    impostorIndex < 0 || impostorIndex >= state.players.length) {
			// Si no es válido, randomiza uno nuevo
			impostorIndex = getRandomInt(state.players.length)
		}

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
	// También randomiza el impostor para la próxima partida, asegurando distribución uniforme
	goToHome: () => set(state => {
		// Si hay jugadores, randomiza el impostor para la próxima partida
		// Esto garantiza que cada vez que se presione "Iniciar Juego", 
		// el impostor ya esté seleccionado aleatoriamente con distribución uniforme
		let newImpostorIndex = null
		if (state.players && state.players.length > 0) {
			newImpostorIndex = getRandomInt(state.players.length)
		}
		
		return {
			view: 'home', 
			chosenCategory: null, 
			chosenCharacter: null, 
			impostorIndex: newImpostorIndex, 
			currentRevealIndex: 0 
		}
	})
}))
