// Importa React para poder usar JSX
import React from 'react'

// Componente de botón reutilizable que se usa en toda la aplicación
// Recibe props para personalizar su comportamiento y apariencia
export default function Button({ children, onClick, className = '', ...props }){
	// Elemento button HTML con estilos base y personalizables
	// onClick: función que se ejecuta cuando se hace clic en el botón
	// className: combina estilos base con estilos personalizados pasados como prop
	// ...props: permite pasar cualquier otra prop HTML al botón (disabled, type, etc.)
	return (
		<button 
			onClick={onClick} 
			className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-sm transition transform active:scale-95 font-medium ${className}`} 
			{...props}
		>
			{/* 
				children: contenido del botón (texto, iconos, etc.) que se pasa entre las etiquetas
				Ejemplo: <Button>Click me</Button> -> "Click me" es children
			*/}
			{children}
		</button>
	)
}

// Explicación de los estilos base del botón:
// px-4 sm:px-6: padding horizontal responsivo (pequeño en móviles, más grande en pantallas grandes)
// py-2: padding vertical constante
// text-sm sm:text-base: tamaño de texto responsivo
// rounded-xl sm:rounded-2xl: bordes redondeados responsivos
// shadow-sm: sombra sutil
// transition: permite transiciones suaves de propiedades
// transform: habilita transformaciones CSS
// active:scale-95: reduce el tamaño del botón al 95% cuando se presiona (efecto de "click")
// font-medium: peso de fuente medio
