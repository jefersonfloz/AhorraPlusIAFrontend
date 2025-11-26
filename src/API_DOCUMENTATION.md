# API Documentation - FinanceApp

## Configuración Base

La aplicación está configurada para conectarse a un backend REST API. Por defecto, la URL base es `http://localhost:3000/api`.

Para cambiar la URL del backend, crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://tu-backend.com/api
```

## Autenticación

Todas las peticiones autenticadas incluyen el token JWT en el header:
```
Authorization: Bearer {token}
```

El token se guarda automáticamente en `localStorage` después del login y se elimina al hacer logout.

## Endpoints Disponibles

### Autenticación (`/auth`)

#### POST `/auth/login`
Login de usuario
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Respuesta:
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

#### POST `/auth/admin/login`
Login de administrador (mismo formato que login normal)

#### POST `/auth/register`
Registro de nuevo usuario
```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/auth/me`
Obtener usuario actual (requiere autenticación)

#### POST `/auth/refresh`
Refrescar token JWT

#### POST `/auth/password-reset/request`
Solicitar reseteo de contraseña
```json
{
  "email": "user@example.com"
}
```

### Ingresos (`/incomes`)

#### GET `/incomes`
Obtener todos los ingresos del usuario

#### POST `/incomes`
Crear nuevo ingreso
```json
{
  "source": "Salario",
  "amount": 3000,
  "frequency": "Mensual",
  "date": "2025-11-25"
}
```

#### PUT `/incomes/:id`
Actualizar ingreso

#### DELETE `/incomes/:id`
Eliminar ingreso

### Gastos (`/expenses`)

#### GET `/expenses`
Obtener todos los gastos del usuario

#### POST `/expenses`
Crear nuevo gasto
```json
{
  "category": "Alimentación",
  "amount": 150,
  "description": "Supermercado",
  "date": "2025-11-25"
}
```

#### PUT `/expenses/:id`
Actualizar gasto

#### DELETE `/expenses/:id`
Eliminar gasto

### Transacciones (`/transactions`)

#### GET `/transactions`
Obtener todas las transacciones (ingresos + gastos)

#### GET `/transactions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Filtrar transacciones por rango de fechas

### Metas de Ahorro (`/savings-goals`)

#### GET `/savings-goals`
Obtener todas las metas de ahorro

#### POST `/savings-goals`
Crear nueva meta
```json
{
  "name": "Vacaciones",
  "targetAmount": 5000,
  "deadline": "2026-06-01",
  "icon": "✈️",
  "color": "blue"
}
```

#### PUT `/savings-goals/:id`
Actualizar meta de ahorro

#### DELETE `/savings-goals/:id`
Eliminar meta de ahorro

#### POST `/savings-goals/:id/add`
Agregar dinero a la meta
```json
{
  "amount": 500
}
```

#### POST `/savings-goals/:id/withdraw`
Retirar dinero de la meta
```json
{
  "amount": 200
}
```

### Dashboard (`/dashboard`)

#### GET `/dashboard/stats`
Obtener estadísticas del dashboard
```json
{
  "totalBalance": 15000,
  "monthlyIncome": 5000,
  "monthlyExpenses": 3000,
  "savingsGoals": 3,
  "incomeChange": 5.2,
  "expenseChange": -2.1
}
```

#### GET `/dashboard/chart/monthly`
Datos para gráficas mensuales

#### GET `/dashboard/chart/categories`
Desglose por categorías

#### GET `/dashboard/transactions/recent?limit=5`
Transacciones recientes

#### GET `/dashboard/summary?period=month`
Resumen financiero (period: week, month, year)

### Soporte (`/support`)

#### GET `/support/tickets`
Obtener tickets del usuario

#### GET `/support/tickets/:id`
Obtener ticket específico

#### POST `/support/tickets`
Crear nuevo ticket
```json
{
  "type": "Técnico",
  "subject": "Error al exportar",
  "description": "Descripción detallada del problema"
}
```

#### POST `/support/tickets/:id/responses`
Agregar respuesta a ticket
```json
{
  "message": "Mensaje de respuesta"
}
```

#### PATCH `/support/tickets/:id/status`
Actualizar estado del ticket
```json
{
  "status": "Resuelto"
}
```

### Reportes (`/reports`)

#### GET `/reports/:type?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Obtener reporte (type: income, expense, savings, full)

#### GET `/reports/export/pdf?type=full&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Exportar reporte a PDF (devuelve Blob)

#### GET `/reports/export/excel?type=full&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Exportar reporte a Excel (devuelve Blob)

#### GET `/reports/trends?period=month`
Tendencias financieras

#### GET `/reports/categories/:type?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Análisis por categorías (type: income, expense)

### Recomendaciones (`/recommendations`)

#### GET `/recommendations`
Obtener recomendaciones personalizadas

#### GET `/recommendations?type=savings`
Filtrar por tipo de recomendación

#### PATCH `/recommendations/:id/read`
Marcar recomendación como leída

#### DELETE `/recommendations/:id`
Descartar recomendación

#### GET `/recommendations/ai-insights`
Obtener insights generados por IA

#### GET `/recommendations/budget-suggestions`
Obtener sugerencias de presupuesto

### Usuario (`/user`)

#### GET `/user/profile`
Obtener perfil del usuario

#### PUT `/user/profile`
Actualizar perfil
```json
{
  "name": "John Doe",
  "email": "newemail@example.com",
  "phone": "+1234567890",
  "currency": "USD"
}
```

#### POST `/user/change-password`
Cambiar contraseña
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

#### GET `/user/notifications`
Obtener preferencias de notificaciones

#### PUT `/user/notifications`
Actualizar preferencias de notificaciones
```json
{
  "email": true,
  "push": true,
  "transactionAlerts": true,
  "goalAlerts": true,
  "weeklyReport": false
}
```

#### PUT `/user/privacy`
Actualizar configuración de privacidad

#### POST `/user/delete-account`
Eliminar cuenta (requiere password)

#### POST `/user/profile-picture`
Subir foto de perfil (multipart/form-data)

### Admin - Dashboard (`/admin`)

#### GET `/admin/stats`
Estadísticas generales del sistema

#### GET `/admin/charts/:chartType`
Datos de gráficas (userGrowth, ticketsByType, activity, etc.)

#### GET `/admin/activity?limit=10`
Actividad reciente del sistema

### Admin - Usuarios (`/admin/users`)

#### GET `/admin/users?page=1&limit=50`
Listar todos los usuarios (paginado)

#### GET `/admin/users/:userId`
Obtener usuario específico

#### PATCH `/admin/users/:userId/status`
Cambiar estado del usuario
```json
{
  "status": "Activo" | "Inactivo" | "Suspendido"
}
```

#### PATCH `/admin/users/:userId/plan`
Cambiar plan del usuario
```json
{
  "plan": "Free" | "Premium" | "Enterprise"
}
```

#### DELETE `/admin/users/:userId`
Eliminar usuario

### Admin - Soporte (`/admin/tickets`)

#### GET `/admin/tickets?status=Pendiente&priority=Alta&page=1&limit=20`
Listar todos los tickets (filtros opcionales)

#### GET `/admin/tickets/:ticketId`
Obtener ticket específico

#### POST `/admin/tickets/:ticketId/respond`
Responder a ticket
```json
{
  "message": "Respuesta del administrador"
}
```

#### PATCH `/admin/tickets/:ticketId/status`
Cambiar estado del ticket

#### PATCH `/admin/tickets/:ticketId/priority`
Cambiar prioridad del ticket

### Admin - Analíticas (`/admin/analytics`)

#### GET `/admin/analytics/:metric?period=month`
Obtener métricas analíticas

### Admin - Configuración (`/admin/settings`)

#### GET `/admin/settings`
Obtener configuración del sistema

#### PUT `/admin/settings`
Actualizar configuración del sistema

#### POST `/admin/backup`
Realizar backup de la base de datos

## Formato de Respuestas

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { ... }
}
```

### Respuesta con Paginación
```json
{
  "data": [ ... ],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Notas Importantes

1. Todas las fechas deben estar en formato ISO 8601: `YYYY-MM-DD` o `YYYY-MM-DDTHH:mm:ss.sssZ`
2. Los montos deben ser números (pueden incluir decimales)
3. El token JWT expira después de cierto tiempo (configurable en backend)
4. Las rutas `/admin/*` solo son accesibles para usuarios con rol `admin`
5. Todas las peticiones deben incluir el header `Content-Type: application/json` excepto uploads de archivos
