// Importa la librería XLSX (SheetJS) para leer archivos Excel
import * as XLSX from 'xlsx'

// Función asíncrona que lee un archivo Excel y lo convierte en un array de objetos
// file: objeto File del input de archivo (formato .xlsx o .xls)
// Retorna: Promise que resuelve a un array de objetos { category: string, character: string }
export async function readExcelFile(file) {
	// Convierte el archivo a un ArrayBuffer (representación binaria del archivo)
	// await espera a que la conversión termine antes de continuar
	const data = await file.arrayBuffer()
	// Lee el archivo Excel y crea un objeto workbook que contiene todas las hojas
	const workbook = XLSX.read(data)
	// Obtiene el nombre de la primera hoja del libro de Excel
	const firstSheetName = workbook.SheetNames[0]
	// Obtiene el objeto de la hoja correspondiente al nombre obtenido
	const sheet = workbook.Sheets[firstSheetName]
	// Convierte la hoja de Excel a formato JSON (array de objetos)
	// defval: '' establece un valor por defecto vacío para celdas vacías
	const json = XLSX.utils.sheet_to_json(sheet, { defval: '' })

	// Busca columnas que contengan 'categoria' y 'personaje' (sin importar mayúsculas/minúsculas)
	// Normaliza todas las claves (nombres de columnas) a minúsculas para comparación
	const normalizedKeys = Object.keys(json[0] || {}).map(k => k.toLowerCase())
	// Busca si existe una columna que contenga 'categoria' o 'category'
	const hasCategoria = normalizedKeys.find(k => k.includes('categoria') || k.includes('category'))
	// Busca si existe una columna que contenga 'personaje', 'character' o 'person'
	const hasPersonaje = normalizedKeys.find(k => k.includes('personaje') || k.includes('character') || k.includes('person') )

	// Valida que el archivo tenga las columnas requeridas
	// Si falta alguna columna, lanza un error descriptivo
	if (!hasCategoria || !hasPersonaje) {
		throw new Error('El archivo debe contener columnas "Categoria" y "Personaje"')
	}

	// Encuentra el nombre exacto de la columna de categoría (preservando mayúsculas originales)
	// Busca en las claves originales (no normalizadas) una que contenga 'categoria' o 'category'
	const categoryKey = Object.keys(json[0]).find(k => k.toLowerCase().includes('categoria') || k.toLowerCase().includes('category'))
	// Encuentra el nombre exacto de la columna de personaje (preservando mayúsculas originales)
	// Busca en las claves originales una que contenga 'personaje', 'character' o 'person'
	const characterKey = Object.keys(json[0]).find(k => k.toLowerCase().includes('personaje') || k.toLowerCase().includes('character') || k.toLowerCase().includes('person'))

	// Transforma cada fila del JSON en un objeto con formato { category, character }
	// map() itera sobre cada fila y crea un nuevo objeto
	const out = json.map(row => ({
		// Convierte el valor de la columna de categoría a string y elimina espacios al inicio/final
		category: String(row[categoryKey]).trim(),
		// Convierte el valor de la columna de personaje a string y elimina espacios al inicio/final
		character: String(row[characterKey]).trim()
	}))
	// Filtra las filas que tengan tanto categoría como personaje (elimina filas vacías o incompletas)
	.filter(r => r.category && r.character)

	// Retorna el array procesado con los datos limpios y validados
	return out
}
