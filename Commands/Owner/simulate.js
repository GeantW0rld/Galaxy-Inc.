const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("simulate")
    .setDescription("simulate a event")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => 
        option.setName("options")
        .setDescription("choice a options")
        .addChoices(
            {
                name: "join",
                value: "join"
            },
            {
                name : "leave",
                value: "leave"
            }
        )
        .setRequired(true)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true})

        const { options, user, member } = interaction


        const Options = options.getString("options")

        if (user.id !== "689466766916714532") return interaction.editReply("This command is Classified!")

        switch (Options) {
            case "join": {
                interaction.editReply("Simulated join Event")

                client.emit("guildMemberAdd", member)
            }
                break;
            
            case "leave": {
                interaction.editReply("Simulatede leave Event")

                client.emit("guildMemberRemove", member)
            }
        }
    }
}