const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, userMention } = require("discord.js");

const Economy = require("../../services/economy.js");
const economy = new Economy();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addmoney")
    .setDescription("Agrega dinero a la cuenta de un usuario.")
    .addUserOption((option) =>
        option
        .setName("usuario")
        .setDescription("Usuario al que deseas agregarle dinero.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
        option
        .setName("cantidad")
        .setDescription("Cantidad de dinero que desea agregarle al usuario")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const user = interaction.options.getUser("usuario");
        const amount = interaction.options.getInteger("cantidad");

        if (isNaN(amount)) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("Por favor proporcione un numero valido.")
                    .setColor("Red"),
                ],
            });
        }

        const result = await economy.addBalance({
            userId: user.id,
            amount: amount,
        });

        if (!result.error) {
            const embed = new EmbedBuilder()
            .setAuthor({
                name: `${user.username}`,
                iconURL: `${user.displayAvatarURL()}`,
            })
            .setDescription(`Has añadido **${amount.toLocaleString('es-AR')}** a la cuenta de ${userMention(user.id)}`)
            .setColor("Blue");

            return interaction.reply({ embeds: [embed] });
        } else {
            if (result.type === "database-error") {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription("Error del sistema. Contacta un admin.")
                        .setColor("Red"),
                    ],
                    flags: 1 << 6
                });
            } else if (result.type === "invalid-amount") {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription("No puedes agregar dinero negativo o cero.")
                        .setColor("Red"),
                    ],
                    flags: 1 << 6
                });
            }
        }
    },
};