const util = require("../util")
module.exports = function(msg, buttons) {
    let hint = -1;

    for (let i = 0; i < msg.embeds.length; i++) {
        const embed = msg.embeds[i]
        if (embed.description !== undefined && embed.description.includes("a secret number")) {
            const r = /I just chose a secret number between 1 and 100\.\nIs the secret number \*higher\* or \*lower\* than \*\*(.+)\*\*\./
            if (r.exec(embed.description) !== null) {
                hint = parseInt(r.exec(embed.description)[1])
            }
        }
    }

    if (hint <= 38) return buttons[2]
    if (hint > 38 && hint < 62) return util.random.arrElement(buttons)
    if (hint >= 62) return buttons[0]
}