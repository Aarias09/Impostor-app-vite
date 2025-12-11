// Base de datos por defecto que contiene categorías y personajes predefinidos
// Se usa cuando no se carga un archivo Excel personalizado
// Cada objeto representa una combinación de categoría y personaje que puede ser seleccionada en el juego
export const DEFAULT_DB = [
	// Categoría: Animales
	{ category: 'Animales', character: 'Perro' },
	{ category: 'Animales', character: 'Gato' },
	{ category: 'Animales', character: 'Elefante' },
	// Categoría: Profesiones
	{ category: 'Profesiones', character: 'Doctor' },
	{ category: 'Profesiones', character: 'Bombero' },
	{ category: 'Profesiones', character: 'Profesor' },
	// Categoría: Películas
	{ category: 'Películas', character: 'Harry Potter' },
	{ category: 'Películas', character: 'Darth Vader' },
	{ category: 'Películas', character: 'Forrest Gump' }
]
