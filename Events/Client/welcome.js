const { Client, MessageContextMenuCommandInteraction, EmbedBuilder, InteractionType, Message, AttachmentBuilder, GuildMember, Embed } = require("discord.js")



module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async execute(member, client) {
        let channel = client.channels.cache.get("1035211987929542818")

        const Embed = new EmbedBuilder()
            .setTitle(member.user.tag + " joined the server")
            .setDescription(`Welcome ${member.user} to Galaxy Inc. community server`)
            .setAuthor({name: `Welcome`})
            .setColor("Blue")
            .setFooter({
                text: `Galaxy Inc. - Made by GeantWorld Inc`,
                iconURL: `${member.user.displayAvatarURL()}`
            })
            .setTimestamp(Date.now())

        await channel.send({embeds: [Embed]})
    }
}