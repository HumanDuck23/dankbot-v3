module.exports = function(components) {
    /* Structure
    [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "...",                   <- this block is a button, big important
                    "custom_id": "..."
                }
            ]
        }
    ]
     */
    /*
    TYPES:
    1: Action Row
    2: Button
    3: Select Menu
    https://discord.com/developers/docs/interactions/message-components#component-object-component-types
     */
    const buttons = []
    function pc(c) {
        c.forEach(component => {
            if (component.type === 1) {
                pc(component.components)
            } else if (component.type === 2) {
                buttons.push(component)
            }
        })
    }

    pc(components)
    return buttons
}