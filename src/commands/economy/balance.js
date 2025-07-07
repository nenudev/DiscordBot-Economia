const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const Economy = require("../../services/economy.js");
const economy = new Economy();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Consulta el saldo de tu cuenta.")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario al que deseas ver su balance")
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser("usuario") || interaction.user;

        const result = await economy.getBalance({
            userId: user.id,
        });

        if (!result.error) {
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .addFields({
                name: `**Dinero:**`,
                value: `${result.balance.toLocaleString('es-AR')}`,
            })
            .setAuthor({
                name: `${user.username}`,
                iconURL: `${user.displayAvatarURL()}`,
            });

            return interaction.reply({ embeds: [embed] });
        } else {
            if (result.type === "database-error") {
            
                const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("Error grave del sistema. Contacta a un staff.");
                    
                return interaction.reply({ embeds: [embed], flags: 1 << 6 });
            
            }
        }
    },
};
