const colors = require("colors")

const util = {
    log: {
        success(text) {
            this.message("success", text, colors.green, "bold")
        },
        info(text) {
            this.message("info", text, colors.cyan, "bold")
        },
        error(text) {
            this.message("error", text, colors.red, "bold")
        },
        warn(text) {
            this.message("warning", text, colors.yellow, "bold")
        },
        message(prefix, text, cf, style="") {
            if (style !== "")
                console.log(cf(`[${colors.white(prefix)}] ${text}`)[style])
            else
                console.log(cf(`[${colors.white(prefix)}] ${text}`))
        }
    },
    random: {
        int(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        bool() {
            return Math.random() >= 0.5
        },
        highChangeBool() {
            return Math.random() >= 0.2
        },
        lowChanceBool() {
            return Math.random() >= 0.8
        },
        arrElement(arr) {
            if (typeof arr === "object")
                return arr[Math.floor(Math.random() * arr.length)]
            else return null
        }
    },
    time: {
        randomS(min, max) {
            return util.random.int(min, max) * 1000
        },
        randomM(min, max) {
            return util.random.int(min, max) * 1000 * 60
        }
    },
    string: {
        countSubstr(str, subs) {
            return str.split(subs).length
        }
    },
    message: {
        containsText(msg, text) {
            if (msg.content.toLowerCase().includes(text)) return true
            for (let i = 0; i < msg.embeds.length; i++) {
                const embed = msg.embeds[i]
                if (embed.description !== undefined && embed.description.toLowerCase().includes(text)) {
                    return true
                }
            }
            return false
        }
    }
}

module.exports = util