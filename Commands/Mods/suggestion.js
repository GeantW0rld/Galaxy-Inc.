const { Client, ChatInputCommandInteraction, EmbedBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const DB = require("../../Models/suggest")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggestion-mod")
    .setDescription("suggestions systems")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand(subcommand => subcommand.setName("accept").setDescription("accept a suggestion").addStringOption(option => option.setName("message-id").setDescription("message id").setRequired(true)))
    .addSubcommand(subcommand => subcommand.setName("denied").setDescription("denied a suggestion").addStringOption(option => option.setName("message-id").setDescription("message id").setRequired(true))),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options, guild } = interaction

        const sub = options.getSubcommand(["accept", "denied"])
        const id = options.getString("message-id")

        switch (sub) {
            case "accept":
                DB.findOne({
                    token: id
                }, async (err, data) => {
                    if (!data) return interaction.reply({content: `${id} : data no found ! please try again`, ephemeral: true})
                    const guild = data.guild
                    const message = data.message
                    const suggestion = data.suggestion
                    const user = data.user
                    if (data) {
                        const gchannel = interaction.guild.channels.cache.get("1038850516270202941")
                        if(!gchannel) return interaction.reply({content: "Couldn't find suggestion channel please make a new one"})
                        if (gchannel) {
                            const modal = new ModalBuilder()
                            .setTitle("Suggestions Panel")
                            .setCustomId("accept-modal")
                            .setComponents(
                                new ActionRowBuilder().setComponents(
                                    new TextInputBuilder()
                                    .setLabel("Reason for accepting the suggestion !")
                                    .setCustomId("reason-accept")
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                                )
                            )

                            interaction.showModal(modal)
                        }

                        client.on('interactionCreate', async (interaction) => {
                            if (interaction.isModalSubmit()) {
                                if (interaction.customId === "accept-modal") {
                                    if (data.replied == true) {
                                        return interaction.reply({content: "this suggestion has already replied", ephemeral: true})
                                    } else {
                                        const embed = new EmbedBuilder()
                                        .setTitle("Suggestion Accepted")
                                        .setAuthor({name: interaction.user.tag + " accepted the suggestion", iconURL: interaction.user.displayAvatarURL()})
                                        .setDescription(`Suggestion : ${suggestion}`)
                                        .setColor("Green")
                                        .addFields({name: "Status : Accepted", value: interaction.fields.getTextInputValue("reason-accept")})
                                        .setFooter({text: `suggestion sent by ${user}`})
        
                                        gchannel.messages.fetch(message).then(editm => {
                                            editm.edit({
                                                embeds: [embed]
                                            })
                                        })
    
    
                                        await DB.updateOne({message: message}, {replied: true})
    
                                        await interaction.reply({content: "Success", ephemeral: true})
                                    }
                                }
                            }
                        })
                    }
                })
                break;
            case "denied":
                DB.findOne({
                    token: id
                }, async (err, data) => {
                    if (!data) return interaction.reply({content: `${id} : data no found ! please try again`, ephemeral: true})
                    const guild = data.guild
                    const message = data.message
                    const suggestion = data.suggestion
                    const user = data.user
                    if (data) {
                        const gchannel = interaction.guild.channels.cache.get("1038850516270202941")
                        if(!gchannel) return interaction.reply({content: "Couldn't find suggestion channel please make a new one"})
                        if (gchannel) {
                            const modal = new ModalBuilder()
                            .setTitle("Suggestions Panel")
                            .setCustomId("deny-modal")
                            .setComponents(
                                new ActionRowBuilder().setComponents(
                                    new TextInputBuilder()
                                    .setLabel("Reason for denied the suggestion !")
                                    .setCustomId("reason-deny")
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                                )
                            )

                            interaction.showModal(modal)
                        }

                        client.on('interactionCreate', async (interaction) => {
                            if (interaction.isModalSubmit()) {
                                if (interaction.customId === "deny-modal") {

                                    if (data.replied == true) {
                                        return interaction.reply({content: "this suggestion has already replied", ephemeral: true})
                                    } else {
                                        const embed = new EmbedBuilder()
                                        .setTitle("Suggestion denied")
                                        .setAuthor({name: interaction.user.tag + " denied the suggestion", iconURL: interaction.user.displayAvatarURL()})
                                        .setDescription(`Suggestion : ${suggestion}`)
                                        .setColor("Red")
                                        .addFields({name: "Status : denied", value: interaction.fields.getTextInputValue("reason-deny")})
                                        .setFooter({text: `suggestion sent by ${user}`})
        
                                        gchannel.messages.fetch(message).then(editm => {
                                            editm.edit({
                                                embeds: [embed]
                                            })
                                        })
    
    
                                        await DB.updateOne({message: message}, {replied: true})
    
                                        await interaction.reply({content: "Success", ephemeral: true})
                                    }
                                }
                            }
                        })
                    }
                })
                break;
        }


    }
}