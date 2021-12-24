const util = require("../util")
module.exports = function(msg, buttons) {
    // for now random, later on more focused on loot
    let i = []
    function e(id) {
        for (let j = 0; j < i.length; j++) {
            if (i[j].custom_id === id) return true
        }
        return false
    }
    let x = 0;
    while (x<3) {
        const b = util.random.arrElement(buttons)
        if (!e(b.custom_id)) {
            i.push(b)
            x++
        }
    }
    return i
}