const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        try {
            const command = client.commands.get(interaction.commandName);

            if(!command) return;

            await command.execute(interaction, client);
        } catch (error) {
            console.error("Error al ejecutar el comando:", error);

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("Hubo un error al ejecutar este comando!")
                    .setColor("Red")
                ],
                flags: 1 << 6,
            });
        }
    }
};