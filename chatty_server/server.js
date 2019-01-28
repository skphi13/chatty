// server.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 }) // ws://localhost:8080
// Generate a v1 (time-based) id
const uuidv1 = require('uuid/v1');
uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
// Generate a v4 (random) id
const uuidv4 = require('uuid/v4');
uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
	console.log('Client connected');

wss.clients.forEach(function each(client) {
    if (client.readyState === client.OPEN) {
		client.send(JSON.stringify({
			type: 'userNumber',
			userNumber: wss.clients.size
			}));
    }
});


//Handle the messages of the clients
ws.on('message', function incoming(message) {
	const parsedMessage = JSON.parse(message);
	switch (parsedMessage.type){
    //If the message is a user's message,
    case 'postMessage':
        const newMessage = {
			type: 'incomingMessage',
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
    case 'postNotification':
        const newNotification = {
			type: 'incomingNotification',
			id: uuidv4(),
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
    throw new Error('Unknown event type ' + parsedMessage.type);
    }
  });
    

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => console.log('Client disconnected'));
});