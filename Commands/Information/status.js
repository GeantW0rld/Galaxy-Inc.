const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js") 
const { connection } = require("mongoose")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Get status"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const msg = await interaction.deferReply({fetchReply: true})

        const embed = new EmbedBuilder()
        .setTitle("Bot stats")
        .setDescription("here is my stats")
        .addFields(
            {
                name: "Discord API Latency",
                value: `${client.ws.ping} ms`,
                inline: true
            },
            {
                name: "BOT latency",
                value: `${msg.createdTimestamp - interaction.createdTimestamp} ms`,
                inline: true
            },
        )
        .addFields(
            {
                name: "Database",
                value: `\`${switchTo(connection.readyState)}\``,
                inline: true,
            },
            {
                name: "uptime",
                value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                inline: true
            }
        )
        .setColor("Blue")


        function switchTo(val) {
            var status = " ";
            switch(val) {
                case 0: status = `🔴 Disconnected`
                break;
                case 1: status = `🟢 Connected`
                break;
                case 2: status = `🟠 CConnecting`
                break;
                case 3: status = `🟣 Déconnexion en cours`
                break;
            }
            return status
        }

        interaction.editReply({embeds: [embed]})
    }
}