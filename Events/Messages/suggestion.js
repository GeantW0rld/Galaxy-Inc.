const { Client, Message, EmbedBuilder } = require("discord.js")
const ms = require("ms")
const DB = require("../../Models/suggest")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        if (message.author.bot) return
        const channel = message.guild.channels.cache.get("1038850516270202941")

        if (!channel) return console.log("No channel...")



        if (message.channel.id === channel.id) {
            const embed = new EmbedBuilder()
            .setTitle("Suggestion !")
            .setAuthor({name: message.author.tag + " sent a suggestion", iconURL: message.author.displayAvatarURL()})
            .setDescription(`Suggestion : ${message.content}`)
            .setColor("Blue")
            .addFields({name: "Status : Waiting", value: "⏳"})

            channel.send({embeds: [embed]}).then(m => {
                m.react("✅")
                m.react("❌")
                new DB({
                    message: m.id,
                    token: m.id,
                    suggestion: message.content,
                    user: message.author.username,
                    guild: message.guild.id,
                    replied: false
                }).save()
                ms("2s")
                message.delete()
            })
        }
        
        
    }
}