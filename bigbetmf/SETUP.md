# 🛠️ SETUP - BigBet.MF

## Requisitos Previos
- Node.js >= 16
- MongoDB >= 5.0 (local o MongoDB Atlas)
- npm o yarn
- Docker & Docker Compose (opcional)

---

## ⚡ Opción 1: Docker Compose (Más Fácil)

```bash
# Clonar / descomprimir el proyecto
cd bigbet.mf

# Levantar todos los servicios
docker-compose up --build

# Acceder a:
# Frontend → http://localhost:5173
# Backend  → http://localhost:5000
# MongoDB  → mongodb://localhost:27017
```

---

## 🔧 Opción 2: Instalación Manual

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita el archivo `.env` y configura:
- `MONGODB_URI` → tu conexión a MongoDB
- `JWT_SECRET` → una clave secreta segura

```bash
npm run dev
# Servidor corriendo en http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# App corriendo en http://localhost:5173
```

---

## 🌐 Variables de Entorno (Backend)

| Variable         | Descripción                     | Ejemplo                                      |
|------------------|---------------------------------|----------------------------------------------|
| MONGODB_URI      | URI de conexión a MongoDB       | mongodb://localhost:27017/bigbet-mf          |
| JWT_SECRET       | Clave secreta para JWT          | mi_clave_super_secreta                       |
| PORT             | Puerto del servidor             | 5000                                         |
| NODE_ENV         | Entorno de ejecución            | development                                  |
| CORS_ORIGIN      | Origen permitido para CORS      | http://localhost:5173                        |
| WELCOME_BONUS    | Bonus de bienvenida en USD      | 10                                           |

---

## 👤 Usuario de Prueba

```
Email:      demo@bigbet.mf
Contraseña: Demo123!@
```

---

## 📁 Estructura del Proyecto

```
bigbet.mf/
├── backend/          → API REST con Express + TypeScript
├── frontend/         → UI con React + Tailwind + Vite
├── docker-compose.yml
├── README.md
└── SETUP.md
```

---

## 🆘 Solución de Problemas

**Error: Cannot connect to MongoDB**
- Asegúrate de que MongoDB esté corriendo localmente
- O actualiza `MONGODB_URI` en `.env` con tu cadena de conexión de Atlas

**Error: Port already in use**
- Cambia el `PORT` en `.env` del backend
- O actualiza `server.port` en `vite.config.ts` del frontend

**Error: CORS**
- Asegúrate de que `CORS_ORIGIN` en el backend coincida con la URL del frontend
