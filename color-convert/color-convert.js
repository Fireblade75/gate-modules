module.exports = function(RED) {
    function ColorConvertNode(config) {
        RED.nodes.createNode(this, config)
        const node = this;
        
        this.on('input', function(msg) {
            const color = (String(msg.payload.color)).toLowerCase() 
            node.log(color)
            switch(color) {
                case 'red': 
                    node.send({payload: {
                        red: 255,
                        green: 0,
                        blue: 0
                    }})
                    break;
                case 'green': 
                    node.send({payload: {
                        red: 0,
                        green: 255,
                        blue: 0
                    }})
                    break;
                case 'blue': 
                    node.send({payload: {
                        red: 0,
                        green: 0,
                        blue: 255
                    }})
                    break;
                case 'yellow': 
                    node.send({payload: {
                        red: 255,
                        green: 255,
                        blue: 0
                    }})
                    break;
                case 'cyan': 
                    node.send({payload: {
                        red: 0,
                        green: 255,
                        blue: 255
                    }})
                    break;
                case 'purple': 
                    node.send({payload: {
                        red: 255,
                        green: 0,
                        blue: 255
                    }})
                    break;
                case 'none': 
                    node.send({payload: {
                        red: 0,
                        green: 0,
                        blue: 0
                    }})
                    break;
                default:
                    node.error('Unknown color found: ' + color)
                    node.send({payload: {
                        red: 0,
                        green: 0,
                        blue: 0
                    }})
            }
        })
    }
    RED.nodes.registerType("color-convert", ColorConvertNode)
}