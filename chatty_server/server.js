// server.js

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 }) // ws://localhost:8080

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


  //Handle the messages of the clients
  ws.on('message', function incoming(message) {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type){
    //If the message is a user's message,
    case "postMessage":
        const newMessage = {
          type: "incomingMessage",
          username: parsedMessage.username,
          content: parsedMessage.content,
          id: parsedMessage.id,
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(newMessage));
          }
        });
    break;
    //If the message is a notification,
    //it attaches the content and sends it to every client.
    case "postNotification":
        const newNotification = {
          type: "incomingNotification",
          id: parsedMessage.id,
          content: parsedMessage.content
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(newNotification));
          }
        });
    break;
    default:
    // show an error in the console if the message type is unknown
    throw new Error("Unknown event type " + data.type);
    }
  });
    

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});