const fetch = require('node-fetch')

module.exports = function(RED) {
    function GateEffectsNode(config) {
        RED.nodes.createNode(this, config)
        const node = this;

        this.sound = config.sound
        
        this.on('input', function(msg) {
            const redVal = msg.payload.red ? msg.payload.red : 0
            const greenVal = msg.payload.green ? msg.payload.green : 0
            const blueVal = msg.payload.blue ? msg.payload.blue : 0

            node.log(blueVal)

            fetch('192.168.1.101/api/v2/blink',
                {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "units": [1, 2],
                        "groups": ["A"],
                        "sound": node.sound === 'on',
                        "light": true,
                        "count": 3,
                        "color": {
                            "red": redVal,
                            "green": greenVal,
                            "blue": blueVal
                        }
                    })
                }).then((res) => {
                    if (res.ok) { 
                        return res;
                    } else {
                        throw node.error(res.status)
                    }
                })
        })
    }
    RED.nodes.registerType("gate-effects", GateEffectsNode)
}
