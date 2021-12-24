// Import stuffs
const Discord = require("discord.js-self")
const axios = require("axios")

const util = require("./util")

// Buttons
const ButtonParser = require("./button/ButtonParser")
const HLHandler = require("./button/HLHandler")
const SearchHandler = require("./button/SearchHandler")
const ScratchHandler = require("./button/ScratchHandler")
const CrimeHandler = require("./button/CrimeHandler")

module.exports = class DankBot {
    constructor(config) {
        this.config = config

        // Vars
        this.timeSinceLastMessage = 0 // time since the last message from dank memer, in seconds
        this.roundCount = 0 // 'rounds', this is used for semi-regular breaks

        // Const
        this.DANK_MEMER_ID = "270904126974590976"
        this.MONEY_COMMS = ["se", "scratch"]
        this.BUTTON_COMMS = ["i just chose a secret number", "where do you want to search", "what crime do you want to commit", "you can scratch"]
        this.BUTTON_ACTIONS = [
            {
                f: HLHandler,
                multi: false
            },
            {
                f: SearchHandler,
                multi: false
            },
            {
                f: CrimeHandler,
                multi: false
            },
            {
                f: ScratchHandler,
                multi: true
            }
        ]

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
                    resolve()
                    this.loggedIn = true

                    this.channel = this.client.channels.cache.find(channel => channel.id === this.config.channelID)
                    this.client.on("message", msg => {
                        this.msgHandler(msg)
                    })
                })
            })
        })
    }

    setStatus(status) {
        this.client.user.setStatus(status)
    }

    // Message
    sendMessage(text) {
        try {
            if (this.channel !== null && this.channel !== undefined) {
                //text = util.superLowChanceBool() ? this.typo(text) : text
                this.channel.send(text)
                //this.lastMessageSent = new Date().getTime()
                //this.lastMessageWasMine = true
            }
        } catch (e) {
            util.log.error("Error sending message!")
        }
    }

    msgHandler(msg) {
        if (msg.author.id === this.DANK_MEMER_ID) {
            this.BUTTON_COMMS.forEach((comm, i) => {
                if (util.message.containsText(msg, comm)) {
                    this.getChannelMessage(msg.id)
                        .then(nmsg => {
                            const btn = this.BUTTON_ACTIONS[i].f(nmsg, ButtonParser(nmsg.components))
                            if (this.BUTTON_ACTIONS[i].multi) {
                                btn.forEach((b, i) => {
                                    setTimeout(() => {
                                        this.pressButton(nmsg, b.custom_id)
                                            .then(() => {
                                                util.log.success(`Scratched field #${i + 1}`)
                                            })
                                            .catch(() => {
                                                util.log.error("Error scratching!")
                                            })
                                    }, util.time.randomS(1, 3) * i)
                                })
                            } else {
                                this.pressButton(nmsg, btn.custom_id)
                                    .then(() => {
                                        util.log.success(`Pressed ${btn.label}`)
                                    })
                                    .catch(() => {
                                        util.log.error(`I wanted to press ${btn.label} but something went wrong...`)
                                    })
                            }
                        })
                }
            })
        }
    }


    // Direct API interactions
    getChannelMessage(id) {
        return new Promise((resolve, rej) => {
                axios.get("https://discord.com/api/v9/channels/" + this.config.channelID + "/messages?limit=10", {
                headers: {
                    "Authorization": this.config.token
                }
            }).then(res => {
                if (res.status === 200) {
                    res.data.forEach(msg => {
                        if (msg.id === id) {
                            resolve(msg)
                        }
                    })
                } else rej(null)
            }).catch(() => {
                rej(null)
            })
        })
    }

    pressButton(nmsg, btnID) {
        return new Promise((resolve, rej) => {
            const data = {
                "application_id": this.DANK_MEMER_ID,
                "channel_id": this.config.channelID,
                "data": {
                    "component_type": 2,
                    "custom_id": btnID
                },
                "guild_id": this.config.guildID,
                "message_flags": 0,
                "message_id": nmsg.id,
                "type": 3
            }
            setTimeout(() => {
                axios.post("https://discord.com/api/v9/interactions", data, {
                    headers: {
                        "Authorization": this.config.token
                    }
                })
                    .then(() => {
                        resolve()
                    })
                    .catch(() => {
                        rej()
                    })
            })
        })
    }

    // Round
    runRound() {
        let totalWait = 0
        Object.keys(this.config.roundOpt).forEach(command => {
            totalWait += util.time.randomS(2, 4)
            setTimeout(() => {
                this.sendMessage(`pls ${command} ${this.MONEY_COMMS.includes(command) ? "5000" : ""}`)
            }, totalWait)
        })
    }
}