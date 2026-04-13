# 🎰 BigBet.MF - Plataforma de Apuestas Profesional

Una plataforma moderna, segura y escalable para apuestas deportivas en línea.

## 🚀 Características

- ✅ Registro y autenticación de usuarios con JWT
- ✅ Sistema de billetera digital con transacciones
- ✅ Colocación de apuestas en tiempo real
- ✅ Múltiples tipos de apuestas (Moneyline, Spread, Over/Under, Parlays)
- ✅ Historial completo de apuestas
- ✅ Dashboard interactivo con estadísticas
- ✅ Gestión de transacciones y retiros
- ✅ Interfaz responsiva (Web y Mobile)
- ✅ Base de datos MongoDB
- ✅ API RESTful con Express
- ✅ Frontend moderno con React

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router v6
- Axios
- Zustand (State Management)
- Vite
- Lucide Icons

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (Hashing)
- CORS

## 📋 Requisitos Previos

- Node.js >= 16
- MongoDB >= 5.0 (o usar MongoDB Atlas)
- npm o yarn

## ⚙️ Instalación Rápida

### Opción 1: Con Docker Compose (Recomendado)
```bash
docker-compose up
```

### Opción 2: Manual

**Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus variables
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs de Acceso

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017
- Swagger Docs: http://localhost:5000/api-docs (próximamente)

## 📚 API Endpoints

**Autenticación**
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario

**Apuestas**
- `POST /api/bets/place` - Colocar apuesta
- `GET /api/bets/history/:userId` - Historial de apuestas
- `GET /api/bets/:betId` - Detalles de apuesta
- `PUT /api/bets/:betId/settle` - Resolver apuesta
- `DELETE /api/bets/:betId` - Cancelar apuesta

**Billetera**
- `GET /api/wallet/balance/:userId` - Obtener balance
- `POST /api/wallet/deposit` - Realizar depósito
- `POST /api/wallet/withdraw` - Realizar retiro
- `GET /api/wallet/transactions/:userId` - Historial de transacciones

## 👤 Usuarios de Prueba

```
Email: demo@bigbet.mf
Contraseña: Demo123!@
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- JWT para autenticación
- CORS configurado
- Variables de entorno protegidas
- Validación de datos en backend

## 📝 Licencia

MIT

## 👨‍💻 Autor

Melvis Fermín - melvisfermin
