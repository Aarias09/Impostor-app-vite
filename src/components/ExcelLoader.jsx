// Importa React y el hook useRef para crear una referencia al input de archivo
import React, { useRef } from 'react'
// Importa el componente de botón reutilizable
import Button from './Shared/Button'
// Importa la función utilitaria para leer y parsear archivos Excel
import { readExcelFile } from '../utils/readExcel'
// Importa el store global para actualizar la base de datos
import { useGameStore } from '../store/GameContext'

// Componente que permite cargar un archivo Excel con la base de datos de categorías y personajes
export default function ExcelLoader(){
	// Crea una referencia al input de archivo para poder activarlo programáticamente
	// useRef permite acceder directamente al elemento DOM sin usar estado
	const inp = useRef(null)
	// Obtiene la función setDatabase del store global para actualizar la base de datos
	const setDatabase = useGameStore(s => s.setDatabase)

	// Función asíncrona que maneja la selección y carga del archivo Excel
	async function handleFile(e){
		// Obtiene el primer archivo seleccionado del input
		const f = e.target.files[0]
		// Si no se seleccionó ningún archivo, sale de la función
		if (!f) return
		// Intenta procesar el archivo dentro de un bloque try-catch para manejar errores
		try{
			// Lee y parsea el archivo Excel usando la función utilitaria
			// readExcelFile retorna una promesa con un array de objetos { category, character }
			const parsed = await readExcelFile(f)
			// Verifica que el archivo tenga contenido válido
			// Si parsed es null, undefined o un array vacío, lanza un error
			if (!parsed || parsed.length === 0) throw new Error('No hay filas válidas')
			// Actualiza la base de datos en el store global con los datos parseados
			setDatabase(parsed)
			// Muestra un mensaje de éxito al usuario
			alert('Base de datos cargada correctamente')
		}catch(err){
			// Si ocurre un error (archivo inválido, formato incorrecto, etc.), muestra el mensaje de error
			alert('Error: ' + err.message)
		}
	}

	return (
		// Contenedor con espaciado vertical entre elementos
		<div className="space-y-2">
			{/* Input de archivo oculto (hidden) que solo acepta archivos .xlsx y .xls */}
			{/* 
				ref={inp}: asigna la referencia para poder activarlo desde el botón
				type="file": input para seleccionar archivos
				accept=".xlsx,.xls": solo permite archivos Excel
				onChange: ejecuta handleFile cuando se selecciona un archivo
				className="hidden": oculta el input (se activa desde el botón)
			*/}
			<input 
				ref={inp} 
				type="file" 
				accept=".xlsx,.xls" 
				onChange={handleFile} 
				className="hidden" 
			/>
			{/* Contenedor flex que se adapta: columna en móviles, fila en pantallas grandes */}
			<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
				{/* Botón que activa el input de archivo cuando se hace clic */}
				{/* 
					onClick: verifica que inp.current exista y luego simula un clic en el input
					Esto abre el diálogo de selección de archivos del sistema operativo
					className: estilos del botón (fondo semi-transparente, texto blanco)
					w-full sm:w-auto: ancho completo en móviles, ancho automático en pantallas grandes
				*/}
				<Button 
					className="bg-white/5 text-white w-full sm:w-auto" 
					onClick={() => inp.current && inp.current.click()}
				>
					Cargar Excel
				</Button>
				{/* Texto informativo sobre el formato esperado del archivo */}
				{/* 
					text-xs sm:text-sm: tamaño de texto responsivo
					text-gray-300: color gris claro
					self-center: centra verticalmente en el contenedor flex
					text-center sm:text-left: centrado en móviles, alineado a la izquierda en pantallas grandes
				*/}
				<div className="text-xs sm:text-sm text-gray-300 self-center text-center sm:text-left">
					(Formato: Categoria | Personaje)
				</div>
				
			</div>
		</div>
	)
}
