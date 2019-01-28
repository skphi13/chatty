// server.js

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 }) // ws://localhost:8080

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


  ws.on('message', (data) => {
    let parsedData = JSON.parse(data);
    // console.log( "data",parsedData);
     wss.clients.forEach((client => {
        if (client.readyState === WebSocket.OPEN) {
        console.log('data recieved', parsedData)
        client.send(JSON.stringify(parsedData));
        }
      }))
    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});