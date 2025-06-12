const mongoose = require("mongoose");

async function connectToMongo(mongoURL) {

    if(!mongoURL || typeof mongoURL !== "string" || !mongoURL.startsWith("mongodb")) {
        throw new TypeError("Cadena de conexion MongoDB no valida.");
    }

    try {
        await mongoose.connect(mongoURL);
        console.log("[MongoDB] Conectado exitosamente.\n");
    } catch (error) {
        console.error("[MongoDB] Error de conexión:", error.message, "\n");
        throw error;
    }
}

module.exports = connectToMongo;
