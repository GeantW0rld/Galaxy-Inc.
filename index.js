const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials
const express = require("express")
const app = express()
const ms = require("ms")
const { loadEvents } = require("./Handlers/eventHandler")
const { loadCommands }  = require("./Handlers/commandHandler")
const { Error } = require("./Handlers/errorHandler")
require("dotenv").config()

const client = new Client({
  intents: 131071,
  partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
  allowedMentions: { parse: ["everyone", "roles", "users"] },
  rest: { timeout: ms("1m") }
})

 // express
 app.get('/', (req, res) => {
    res.send('EtariadBot is online')
  })


app.listen(3000)

client.commands = new Collection()

client.login(process.env.token).then(() => {
    loadEvents(client)
    loadCommands(client)
    Error(client)
})