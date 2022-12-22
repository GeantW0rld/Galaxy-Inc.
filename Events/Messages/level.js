const { Client, Message, EmbedBuilder } = require("discord.js")
const lvlDB = require("../../Models/Level")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        const { author, guild } = message
        if(!guild || author.bot) return
        lvlDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
            if (err) throw err
            if(!data) {
                lvlDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP:0,
                    Level: 0
                })
            }
        })

        const give = Math.floor(Math.random() * 29) + 1

        const data = await lvlDB.findOne({Guild: guild.id, User: author.id}).catch(err => {  })
        if(!data) return

        const requiredXP = data.Level * data.Level * 100 + 100

        if(data.XP + give >= requiredXP) {
            data.XP += give
            data.Level += 1
            await data.save()

            const embed = new EmbedBuilder()
            .setTitle(`🎉NEW LEVEL!🎉`)
            .setColor("Blue")
            .setDescription(`🎉**Congratulations**🎉, You've reached Level ${data.Level}`)
            .setTimestamp()

            
            const Channel = guild.channels.cache.get("")

            if(!Channel) return message.channel.send({content: `${message.author}`, embeds: [embed]})

            Channel.send({
                content: `${message.author}`,
                embeds: [embed]
            })
            
        } else {
            data.XP += give
            await data.save()
        }
    }
}