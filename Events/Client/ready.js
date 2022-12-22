const { Client, ActivityType } = require("discord.js")
const mongoose = require('mongoose')
const mongoURL = process.env.mongoURL
const ms = require("ms")

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log(`${client.user.tag} est en ligne avec succès et pas d'erreur`)

        setInterval(() => {

            client.user.setActivity({
                name: `My ping: ${client.ws.ping} ms`,
                type: 3
            })
        }, ms("5s"));

        if (!mongoURL) return
        mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        }).then(() => {
            console.log("La database est connecter avec succès")
        }).catch(err => console.log("une erreur s'est produit : \n" + err))
    }
}