// Import stuffs
const Discord = require("discord.js-self")
const axios = require("axios")

const util = require("./util")
const utils = require("./util");

module.exports = class DankBot {
    constructor(config) {
        this.config = config

        // Vars
        this.timeSinceLastMessage = 0; // time since the last message from dank memer, in seconds
        this.roundCount = 0; // 'rounds', this is used for semi-regular breaks

        // Const
        this.DANK_MEMER_ID = "270904126974590976"

        // Client
        this.client = new Discord.Client()
        this.active = false
        this.loggedIn = false
        this.channel = null // channel to send messages
    }

    login() {
        return new Promise((resolve, reject) => {
            this.client.login(this.config.token).then(() => {
                util.log.info(`Logging in as ${this.client.user.username}#${this.client.user.discriminator}`)
                this.client.on("ready", () => {
                    util.log.success("Logged in!")
                    this.loggedIn = true

                    this.channel = this.client.channels.cache.find(channel => channel.id === this.config.channelID)
                    this.client.on("message", msg => {
                        this.msgHandler(msg)
                    })
                })
            })
        })
    }

    msgHandler(msg) {
        if (msg.author.id === this.DANK_MEMER_ID) {

        }
    }
}