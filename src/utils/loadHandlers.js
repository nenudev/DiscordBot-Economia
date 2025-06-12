const fs = require("fs");
const path = require("path");

function getEntries(dir, type) {
    const fullPath = path.join(__dirname, dir);
    return fs.readdirSync(fullPath).filter(entry => {
        const entryPath = path.join(fullPath, entry);

        if( type === 'files') {
            return fs.statSync(entryPath).isFile() && entry.endsWith('.js');
        }
        if (type === 'folders') {
            return fs.statSync(entryPath).isDirectory();
        }
        return false;
    });
}

function loadFunctions(client) {
    const functions = getEntries('../functions', 'files');
    for (const file of functions) {
        require(path.join(__dirname, '../functions/', file))(client);
    }
}

function loadEvents(client) {
    const eventFiles = getEntries('../events/', 'files');
    const eventsPath = path.join(__dirname, '../events/');
    client.handleEvents(eventFiles, eventsPath);
}

function loadCommands(client) {
    const commandFolders = getEntries('../commands', 'folders');
    const commandFilesRoot = getEntries('../commands', 'files');
    const commandsPath = path.join(__dirname, '../commands');

    console.log("📂 Carpetas de comandos detectadas:", commandFolders.length > 0 ? commandFolders : "Ninguna");
    console.log("📂 Archivos Raiz de comandos detectados:", commandFilesRoot.length > 0 ? commandFilesRoot : "Ninguno", '\n');

    client.handleCommands(commandFolders, commandFilesRoot, commandsPath);
}

module.exports = { loadFunctions, loadEvents, loadCommands };