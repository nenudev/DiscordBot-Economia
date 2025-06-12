### 💰 Bot de Economía para Discord – con discord.js, MongoDB y Mongoose

Este proyecto es un **bot de Discord** desarrollado en **Node.js** usando **discord.js v14**, pensado para implementar un **sistema económico básico**, ideal como base para bots más avanzados.

En este primer módulo, se implementa el comando `/balance`, que permite consultar el saldo de un usuario utilizando una base de datos **MongoDB**, integrada con el ODM **Mongoose** para una gestión eficiente y escalable.

---

### 🧠 ¿Qué incluye este episodio?

- Comando `/balance` con soporte para opción de usuario.
- Estructura de archivos limpia y modular (servicios, modelos, comandos).
- Persistencia de datos con MongoDB usando Mongoose.
- Manejo de errores en la base de datos.
- Uso de Slash Commands con Discord.js v14.

---

### ⚙️ Requisitos

1. **Node.js** instalado 
2. Cuenta en **MongoDB Atlas** (o MongoDB local)
3. Crear una aplicación en el **Discord Developer Portal**

---

### 🛠️ Instalación

1. Inicia tu proyecto e instala las dependencias:

```bash
npm init -y
npm install discord.js mongoose dotenv fs path
```

2. Crea un archivo .env con tus credenciales:

```bash
token=TU_TOKEN_DEL_BOT
clientId=TU_CLIENT_ID
MONGODB_URL=TU_URL_DE_MONGODB
```
# 👨‍💻 Desarrollado por **NenuDev**
