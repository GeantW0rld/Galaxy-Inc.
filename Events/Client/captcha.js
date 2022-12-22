const { Client, MessageContextMenuCommandInteraction, EmbedBuilder, InteractionType, Message, AttachmentBuilder, GuildMember } = require("discord.js")
const ms = require("ms")
const { Captcha } = require("captcha-canvas")

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async execute (member, client) {
        const captcha = new Captcha()

        captcha.async = true
        captcha.addDecoy()
        captcha.drawTrace()
        captcha.drawCaptcha()

        const channel = member.guild.channels.cache.get("1035165059451736126")
        let msg = channel.send({content: `<@${member.user.id}> please complet the captcha (**PUT ONLY GREEN CARACTERS**)`, files: [new AttachmentBuilder(await captcha.png, {name: `captcha.png`})]})
        try {
            let filter = m => m.author.id == member.user.id

            let response = (await channel.awaitMessages({filter, max: 1, time: 1000 * 120, errors: ["time"]})).first()

            if (response.content === captcha.text) {
                try {await member.user.send("You are now verified !")} catch (err) {}
                await member.roles.add('1034189271491416095')
            } else {
                try {await member.user.send("You are been kicked for the reason : Failed to the captcha")} catch (err) {}
                await member.kick("Captcha Failed")
            }
        } catch (error) {
            try {await member.user.send("You are been kicked for the reason : no response to the captcha")} catch (err) {}
            await member.kick("Captcha Failed")
        }
    }
}