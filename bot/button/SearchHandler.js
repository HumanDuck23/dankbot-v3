const util = require("../util")
module.exports = function(msg, buttons) {
    // for now random, later on more focused on loot
    return util.random.arrElement(buttons)
}