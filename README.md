# El Impostor - Juego de Roles

Una aplicación web interactiva para jugar "El Impostor", un juego de roles donde los jugadores deben descubrir quién es el impostor.

## 🎮 Características

- Agregar jugadores personalizados
- Cargar base de datos personalizada desde archivos Excel
- Revelación de roles individual por jugador
- Interfaz moderna y responsiva
- Animaciones suaves con Framer Motion

## 🚀 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración inicial (solo la primera vez)

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### Despliegue automático

Una vez configurado, cada vez que hagas push a la rama `main`, el proyecto se desplegará automáticamente en:

**https://Aarias09.github.io/Impostor-app-vite/**

### Despliegue manual

Si prefieres desplegar manualmente:

1. Ejecuta el build localmente:
```bash
npm run build
```

2. El contenido estará en la carpeta `dist/`
3. Puedes subir manualmente el contenido a la rama `gh-pages` o usar GitHub Actions

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📦 Tecnologías utilizadas

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Zustand
- XLSX (SheetJS)

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
