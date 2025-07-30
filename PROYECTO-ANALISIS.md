# Portfolio Personal 2025 - Noeli Rodriguez

## 📋 Descripción del Proyecto

Este es un **portfolio personal moderno y profesional** desarrollado para **Noeli Rodriguez**, un desarrollador web y creador de contenido. El proyecto presenta una experiencia digital completa que muestra sus habilidades, servicios y trabajos realizados.

### 🎯 Propósito Principal
- **Portfolio profesional** para mostrar habilidades y proyectos
- **Sitio web de servicios** para captar clientes potenciales
- **Plataforma de contacto** para facilitar la comunicación con clientes
- **Showcase de trabajos** realizados en diferentes áreas

## 🛠️ Tecnologías Utilizadas

### **Frontend Framework**
- **Next.js 15.1.3** - Framework de React para aplicaciones web
- **React 19.0.0** - Biblioteca de JavaScript para interfaces de usuario
- **React DOM 19.0.0** - Renderizado de React en el navegador

### **Estilos y Diseño**
- **Tailwind CSS 3.4.1** - Framework de CSS utility-first
- **PostCSS 8** - Procesador de CSS
- **Fuentes personalizadas**: Outfit (sans-serif) y Ovo (serif)

### **Animaciones y Interactividad**
- **Motion (Framer Motion) 11.15.0** - Biblioteca de animaciones para React
- **Animaciones personalizadas** con efectos de entrada y hover

### **Herramientas de Desarrollo**
- **ESLint 9** - Linter para JavaScript/TypeScript
- **ESLint Config Next** - Configuración específica para Next.js

## 🏗️ Arquitectura del Proyecto

### **Estructura de Carpetas**
```
portfolio-2025/
├── app/                    # App Router de Next.js
│   ├── layout.js          # Layout principal
│   ├── page.js            # Página principal
│   ├── globals.css        # Estilos globales
│   └── favicon.ico        # Icono del sitio
├── components/            # Componentes React reutilizables
│   ├── Header.jsx         # Sección de presentación
│   ├── About.jsx          # Sección "Sobre mí"
│   ├── Services.jsx       # Sección de servicios
│   ├── Work.jsx           # Portfolio de trabajos
│   ├── Contact.jsx        # Formulario de contacto
│   ├── Footer.jsx         # Pie de página
│   └── Navbar.jsx         # Navegación principal
├── assets/                # Recursos estáticos
│   ├── assets.js          # Configuración de assets
│   ├── *.png, *.svg, *.webp  # Imágenes e iconos
│   └── public/            # Archivos públicos adicionales
└── public/                # Archivos estáticos públicos
```

## 🎨 Características Principales

### **1. Diseño Responsivo**
- **Mobile-first approach** con breakpoints para diferentes dispositivos
- **Grid system** adaptativo usando Tailwind CSS
- **Imágenes optimizadas** con Next.js Image component

### **2. Modo Oscuro/Claro**
- **Toggle automático** basado en preferencias del sistema
- **Persistencia** en localStorage
- **Transiciones suaves** entre modos
- **Iconos adaptativos** para cada modo

### **3. Animaciones y Microinteracciones**
- **Animaciones de entrada** con Framer Motion
- **Efectos hover** en tarjetas y botones
- **Transiciones suaves** entre secciones
- **Animaciones de scroll** (whileInView)

### **4. Secciones del Portfolio**

#### **Header (Presentación)**
- Foto de perfil con animación de escala
- Título principal animado
- Botones de llamada a la acción
- Enlaces a agenda y portfolio

#### **About (Sobre Mí)**
- Información personal y profesional
- Tarjetas de habilidades principales
- Herramientas utilizadas (WordPress, React, Next.js, etc.)
- Imagen personal con efectos

#### **Services (Servicios)**
- **4 servicios principales**:
  - Diseño y Desarrollo Web
  - Contenido y Redes Sociales
  - Automatización con IA
  - Soporte Técnico
- Enlaces a páginas detalladas de cada servicio

#### **Work (Portfolio)**
- **4 proyectos destacados**:
  - FactuSync (Web App)
  - Content Creator (Contenido)
  - IA Automation (Herramientas IA)
  - Borage Catering (Diseño Web)
- Enlaces a casos de estudio detallados

#### **Contact (Contacto)**
- Formulario de contacto con Web3Forms
- Enlace directo a agenda de citas
- Integración con servicios externos

## 🎯 Servicios Ofrecidos

### **1. Diseño y Desarrollo Web**
- Sitios web modernos y responsivos
- WordPress, React y Next.js
- Interfaces limpias y centradas en el usuario

### **2. Contenido y Redes Sociales**
- Gestión de perfiles sociales
- Creación de videos, reels y posts
- Estrategias de crecimiento de marca

### **3. Automatización con IA**
- Herramientas inteligentes para automatizar respuestas
- Integración en sitios web y redes sociales
- Asistentes virtuales personalizados

### **4. Soporte Técnico**
- Ayuda personalizada para resolver problemas técnicos
- Mantenimiento de herramientas digitales
- Soporte continuo

## 🚀 Funcionalidades Técnicas

### **Performance**
- **Optimización de imágenes** con Next.js
- **Lazy loading** de componentes
- **CSS optimizado** con Tailwind
- **Bundle splitting** automático

### **SEO y Accesibilidad**
- **Metadatos** configurados
- **Semantic HTML** en componentes
- **Alt text** en imágenes
- **Navegación por teclado** compatible

### **Integraciones**
- **Web3Forms** para formularios de contacto
- **Zcal** para agenda de citas
- **Blog externo** para casos de estudio detallados

## 🎨 Paleta de Colores y Diseño

### **Modo Claro**
- **Fondo principal**: Blanco
- **Texto**: Negro/Gris oscuro
- **Acentos**: Colores personalizados definidos en Tailwind
- **Hover effects**: `#fcf4ff`

### **Modo Oscuro**
- **Fondo principal**: `#11001F`
- **Texto**: Blanco
- **Acentos**: Variaciones de blanco
- **Hover effects**: `#2a004a`

### **Tipografía**
- **Outfit**: Para textos generales (400, 500, 600, 700)
- **Ovo**: Para títulos y elementos destacados (400)

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Adaptaciones**
- **Grid layouts** que se adaptan automáticamente
- **Navegación móvil** con menú hamburguesa
- **Imágenes responsivas** que se ajustan al contenido
- **Espaciado adaptativo** según el tamaño de pantalla

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## 🌟 Características Destacadas

1. **Diseño Moderno**: Interfaz limpia y profesional
2. **Animaciones Fluidas**: Transiciones suaves y atractivas
3. **Modo Oscuro**: Experiencia visual adaptativa
4. **Portfolio Interactivo**: Proyectos con enlaces a casos de estudio
5. **Formulario de Contacto**: Integración con Web3Forms
6. **Optimización SEO**: Metadatos y estructura semántica
7. **Performance**: Carga rápida y optimizada
8. **Accesibilidad**: Compatible con lectores de pantalla

## 🌐 Idioma del Proyecto

El proyecto está **completamente traducido al español mexicano** con:
- ✅ **Lang attribute**: `es-MX` configurado en el HTML
- ✅ **Metadatos**: Descripción en español
- ✅ **Contenido principal**: Todos los textos traducidos
- ✅ **Servicios**: Títulos y descripciones en español
- ✅ **Portfolio**: Proyectos con descripciones en español
- ✅ **Navegación**: Botones y enlaces en español

## 📈 Estado del Proyecto

El proyecto está **completamente funcional** y listo para producción. Incluye:
- ✅ Todas las secciones implementadas
- ✅ Diseño responsivo completo
- ✅ Modo oscuro/claro
- ✅ Animaciones y microinteracciones
- ✅ Formulario de contacto funcional
- ✅ Optimización de performance
- ✅ SEO básico implementado
- ✅ **Idioma español mexicano** completamente implementado

Este portfolio representa una solución completa y profesional para mostrar habilidades, servicios y trabajos de Noeli Rodriguez, con un enfoque en la experiencia del usuario y la presentación profesional, completamente adaptado al mercado hispanohablante. 