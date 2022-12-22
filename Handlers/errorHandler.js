const { EmbedBuilder } = require("discord.js")

function Error(client) {
    const Embed = new EmbedBuilder()
        .setColor("Random")
        .setTimestamp()
        .setFooter({text: "Anti-crash by GeantWorld Inc."})
    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)

        const Channel = client.channels.cache.get("1034198782017024000")
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed.setDescription(`**unhandled Rejection/Catch:\n\n**${reason}`)
            ]
        })
    })

    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)

        const Channel = client.channels.cache.get(ChannelID)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed.setDescription(`**uncaught Exception/Catch:\n\n**${err}\n\n${origin.toString()}`)
            ]
        })
    })

    process.on("uncaughtExceptionMonitor", (err, origin) => {
       console.log(err, origin)

        const Channel = client.channels.cache.get(ChannelID)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed.setDescription(`**uncaught Exception/Catch (monitor):\n\n**${err}\n\n${origin.toString()}`)
            ]
        })
    })
}

module.exports = { Error }