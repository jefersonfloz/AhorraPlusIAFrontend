# Sistema de Gestión Financiera Estudiantil - Frontend

Aplicación web desarrollada con React y TypeScript para la administración de finanzas personales orientada a estudiantes universitarios. Permite gestionar ingresos, gastos, metas de ahorro, visualizar reportes y recibir recomendaciones financieras inteligentes.

## Descripción

El frontend proporciona una interfaz moderna e intuitiva para interactuar con los servicios del sistema. Consume la API REST del backend y presenta la información financiera mediante paneles, formularios y gráficos interactivos.

## Características Principales

### Gestión Financiera

* Registro de ingresos.
* Registro de gastos.
* Edición y eliminación de movimientos.
* Visualización de balances.

### Metas de Ahorro

* Creación de metas financieras.
* Seguimiento visual del progreso.
* Indicadores de cumplimiento.

### Reportes y Estadísticas

* Gráficos financieros.
* Resúmenes mensuales.
* Comparación de ingresos y gastos.
* Visualización de tendencias.

### Recomendaciones Inteligentes

* Visualización de recomendaciones generadas por IA.
* Consejos personalizados según hábitos financieros.
* Información para mejorar el ahorro.

### Soporte

* Registro de incidencias.
* Consulta de solicitudes enviadas.

## Tecnologías Utilizadas

### Frontend

* React
* TypeScript
* React Router
* Axios
* Chart.js
* React Hook Form

### Diseño e Interfaz

* Tailwind CSS
* Material UI

## Funcionalidades de la Interfaz

### Dashboard

* Balance general.
* Resumen financiero.
* Metas activas.
* Recomendaciones recientes.

### Gestión de Movimientos

* Formularios de registro.
* Filtros de búsqueda.
* Historial de transacciones.

### Reportes

* Gráficos dinámicos.
* Estadísticas financieras.
* Exportación de información.

## Arquitectura

```text
Pages
   ↓
Components
   ↓
Services
   ↓
Axios
   ↓
API REST
```

## Estructura del Proyecto

```text
src
├── assets
├── components
├── pages
├── routes
├── services
├── hooks
├── context
├── types
└── utils
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

## Construcción para Producción

```bash
npm run build
```

## Variables de Entorno

```env
VITE_API_URL=http://localhost:8080/api
```

## Repositorio Backend

El backend del proyecto se encuentra en:

https://github.com/jefersonfloz/AhorraPlusIA
