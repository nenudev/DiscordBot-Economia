const path = require("path");

module.exports = (client) => {
    client.handleEvents = async (eventFiles, eventsPath) => {
        for (const file of eventFiles) {
            const eventPath = path.join(eventsPath, file);
            const event = require(eventPath);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
};