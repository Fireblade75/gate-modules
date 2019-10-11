const WebSocketClient = require('websocket').client

module.exports = function(RED) {
    function GateClientNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
    
        const client = new WebSocketClient()
        
        client.connect('ws://192.168.1.101:80/api/v2/events')
        
        this.include_events_since = String(config.include_events_since || "now")

        client.on('connectFailed', function(error) {
            node.error(error.toString())
        })
    
        client.on('connect', function(connection) {
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    node.send({payload: JSON.parse(message.utf8Data)})
                }
            })
        
            if (connection.connected) {
                connection.sendUTF(JSON.stringify({
                    "request": "subscribe",
                    "event_types": ["rf_alarm", "rfid_alarm", "ir_direction"],
                    "include_events_since": include_events_since
                }))
            }
        })
    }
    RED.nodes.registerType("gate-client", GateClientNode)
}