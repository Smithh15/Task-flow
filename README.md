# Task Flow

**Task Flow** es un gestor de tareas full stack que permite crear, editar, eliminar y administrar tareas por usuario, con autenticación y control de sesiones.

---

##  Tecnologías utilizadas

###  Frontend
- React + Vite
- TailwindCSS
- Axios
- React Router DOM

### Backend
- Node.js + Express
- MySQL (con conexión mediante mysql2/promise)
- JWT (autenticación segura)
- Bcrypt (encriptación de contraseñas)
- Nodemailer (recuperación de contraseña)

---

## 🧩 Estructura del proyecto
Task_flow/
│
├── client/ # Frontend (React)
│ ├── src/
│ │ ├── pages/ # Login, Register, Recover, etc.
│ │ ├── components/ # Toasts, botones, layouts...
│ │ └── utils/ # Axios config, rutas protegidas
│
├── server/ # Backend (Express + MySQL)
│ ├── controllers/ # Lógica de usuarios y tareas
│ ├── routes/ # Endpoints de API REST
│ └── config/ # Conexión DB y variables
│
├── .gitignore
├── README.md
└── package.json

## Instalación local

### Clona el repositorio
```bash
git clone https://github.com/Smithh15/task-flow.git

Instala dependencias

Frontend:
cd client
npm install

Backend:
cd ../server
npm install

Ejecutar en desarrollo

Frontend:
npm start

Backend:
npm run dev

Despliegue

Frontend recomendado: Vercel

Backend recomendado: Render

Base de datos: Railway o PlanetScale

Autor
Smith
Proyecto personal de práctica y portafolio.
💼 GitHub: @Smith
https://github.com/Smithh15

Estado del proyecto
✅ Login y registro funcional
✅ CRUD de tareas con usuario autenticado
🚧 Recuperación de contraseña - en proceso
✅ Modo oscuro / claro
🚧 Pronto: recordatorios y notificaciones inteligentes