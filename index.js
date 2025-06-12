require("dotenv").config();

const { loadFunctions, loadEvents, loadCommands } = require("./src/utils/loadHandlers.js");

const connectToMongo = require("./mongo.js");

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

(async () => { 
    loadFunctions(client);
    loadEvents(client);
    loadCommands(client);

    try {
        await connectToMongo(process.env.MONGODB_URL);
    } catch (error) {
        console.error("Error al conectar a la base de datos.", error);
    }
    
    try {
        await client.login(process.env.token);
    } catch (error) {
        console.error("Error al iniciar sesion del bot", error);
    }
})();






