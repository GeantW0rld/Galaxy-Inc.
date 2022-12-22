const { Client, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const lvlDB = require("../../Models/Level")
const Canvacord = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Get your level")
    .addUserOption(option => option.setName("user").setDescription("view user rank").setRequired(false)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false })

        const { user, guild } = interaction

        const Member = interaction.options.getUser("user") || user;
        const member = guild.members.cache.get(Member.id)

        const Data = await lvlDB.findOne({Guild: guild.id, User: member.id}).catch(err => {  })
        if (!Data) return interaction.editReply({content: `${member.user.tag} has not gained any XP`})


        const required = Data.Level * Data.Level * 100 + 100

        const rank = new Canvacord.Rank()
        .setAvatar(member.displayAvatarURL({ forceStatic: true }))
        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/798575041511948300/1035584790591717486/Galaxy_Level_1.png")
        .setCurrentXP(Data.XP)
        .setRequiredXP(required)
        .setRank(1, "Rank", false)
        .setStatus(member.presence.status)
        .setLevel(Data.Level, "Level")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)

        const Card = await rank.build().catch(err => console.log(err))

        const attachment = new AttachmentBuilder(Card, { name: "level.png" })

        const Embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${member.user.username}'s Level Card`)
        .setImage("attachment://level.png")
        .setFooter({text: `Level System | Made by GeantWorld Inc.`})

        await interaction.editReply({ embeds: [Embed], files: [attachment] })
    }
}