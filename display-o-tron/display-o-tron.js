const JVSDisplayOTron = require('jvsdisplayotron')

module.exports = function(RED) {
    function DisplayOTronNode(config) {
        const dothat = new JVSDisplayOTron.DOTHAT()
        dothat.lcd.setContrast(45);
        RED.nodes.createNode(this, config)
        const node = this;
        
        this.on('input', function(msg) {
            const label = String(msg.payload.label)
            dothat.lcd.write(label);
            node.log(label)
        })
    }
    RED.nodes.registerType("display-o-tron", DisplayOTronNode)
}